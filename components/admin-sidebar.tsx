'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Building2,
  FileBarChart,
  ScrollText,
  SlidersHorizontal,
  Shield,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'User Management', href: '/admin/users', icon: Users },
  //{ label: 'System Settings', href: '/admin/system', icon: Settings },
  { label: 'Clinics Management', href: '/admin/clinics', icon: Building2 },
  { label: 'Reports', href: '/admin/reports', icon: FileBarChart },
  //{ label: 'Logs & Audit', href: '/admin/logs', icon: ScrollText },
  { label: 'Settings', href: '/admin/settings', icon: SlidersHorizontal },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <>
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="bg-background/95 backdrop-blur-sm border-border/50"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-background to-background/95 border-r border-border/50 backdrop-blur-lg transition-transform duration-300 lg:translate-x-0 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">ClinixAI</h1>
                <p className="text-xs text-cyan-400 font-medium">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="px-4 py-3 border-b border-border/30 bg-blue-500/5">
            <div className="flex items-center gap-3">
              {user?.avatar && (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-cyan-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-400 border border-blue-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
