// import { PropsWithChildren } from "react";
import Header from "./components/Header";
import "./globals.css";
import { PageWrapper } from "./shared/PageWrapper";




export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
      <Header/>
        <PageWrapper>
        
          {children}
        </PageWrapper>
        
      </body>
    </html>
  );
}