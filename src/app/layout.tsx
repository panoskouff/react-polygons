import '../theme/css/index.css';
import '../theme/css/reset.css';
import '../theme/css/theme.css';
import '../theme/css/globals.css';
import { mulish, tinos } from '#/theme/fonts';

export const metadata = {
  title: 'React Polygons',
  description: 'A polygon drawing app built with React and Next.js',
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
