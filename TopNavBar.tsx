import { Search, Bell, HelpCircle, Plus } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function TopNavBar({ title }: { title: string }) {
  const { profile } = useAuth();

  return (
    <header className="bg-surface-container-lowest dark:bg-surface-dim shadow-sm sticky top-0 z-40 h-16 w-full flex items-center">
      <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-primary">{title}</h1>
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-surface-container-low border border-outline-variant py-2 pl-10 pr-4 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="h-8 w-px bg-outline-variant mx-2"></div>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-all shadow-sm">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Create New</span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-outline-variant overflow-hidden ml-2 bg-surface-container flex items-center justify-center">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-on-surface-variant">
                {profile?.displayName?.[0] || profile?.email?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
