"use client";

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const NavItems = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {session ? (
        <>
          <li>
            <Link href="/events" className={`flex-center p-medium-16 whitespace-nowrap ${pathname === '/events' ? 'text-primary-500' : ''}`}>
              Events
            </Link>
          </li>
          {session.user?.role === 'ADMIN' && (
            <li>
              <Link href="/admin" className={`flex-center p-medium-16 whitespace-nowrap ${pathname === '/admin' ? 'text-primary-500' : ''}`}>
                Admin Dashboard
              </Link>
            </li>
          )}
          <li>
            <button 
              onClick={() => signOut()}
              className="p-medium-16 whitespace-nowrap"
            >
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <li>
          <button 
            onClick={() => signIn('google')}
            className="p-medium-16 whitespace-nowrap"
          >
            Sign In
          </button>
        </li>
      )}
    </ul>
  )
}

export default NavItems
