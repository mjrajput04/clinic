'use client';

import { useModal } from '@/lib/modal-context';
import { UserModal } from './user-modal';
import { ClinicModal } from './clinic-modal';
import { SystemModal } from './system-modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

function ConfirmModal() {
  const { modal, closeModal, confirmMessage } = useModal();
  if (modal.type !== 'confirm') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/50 rounded-xl w-full max-w-sm shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <h2 className="text-lg font-bold">Confirm Action</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{confirmMessage}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
          <Button
            size="sm"
            onClick={() => { modal.onConfirm?.(); closeModal(); }}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ModalRenderer() {
  return (
    <>
      <UserModal />
      <ClinicModal />
      <SystemModal />
      <ConfirmModal />
    </>
  );
}
