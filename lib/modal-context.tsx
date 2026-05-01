'use client';

import React, { createContext, useContext, useState } from 'react';

type ModalType = 'user' | 'clinic' | 'system' | 'confirm' | null;
type ModalMode = 'view' | 'edit';

interface ModalState {
  type: ModalType;
  mode: ModalMode;
  data: Record<string, unknown> | null;
  onConfirm?: () => void;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (type: Exclude<ModalType, null>, mode: ModalMode, data?: Record<string, unknown>) => void;
  openConfirm: (message: string, onConfirm: () => void) => void;
  closeModal: () => void;
  confirmMessage: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null, mode: 'view', data: null });
  const [confirmMessage, setConfirmMessage] = useState('');

  const openModal = (type: Exclude<ModalType, null>, mode: ModalMode, data?: Record<string, unknown>) => {
    setModal({ type, mode, data: data ?? null });
  };

  const openConfirm = (message: string, onConfirm: () => void) => {
    setConfirmMessage(message);
    setModal({ type: 'confirm', mode: 'view', data: null, onConfirm });
  };

  const closeModal = () => setModal({ type: null, mode: 'view', data: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, openConfirm, closeModal, confirmMessage }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
