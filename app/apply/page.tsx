import { headers } from 'next/headers'
import { ApplyForm } from './apply-form'

export default async function ApplyPage() {
  const headerList = await headers()
  const isNigeria = headerList.get('x-vercel-ip-country')?.toUpperCase() === 'NG'

  return <ApplyForm isNigeria={isNigeria} />
}
