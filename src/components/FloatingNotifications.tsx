import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface Notification {
  id: number;
  type: 'deposit' | 'withdrawal';
  user: string;
  amount: string;
  country: string;
}

const sampleNotifications: Omit<Notification, 'id'>[] = [
  { type: 'deposit', user: 'John M.', amount: '$5,000', country: '🇺🇸' },
  { type: 'withdrawal', user: 'Sarah K.', amount: '$2,500', country: '🇬🇧' },
  { type: 'deposit', user: 'Michael R.', amount: '$10,000', country: '🇨🇦' },
  { type: 'withdrawal', user: 'Emma L.', amount: '$3,200', country: '🇦🇺' },
  { type: 'deposit', user: 'David S.', amount: '$7,500', country: '🇩🇪' },
  { type: 'withdrawal', user: 'Lisa W.', amount: '$1,800', country: '🇫🇷' },
  { type: 'deposit', user: 'James P.', amount: '$15,000', country: '🇯🇵' },
  { type: 'withdrawal', user: 'Maria G.', amount: '$4,500', country: '🇪🇸' },
];

export function FloatingNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const showNotification = () => {
      const randomNotif = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      const newNotif: Notification = {
        ...randomNotif,
        id: Date.now(),
      };

      setNotifications(prev => [...prev, newNotif]);

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 5000);
    };

    const interval = setInterval(showNotification, 8000);
    showNotification(); // Show first notification immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-4 bottom-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-card border border-border rounded-lg p-4 shadow-lg animate-slide-in-left flex items-center gap-3"
        >
          <div className={`p-2 rounded-full ${notif.type === 'deposit' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
            {notif.type === 'deposit' ? (
              <ArrowDownToLine className="h-5 w-5 text-green-500" />
            ) : (
              <ArrowUpFromLine className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {notif.type === 'deposit' ? 'New Deposit' : 'Withdrawal Processed'}
            </p>
            <p className="text-xs text-muted-foreground">
              {notif.country} {notif.user} • {notif.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
