'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/lib/modal-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Edit, Save, Building2 } from 'lucide-react';

export function ClinicModal() {
  const { modal, closeModal } = useModal();
  const [form, setForm] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (modal.data) {
      setForm(modal.data as Record<string, string>);
      setIsEditing(modal.mode === 'edit');
    }
  }, [modal.data, modal.mode]);

  if (modal.type !== 'clinic') return null;

  const handleSave = () => {
    setIsEditing(false);
    closeModal();
  };

  const fields: { key: string; label: string; type?: string }[] = [
    { key: 'name', label: 'Clinic Name' },
    { key: 'type', label: 'Type' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Phone', type: 'tel' },
    { key: 'email', label: 'Email', type: 'email' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/50 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{isEditing ? 'Edit Clinic' : 'Clinic Details'}</h2>
              <p className="text-xs text-muted-foreground">ID: {form.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 text-blue-400" />
              </Button>
            )}
            <Button size="icon" variant="ghost" onClick={closeModal}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
              {isEditing ? (
                <Input
                  type={type || 'text'}
                  value={form[key] || ''}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-accent/50 border-border/30"
                />
              ) : (
                <p className="text-sm">{form[key] || '—'}</p>
              )}
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/20">
            <div>
              <p className="text-xs text-muted-foreground">Doctors</p>
              <p className="text-lg font-bold text-blue-400">{form.doctors}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Patients</p>
              <p className="text-lg font-bold text-cyan-400">{form.patients}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 border-t border-border/30">
          <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); closeModal(); }}>Cancel</Button>
          {isEditing && (
            <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
