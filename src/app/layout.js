 
import MatrixBackground from "../components/Animation";
import RadarBackground from "../components/RadarBackground";
import { SubscriptionProvider } from "../context/subscription";
import Providers from "../providers/PrivyProvider";
import "./globals.css";  
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen dark:bg-black text-gray-900 dark:text-green-400 relative"> 
        {/* <MatrixBackground /> */}
        {/* <RadarBackground /> */}
        <Providers>
          <SubscriptionProvider> 
          {children}
          </SubscriptionProvider>
        </Providers>
      </body>
    </html>
  );
}
