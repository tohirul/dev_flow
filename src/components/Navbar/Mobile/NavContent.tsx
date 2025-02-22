'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants/themes';
import { SheetClose } from '@/ui/sheet';

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className='flex h-full flex-col gap-6'>
      {sidebarLinks.map((link) => {
        const isActive = (pathName.includes(link?.route) && link?.route.length > 1) || pathName === link?.route;
        return (
          <SheetClose asChild key={link?.route}>
            <Link
              href={link?.route}
              className={`flex items-center justify-start gap-4 bg-transparent p-4 ${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'}`}>
              <Image
                src={link?.icon}
                alt={link?.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>{link?.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
export default NavContent;
