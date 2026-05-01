'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  BarChart3,
  Heart,
  MessageSquare,
  Settings,
  Users,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Shield,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const baseNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { label: 'Live Consultation', href: '/consultation', icon: MessageSquare },
  { label: 'AI Output', href: '/ai-output', icon: Heart },
  { label: 'Appointments', href: '/appointments', icon: Calendar },
  { label: 'Patients', href: '/patients', icon: Users },
  { label: 'Prescriptions', href: '/prescriptions', icon: Pill },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Medical Records', href: '/records', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
];

const adminNavItems = [
  { label: 'Admin Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'User Management', href: '/admin/users', icon: Users },
  { label: 'System Settings', href: '/admin/settings', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [...baseNavItems];
  if (user?.role === 'admin') {
    navItems.push(...adminNavItems);
  }

  return (
    <>
      {/* Mobile Menu Button */}
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

      {/* Sidebar */}
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
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">ClinixAI</h1>
                <p className="text-xs text-muted-foreground">Healthcare AI</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-400 border border-blue-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border/50 p-4 space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
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

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
