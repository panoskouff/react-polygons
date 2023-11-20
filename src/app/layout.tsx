import '../theme/globalStyles';
import { mulish, tinos } from '#/theme/fonts';

export const metadata = {
  title: 'React Polygons',
  description: 'A polygon drawing app built with React and Next.js',
  icons: {
    icon: '/public/icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${mulish.variable} ${tinos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
