import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <Link href="/projects">See Projects</Link>
      <h1>Home</h1>
      <UserButton afterSwitchSessionUrl="/"/>
   </main>
  );
}