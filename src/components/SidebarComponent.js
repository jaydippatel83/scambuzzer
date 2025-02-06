'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarComponent = ({label}) => {
  const pathname = usePathname();

  const menuItems = label === 'dashboard' ? [
    { name: 'Whitelist', path: '/dashboard/whitelist' },
    { name: 'Commando Scan', path: '/dashboard/commando-scan' },
    { name: 'Flag Report', path: '/dashboard/flag-report' },
    { name: 'Subscription', path: '/dashboard/subscription' },
    { name: 'API Middleware', path: '/dashboard/middleware' },
  ] : [
    { name: 'Report & Contribute', path: '/dashboard/reports' },
    { name: 'Points', path: '/dashboard/points' },
    { name: 'Leaderboard', path: '/dashboard/leaderboard' },
  ];

  return (
    <div className="w-64 h-screen bg-background text-foreground flex flex-col p-4  pt-10"> 
        
      {menuItems.map((item, index) => (
        <Link key={index} href={item.path} passHref >
          <div  className={`p-4 border rounded-md cursor-pointer my-3 ${
                pathname === item.path ? 'bg-green-600 text-black' : 'border-green-500'
            } hover:bg-green-500 hover:text-black transition`}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarComponent;
