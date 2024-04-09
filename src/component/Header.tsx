import { header } from '@/utils/constants'
import Link from 'next/link'
import React from 'react'

interface IHeader {
    user: {
        name: string;
    }
}

const Header = ({ user }: IHeader) => {
  return (
    <header>
        <div className="wrapper">
        <div className='flex justify-end gap-2 items-center'>
            <ul>
                {header.support.map((item) => (
                    <li key={item.id}>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <span>Hi {user?.name}</span>
        </div>
        <div>
            <h1 className='uppercase'>{header.logo}</h1>
            <nav>
                <ul>
                    {header.nav.map(item => (
                    <li key={item.id}>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                    ))}
                </ul>
            </nav>
            <div>
                {header.addtionalDetails.map((item) => (
                    <div key={item.id}>
                        <item.icon />
                    </div>
                ))}
            </div>
        </div>
        </div>
    </header>
  )
}

export default Header