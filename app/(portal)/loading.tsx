import { LogoLoader } from '@/components/ui/logo-loader'

export default function PortalLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LogoLoader className="h-12 text-foreground" />
    </div>
  )
}
