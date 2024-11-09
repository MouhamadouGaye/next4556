// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto`}
//       >
//         <Header />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

// const Header = () => {
//   return (
//     <div>
//       <nav></nav>
//     </div>
//   );
// };

// const Footer = () => {
//   return (
//     <div className="">
//       <p>MGaye Allright reserved</p>
//     </div>
//   );
// };

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto bg-background text-primary`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <header className="bg-primary text-highlight py-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold">
          <a href="/" className="hover:text-accent">
            My Blog
          </a>
        </h1>
        <ul className="flex space-x-6 text-lg">
          <li>
            <a href="" className="hover:text-accent transition duration-300">
              About
            </a>
          </li>
          <li>
            <a href="" className="hover:text-accent transition duration-300">
              Blog
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-accent transition duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-highlight py-6 mt-10">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} MGaye. All rights reserved.</p>
      </div>
    </footer>
  );
};
