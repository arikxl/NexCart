import Link from 'next/link'
import React from 'react'
import HeaderMenu from './HeaderMenu'

const AppHeader = () => {
  return (
    <header>
      <nav>
        <div className='navbar justify-between bg-base-300'>
          <Link href='/' className='btn btn-ghost text-2xl text-[#F100B7] font-bold'>
            NexCart
          </Link>

          <HeaderMenu />
        </div>
      </nav>
    </header>
  )
}

export default AppHeader