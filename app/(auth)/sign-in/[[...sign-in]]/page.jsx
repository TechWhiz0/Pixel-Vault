import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex my-20 items-center justify-center'>
<SignIn />
    </div>
  )
}