import { redirect } from 'next/navigation'

function NotFoundPage() {
  redirect('/en/movies/')
  return null
}

export default NotFoundPage
