import { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

// import { auth } from '@/auth';
// import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/context/Theme';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';

// import { SessionProvider } from 'next-auth/react';

const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
  weight: '100 200 300 400 500 700 800 900'
});

const spaceGrotesk = localFont({
  src: './fonts/SpaceGroteskVF.ttf',
  variable: '--font-space-grotesk',
  weight: '300 400 500 700'
});

export const metadata: Metadata = {
  title: 'DevFlow',
  description:
    'A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
  icons: {
    icon: '/images/site-logo.svg'
  }
};

const Layout = async ({ children }: { children: ReactNode }) => {
  //   const session = await auth();

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
      </head>
      {/* <SessionProvider session={session}> */}
      <body className={`${inter.className} ${spaceGrotesk.variable} antialiased`}>
        <ClerkProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ClerkProvider>
        {/* <Toaster /> */}
      </body>
      {/* </SessionProvider> */}
    </html>
  );
};

export default Layout;
