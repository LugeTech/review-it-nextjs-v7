import Link from 'next/link';
import { BellIcon } from 'lucide-react';
import { iNotification, iProductOwnerNotification } from '@/app/util/Interfaces';
import { useAtom } from 'jotai';
import { ownerNotificationsAtom } from '@/app/store/store';

interface NotificationsPageProps {
  notifications: iProductOwnerNotification[];
}

export default function NotificationBell({ notifications }: NotificationsPageProps) {
  const [notiAtoms, setNotiAtoms] = useAtom(ownerNotificationsAtom);

  const count = notifications?.length || 0;

  const handleClick = () => {
    // Set the notifications atom when the bell is clicked
    setNotiAtoms(notifications);
  };

  return (
    <Link
      href={{ pathname: '/notifications' }}
      className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors"
      onClick={handleClick} // Update the atom on click
    >
      <div className="relative">
        <BellIcon className="w-6 h-6 text-gray-600" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
      <span className="ml-2 text-sm text-gray-600">new notifications</span>
    </Link>
  );
}
