'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/lib/modal-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Edit, Trash2, Save, Shield, Mail, Phone } from 'lucide-react';

export function UserModal() {
  const { modal, closeModal, openConfirm } = useModal();
  const [form, setForm] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (modal.data) {
      setForm(modal.data as Record<string, string>);
      setIsEditing(modal.mode === 'edit');
    }
  }, [modal.data, modal.mode]);

  if (modal.type !== 'user') return null;

  const handleSave = () => {
    // In a real app, dispatch update action here
    setIsEditing(false);
    closeModal();
  };

  const handleDelete = () => {
    openConfirm(`Delete user "${form.name}"? This action cannot be undone.`, () => {
      closeModal();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/50 rounded-xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            {form.avatar && (
              <img src={form.avatar} alt={form.name} className="w-10 h-10 rounded-full" />
            )}
            <div>
              <h2 className="text-lg font-bold">{isEditing ? 'Edit User' : 'User Details'}</h2>
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

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
            {isEditing ? (
              <Input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-accent/50 border-border/30" />
            ) : (
              <p className="text-sm font-medium">{form.name}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </label>
            {isEditing ? (
              <Input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-accent/50 border-border/30" />
            ) : (
              <p className="text-sm">{form.email}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block flex items-center gap-1">
              <Phone className="h-3 w-3" /> Phone
            </label>
            {isEditing ? (
              <Input type="tel" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-accent/50 border-border/30" />
            ) : (
              <p className="text-sm">{form.phone}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block flex items-center gap-1">
              <Shield className="h-3 w-3" /> Role
            </label>
            {isEditing ? (
              <select
                value={form.role || ''}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 bg-accent/50 border border-border/30 rounded-lg text-sm text-foreground"
              >
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
                <option value="receptionist">Receptionist</option>
              </select>
            ) : (
              <span className="text-sm capitalize font-medium text-blue-400">{form.role}</span>
            )}
          </div>

          {form.specialty && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Specialty</label>
              {isEditing ? (
                <Input value={form.specialty || ''} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="bg-accent/50 border-border/30" />
              ) : (
                <p className="text-sm">{form.specialty}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/30">
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); closeModal(); }}>Cancel</Button>
            {isEditing && (
              <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
