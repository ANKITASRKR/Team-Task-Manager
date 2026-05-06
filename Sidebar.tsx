import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  SquareKanban, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  GridView
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { cn } from '../lib/utils';
import { useAuth } from './AuthProvider';

export function Sidebar() {
  const { profile } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: SquareKanban, label: 'Projects', to: '/projects' },
    { icon: Users, label: 'Team', to: '/team' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <aside className="bg-surface-container-low dark:bg-surface-container h-screen sticky top-0 w-64 flex flex-col shadow-sm flex-shrink-0">
      <div className="flex flex-col h-full py-8 px-4 gap-6">
        {/* Header */}
        <div className="flex items-center gap-4 px-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-lg font-bold text-primary truncate">Project Alpha</span>
            <span className="text-xs font-medium text-on-surface-variant">Enterprise Plan</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-2 transition-all rounded-xl font-medium",
                isActive 
                  ? "text-primary bg-secondary-container" 
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Upgrade Card */}
        <div className="mt-4 px-2">
          <div className="bg-primary-container p-4 rounded-xl text-white">
            <p className="text-xs font-medium mb-1">Storage used: 85%</p>
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3">
              <div className="bg-white h-full" style={{ width: '85%' }}></div>
            </div>
            <button className="w-full bg-white text-primary py-2 rounded-lg text-sm font-bold hover:opacity-90 active:scale-95 duration-100">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant pt-4">
          <NavLink
            to="/support"
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-2 transition-all rounded-xl font-medium text-on-surface-variant hover:bg-surface-container-high",
              isActive && "text-primary"
            )}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-2 transition-all rounded-xl font-medium text-on-surface-variant hover:bg-surface-container-high w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
