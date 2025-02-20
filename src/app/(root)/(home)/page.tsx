import Link from 'next/link';

import ThemeToggleButton from '@/components/ui/Button/ThemeToggleButton';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <section>
      <Link href='/projects'>See Projects</Link>
      <h1>Home</h1>
      <ThemeToggleButton />
      <UserButton afterSwitchSessionUrl='/' />
    </section>
  );
}
