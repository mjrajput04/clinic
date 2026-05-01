'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Navbar } from '@/components/navbar';
import { ModalProvider } from '@/lib/modal-context';
import { ModalRenderer } from '@/components/modals/modal-renderer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') return null;

  return (
    <ModalProvider>
      <AdminSidebar />
      <Navbar />
      <main className="lg:ml-64 mt-16 min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {children}
      </main>
      <ModalRenderer />
    </ModalProvider>
  );
}
