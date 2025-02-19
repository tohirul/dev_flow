import Link from 'next/link';

// import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <section>
      <Link href='/projects'>See Projects</Link>
      <h1>Home</h1>
      {/* <UserButton afterSwitchSessionUrl='/' /> */}
    </section>
  );
}
