import '../theme/css/index.css';
import '../theme/css/reset.css';
import '../theme/css/theme.css';
import '../theme/css/globals.css';
import { mulish, tinos } from '#/theme/fonts';
import { getServerSession } from 'next-auth';
import SessionProvider from '#/components/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className={`${mulish.variable} ${tinos.variable}`}>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
