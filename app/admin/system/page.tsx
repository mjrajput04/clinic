'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Server, Lock, Database, Edit } from 'lucide-react';
import { useModal } from '@/lib/modal-context';

const settingsSections = [
  {
    title: 'Clinic Information',
    icon: Shield,
    color: 'text-blue-400',
    data: {
      title: 'Clinic Information',
      clinicName: 'ClinixAI Healthcare Center',
      clinicEmail: 'admin@clinixai.com',
      contactPhone: '+1-555-0100',
    },
    fields: ['clinicName', 'clinicEmail', 'contactPhone'],
  },
  {
    title: 'System Capacity',
    icon: Server,
    color: 'text-cyan-400',
    data: {
      title: 'System Capacity',
      maxUsers: '500',
      storageLimit: '1000 GB',
      backupFrequency: 'daily',
    },
    fields: ['maxUsers', 'storageLimit', 'backupFrequency'],
  },
  {
    title: 'Security Settings',
    icon: Lock,
    color: 'text-blue-400',
    data: {
      title: 'Security Settings',
      autoLogout: '30 minutes',
      sessionTimeout: '8 hours',
      mfaRequired: 'false',
    },
    fields: ['autoLogout', 'sessionTimeout', 'mfaRequired'],
  },
  {
    title: 'Backup & Maintenance',
    icon: Database,
    color: 'text-green-400',
    data: {
      title: 'Backup & Maintenance',
      lastBackup: '2024-05-01 02:30 UTC',
      backupSize: '250 GB',
      nextScheduled: '2024-05-02 02:30 UTC',
    },
    fields: ['lastBackup', 'backupSize', 'nextScheduled'],
  },
];

export default function SystemPage() {
  const { openModal } = useModal();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section, idx) => {
          const Icon = section.icon;
          const displayFields = section.fields;
          return (
            <Card key={idx} className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${section.color}`} />
                  {section.title}
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openModal('system', 'edit', { ...section.data })}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
              <div className="space-y-3">
                {displayFields.map((field) => (
                  <div key={field} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                    <span className="text-sm text-muted-foreground capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-medium">{section.data[field as keyof typeof section.data]}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Danger Zone */}
      <Card className="p-6 border-red-500/30 bg-red-500/5 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">These actions are irreversible. Proceed with caution.</p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10">
            Clear Cache
          </Button>
          <Button variant="outline" size="sm" className="text-red-400 border-red-500/30 hover:bg-red-500/10">
            Reset System
          </Button>
        </div>
      </Card>
    </div>
  );
}
