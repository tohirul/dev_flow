'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants/themes';
import { cn } from '@/lib/utils';
import { SheetClose } from '@/ui/sheet';

const NavContent = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathName = usePathname();

  const LinkComponents = (link: SidebarLink, isActive: boolean) => {
    return (
      <Link
        href={link?.route}
        className={cn(
          isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900',
          `max-lg:justify-left flex items-center justify-start gap-4 bg-transparent p-4`
        )}>
        <Image
          src={link?.icon}
          alt={link?.label}
          width={20}
          height={20}
          className={cn(isActive ? '' : 'invert-colors')}
        />
        <p className={cn(isActive ? 'base-bold' : 'base-medium', !isMobileNav && 'max-lg:hidden')}>{link?.label}</p>
      </Link>
    );
  };
  return (
    <section className='flex h-full flex-col gap-6'>
      {sidebarLinks.map((link) => {
        const isActive = (pathName.includes(link?.route) && link?.route.length > 1) || pathName === link?.route;

        return isMobileNav ? (
          <SheetClose asChild key={link?.route}>
            {LinkComponents(link, isActive)}
          </SheetClose>
        ) : (
          <React.Fragment key={link?.route}>{LinkComponents(link, isActive)}</React.Fragment>
        );
      })}
    </section>
  );
};
export default NavContent;
