import Link from 'next/link'
import React from 'react'
import HeaderMenu from './HeaderMenu'

const AppHeader = () => {
  return (
    <header>
      <nav>
        <div className='navbar justify-between bg-base-300'>
          <Link href='/' className='btn btn-ghost text-lg'>
            NexCart
          </Link>

          <HeaderMenu />
          {/* <ul className='flex'>
            <li>
              <Link href='/cart' className='btn btn-ghost rounded-btn'>Cart</Link>
            </li>
            <li>
              <Link href='/login' className='btn btn-ghost rounded-btn'>Login</Link>
            </li>
          </ul> */}
        </div>
      </nav>
    </header>
  )
}

export default AppHeader