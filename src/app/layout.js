 
import { SubscriptionProvider } from "../context/subscription";
import Providers from "../providers/PrivyProvider";
import "./globals.css";  
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen dark:bg-black text-gray-900 dark:text-green-400">
        <Providers>
          <SubscriptionProvider>
          {children}
          </SubscriptionProvider>
        </Providers>
      </body>
    </html>
  );
}
