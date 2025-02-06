'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarComponent = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Whitelist', path: '/dashboard/whitelist' },
    { name: 'Commando Scan', path: '/dashboard/commando-scan' },
    { name: 'Flag Report', path: '/dashboard/flag-report' },
    { name: 'Subscription', path: '/dashboard/subscription' },
    { name: 'API Middleware', path: '/dashboard/middleware' },
  ];

  return (
    <div className="w-64 h-screen bg-background text-foreground flex flex-col p-4 border-r border-green-500"> 
      {menuItems.map((item, index) => (
        <Link key={index} href={item.path} passHref>
          <div  className={`p-4 border rounded-md cursor-pointer my-2 ${
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
