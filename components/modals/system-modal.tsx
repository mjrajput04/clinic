'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/lib/modal-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Save, Settings } from 'lucide-react';

export function SystemModal() {
  const { modal, closeModal } = useModal();
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (modal.data) setForm(modal.data as Record<string, string>);
  }, [modal.data]);

  if (modal.type !== 'system') return null;

  const handleSave = () => closeModal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/50 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold">{form.title || 'System Settings'}</h2>
          </div>
          <Button size="icon" variant="ghost" onClick={closeModal}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          {Object.entries(form)
            .filter(([key]) => key !== 'title')
            .map(([key, value]) => (
              <div key={key}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <Input
                  value={value}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-accent/50 border-border/30"
                />
              </div>
            ))}
        </div>

        <div className="flex justify-end gap-2 p-6 border-t border-border/30">
          <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
          <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </div>
    </div>
  );
}
