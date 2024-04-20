'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

import useCartService from "@/lib/hooks/useCartStore"



const HeaderMenu = () => {

    const { items } = useCartService();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
       setMounted(true) 
    }, [])
    


  return (
      <div>
          <ul className='flex items-center gap-4'>
              <li>
                  <Link href='/cart' className='btn btn-ghost rounded-btn'>
                      Cart&nbsp;
                      {mounted && items.length != 0 && (
                          <div className='badge badge-secondary py-3'>
                              {items.reduce((a, c) => a + c.qty, 0)}
                          </div>
                    )}
                  </Link>
              </li>

              <li>
                  <Link href='/login' className='btn btn-ghost rounded-btn'>Login</Link>
              </li>
          </ul>
    </div>
  )
}

export default HeaderMenu