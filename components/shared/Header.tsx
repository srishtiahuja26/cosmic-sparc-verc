'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

const Header = () => {
	const { data: session, status } = useSession();

	return (
		<header className="w-full border-b">
			<div className="wrapper flex items-center justify-between">
				<Link href={'/'} className="w-36">
					<Image
						src={'/assets/images/logo.svg'}
						width={128}
						height={38}
						alt="Logo Cosmic Sparc"
					/>
				</Link>

				{session && (
					<nav className="md:flex-between hidden w-full max-w-xs">
						<NavItems />
					</nav>
				)}

				<div className="flex w-32 justify-end gap-3">
					{session ? (
						<>
							<Button 
								onClick={() => signOut()}
								variant="ghost"
								className="rounded-full"
							>
								<Image
									src={session.user?.image || '/assets/images/default-avatar.png'}
									alt="profile"
									width={32}
									height={32}
									className="rounded-full"
								/>
							</Button>
							<MobileNav />
						</>
					) : (
						<Button asChild className="rounded-md" size={'lg'}>
							<Link href={'/api/auth/signin'}>Login</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
