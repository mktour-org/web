'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import Link from 'next/link'
import AuthButton from './auth-button'
import ButtonForAuthorized from './button-for-authorized'
import ModeToggler from './mode-toggler'
import MktourNavbar from './ui/mktour-logo-navbar'

export default function Navbar() {
	const { data: session, status, update } = useSession()
	const loading = status === 'loading'

	if (loading) return null
	return (
		<>
			<Link href='/'>
				<div className='p-2'>
					<MktourNavbar />
				</div>
			</Link>
			<ButtonForAuthorized text='issues' variant='outline' slug='issues' session={session} />
			<div className='flex-grow'></div>
			<AuthButton session={session} />
			<ModeToggler />
		</>
	)
}
