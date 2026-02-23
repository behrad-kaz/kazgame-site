import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='shadow p-4'>
        <Link href="/" className='mr-4'>Home</Link>
        <Link href="/blogs" className='mr-4'>Blogs</Link>
        <Link href="/creat-blog">Create</Link>
    </div>
  )
}

export default Navbar