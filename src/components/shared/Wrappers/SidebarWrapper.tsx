'use client';

import dynamic from 'next/dynamic';

const LeftSidebar = dynamic(() => import('@/components/Navigation/LeftSidebar'), { ssr: false });

export default function SidebarWrapper() {
  return <LeftSidebar />;
}
