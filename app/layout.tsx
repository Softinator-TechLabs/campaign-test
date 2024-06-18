import '@/public/css/globals.css';
import { Analytics } from '@vercel/analytics/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/context/authContext';

export const metadata = {
  title: 'Campaign admin panel',
  description: 'some description'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-screen">
        <div className="h-screen w-full">
          {<AuthProvider>{children}</AuthProvider>}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
