'use client';

import { useAuth } from '@/lib/auth-context';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { usePathname } from 'next/navigation';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Don't show sidebar/navbar on login page
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show full layout for authenticated users (except login page)
  if (isAuthenticated && !isLoginPage && !isAdminPage) {
    return (
      <>
        <Sidebar />
        <Navbar />
        <main className="lg:ml-64 mt-16 min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
          {children}
        </main>
      </>
    );
  }

  // Show just the content for login page or unauthenticated users
  return <>{children}</>;
}
