import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'



const  Navbar = async () => {
  const session = await auth()
  return (
    <header className=' conteiner  bg-white  shadow-sm'>
        <nav className=' flex justify-between items-center px-5 py-3'>
            <Link href='/' >
                <Image src='/logo.png' alt='logo' width={144} height={30}  />
            </Link>

            <div className='flex items-center gap-5  font-[family-name:var(--font-work-sans)]'>
              {session && session.user ? (
                <>
                  <Link href='/startup/create' >
                    <span className=' max-sm:hidden'>Create</span>
                    <BadgePlus className='size-6 sm:hidden' />
                  </Link>

                  <form  
                    action={ async () => {
                      'use server';
                      await signOut({ redirectTo: '/' });
                      }}>
                    <button  type='submit' className='cursor-pointer max-sm:hidden'>
                      LogOut
                    </button>
                    <LogOut className='size-6 sm:hidden text-red-500' />
                  </form>

                  <Link href={`/user/${session?.user?.id}`}>
                    <Avatar className='size-8'>
                      <Image 
                        src={session?.user?.image ?? "https://placehold.co/48x48"} 
                        alt={session?.user?.name ?? "User"} 
                        width={32} 
                        height={32} 
                        className='object-cover rounded-full' />
                    </Avatar>
                  </Link>
                </>
              ): (
                <form 
                  action={async () => {
                    "use server";
                    await signIn('github');
                  }}>
                  <button  type='submit' className='cursor-pointer'>
                    LogIn
                  </button>
                </form>
              )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
