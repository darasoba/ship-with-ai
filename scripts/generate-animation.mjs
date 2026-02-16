import fs from 'fs';

const svg = fs.readFileSync('/Users/israel.sobaloju/Downloads/animate.svg', 'utf8');

const pathRegex = /<path d="([^"]+)"[^>]*fill="(#[A-Fa-f0-9]+)"\/>/g;
let match;
const allPaths = [];
let i = 0;

while ((match = pathRegex.exec(svg)) !== null) {
  const d = match[1];
  const fill = match[2];

  const nums = d.match(/[\d.]+/g).map(Number);
  let xValues = [], yValues = [];
  for (let j = 0; j < nums.length - 1; j += 2) {
    if (nums[j] >= 0 && nums[j] <= 1536) xValues.push(nums[j]);
    if (nums[j+1] >= 0 && nums[j+1] <= 1024) yValues.push(nums[j+1]);
  }

  const avgX = xValues.length > 0 ? xValues.reduce((a,b) => a+b,0) / xValues.length : 0;
  const avgY = yValues.length > 0 ? yValues.reduce((a,b) => a+b,0) / yValues.length : 0;

  allPaths.push({ index: i, d, fill, avgX, avgY, isTop: avgY < 450 });
  i++;
}

// Three groups:
// 1. Mentor hand (top) - avgY < 450
// 2. Typing fingers (bottom, non-keyboard) - avgY >= 450 AND fill != #E7E7E7
// 3. Keyboard keys (bottom, light gray) - avgY >= 450 AND fill == #E7E7E7

const mentorPaths = allPaths.filter(p => p.isTop);
const fingerPaths = allPaths.filter(p => !p.isTop && p.fill !== '#E7E7E7');
const keyboardPaths = allPaths.filter(p => !p.isTop && p.fill === '#E7E7E7');

console.log('Mentor hand paths:', mentorPaths.length);
console.log('Typing finger paths:', fingerPaths.length);
console.log('Keyboard key paths:', keyboardPaths.length);

// Group FINGER paths by x-position into 8 finger clusters
const xMin = Math.min(...fingerPaths.map(p => p.avgX));
const xMax = Math.max(...fingerPaths.map(p => p.avgX));
const bucketWidth = (xMax - xMin) / 8;

fingerPaths.forEach(p => {
  p.fingerGroup = Math.min(7, Math.floor((p.avgX - xMin) / bucketWidth));
});

const fingerGroups = {};
fingerPaths.forEach(p => {
  if (!fingerGroups[p.fingerGroup]) fingerGroups[p.fingerGroup] = [];
  fingerGroups[p.fingerGroup].push(p);
});

console.log('Finger clusters:', Object.keys(fingerGroups).map(k => 'group ' + k + ': ' + fingerGroups[k].length + ' paths').join(', '));

// Also group KEYBOARD paths by x-position (same 8 groups) so keys depress with fingers
const kxMin = Math.min(...keyboardPaths.map(p => p.avgX));
const kxMax = Math.max(...keyboardPaths.map(p => p.avgX));
const kBucketWidth = (kxMax - kxMin) / 8;

keyboardPaths.forEach(p => {
  p.keyGroup = Math.min(7, Math.floor((p.avgX - kxMin) / kBucketWidth));
});

const keyGroups = {};
keyboardPaths.forEach(p => {
  if (!keyGroups[p.keyGroup]) keyGroups[p.keyGroup] = [];
  keyGroups[p.keyGroup].push(p);
});

// Generate mentor paths JSX
const mentorPathsJSX = mentorPaths.map(p =>
  `          <path d="${p.d}" fill="${p.fill}" />`
).join('\n');

// Generate keyboard paths JSX (grouped by position for subtle key depression)
let keyboardPathsJSX = '';
for (let kg = 0; kg <= 7; kg++) {
  const paths = keyGroups[kg] || [];
  keyboardPathsJSX += `          <g className="key-group" data-key="${kg}">\n`;
  paths.forEach(p => {
    keyboardPathsJSX += `            <path d="${p.d}" fill="${p.fill}" />\n`;
  });
  keyboardPathsJSX += `          </g>\n`;
}

// Generate finger paths JSX (grouped by finger position)
let fingerPathsJSX = '';
for (let fg = 0; fg <= 7; fg++) {
  const paths = fingerGroups[fg] || [];
  fingerPathsJSX += `          <g className="finger-group" data-finger="${fg}">\n`;
  paths.forEach(p => {
    fingerPathsJSX += `            <path d="${p.d}" fill="${p.fill}" />\n`;
  });
  fingerPathsJSX += `          </g>\n`;
}

const component = `'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function MentorshipAnimation({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const mentorRef = useRef<SVGGElement>(null)
  const fingersRef = useRef<SVGGElement>(null)
  const keyboardRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!mentorRef.current || !fingersRef.current || !keyboardRef.current) return

    const ctx = gsap.context(() => {
      // Mentor hand: gentle push-down guiding motion
      gsap.to(mentorRef.current, {
        y: 18,
        duration: 2.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center bottom',
      })

      gsap.to(mentorRef.current, {
        rotation: 1.5,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center center',
      })

      // Typing animation
      const fingerGroups = fingersRef.current!.querySelectorAll('.finger-group')
      const keyGroups = keyboardRef.current!.querySelectorAll('.key-group')

      // Typing sequence: which finger clusters tap (simulates typing words)
      const typingSequence = [2, 4, 6, 3, 1, 5, 7, 0, 4, 2, 6, 3, 5, 1, 7, 4, 2, 6, 0, 3, 5, 7, 1, 4, 6, 2, 3, 5, 0, 7]

      const tl = gsap.timeline({ repeat: -1 })

      typingSequence.forEach((fingerIdx, i) => {
        const finger = fingerGroups[fingerIdx]
        const key = keyGroups[fingerIdx]
        if (!finger) return

        const t = i * 0.16

        // Finger taps down onto the key
        tl.to(finger, {
          y: 12,
          duration: 0.09,
          ease: 'power3.in',
        }, t)

        // Key depresses slightly when hit
        if (key) {
          tl.to(key, {
            y: 3,
            duration: 0.06,
            ease: 'power2.in',
          }, t + 0.04)
        }

        // Finger springs back up
        tl.to(finger, {
          y: 0,
          duration: 0.18,
          ease: 'back.out(3)',
        }, t + 0.09)

        // Key springs back
        if (key) {
          tl.to(key, {
            y: 0,
            duration: 0.12,
            ease: 'power2.out',
          }, t + 0.1)
        }
      })

      // Pause before loop restarts
      tl.to({}, { duration: 1 })

    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1536 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mentorship illustration: a hand guiding typing hands"
    >
      <g clipPath="url(#clip0_anim)">
        {/* Mentor hand */}
        <g ref={mentorRef}>
${mentorPathsJSX}
        </g>

        {/* Keyboard keys - stay mostly still, slight depression on tap */}
        <g ref={keyboardRef}>
${keyboardPathsJSX}        </g>

        {/* Typing fingers - tap down onto keys */}
        <g ref={fingersRef}>
${fingerPathsJSX}        </g>
      </g>
      <defs>
        <clipPath id="clip0_anim">
          <rect width="1536" height="1024" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
`;

fs.writeFileSync('/Users/israel.sobaloju/Projects/Vibecoding course/ship-with-ai/components/mentorship-animation.tsx', component);
console.log('\nComponent written successfully!');
