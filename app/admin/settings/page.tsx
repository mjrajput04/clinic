'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Shield,
  Database,
  Server,
  Lock,
  Bell,
  Save,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    clinicName: 'ClinixAI Healthcare Center',
    clinicEmail: 'admin@clinixai.com',
    contactPhone: '+1-555-0100',
    maxUsers: '500',
    storageLimit: '1000',
    backupFrequency: 'daily',
    notificationsEnabled: true,
    securityAlerts: true,
    autoLogout: '30',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <p className="text-green-400">Settings saved successfully</p>
        </div>
      )}

      {/* Clinic Settings */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          Clinic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Clinic Name
            </label>
            <Input
              value={settings.clinicName}
              onChange={(e) => handleChange('clinicName', e.target.value)}
              className="bg-accent/50 border-border/30"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={settings.clinicEmail}
                onChange={(e) => handleChange('clinicEmail', e.target.value)}
                className="bg-accent/50 border-border/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Phone
              </label>
              <Input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="bg-accent/50 border-border/30"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* System Capacity */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Server className="h-5 w-5 text-cyan-400" />
          System Capacity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Max Users
            </label>
            <Input
              type="number"
              value={settings.maxUsers}
              onChange={(e) => handleChange('maxUsers', e.target.value)}
              className="bg-accent/50 border-border/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Storage Limit (GB)
            </label>
            <Input
              type="number"
              value={settings.storageLimit}
              onChange={(e) => handleChange('storageLimit', e.target.value)}
              className="bg-accent/50 border-border/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Backup Frequency
            </label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleChange('backupFrequency', e.target.value)}
              className="w-full px-4 py-2 bg-accent/50 border border-border/30 rounded-lg text-foreground"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Auto-logout (minutes)
            </label>
            <Input
              type="number"
              value={settings.autoLogout}
              onChange={(e) => handleChange('autoLogout', e.target.value)}
              className="bg-accent/50 border-border/30"
            />
          </div>
        </div>
      </Card>

      {/* Notifications & Security */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5 text-blue-400" />
          Security & Notifications
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg cursor-pointer hover:bg-accent/40 transition-colors">
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) =>
                handleChange('notificationsEnabled', e.target.checked)
              }
              className="w-4 h-4 rounded"
            />
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive system alerts and updates
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg cursor-pointer hover:bg-accent/40 transition-colors">
            <input
              type="checkbox"
              checked={settings.securityAlerts}
              onChange={(e) =>
                handleChange('securityAlerts', e.target.checked)
              }
              className="w-4 h-4 rounded"
            />
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified of suspicious activity
              </p>
            </div>
          </label>
        </div>
      </Card>

      {/* Backup & Maintenance */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Database className="h-5 w-5 text-green-400" />
          Backup & Maintenance
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-lg">
            <p className="font-medium text-green-400 mb-1">
              Last Backup
            </p>
            <p className="text-sm text-muted-foreground">
              Today at 2:30 AM UTC • 250 GB
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Run Backup Now
            </Button>
            <Button variant="outline" size="sm">
              View Backup History
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-border/50 bg-red-500/5 backdrop-blur-sm border-red-500/30">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          Danger Zone
        </h2>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            These actions are irreversible. Proceed with caution.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="text-yellow-400">
              Clear Cache
            </Button>
            <Button variant="outline" size="sm" className="text-red-400">
              Reset System
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
