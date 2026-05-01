'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Bell, Lock, User, Shield, Database, Palette } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: 'Dr. Sarah Mitchell',
    email: 'dr.mitchell@clinixai.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Cardiology',
  });

  const set = (field: string, value: string) =>
    setSettings((prev) => ({ ...prev, [field]: value }));

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integration', label: 'Integration', icon: Database },
  ];

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border/50 flex gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'profile' && (
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input value={settings.name} onChange={(e) => set('name', e.target.value)} className="bg-accent/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input value={settings.email} onChange={(e) => set('email', e.target.value)} className="bg-accent/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input value={settings.phone} onChange={(e) => set('phone', e.target.value)} className="bg-accent/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Specialty</label>
                  <Input value={settings.specialty} readOnly className="bg-accent/30 border-border/50 opacity-60 cursor-not-allowed" />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">Save Changes</Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <Input type="password" className="bg-accent/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <Input type="password" className="bg-accent/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <Input type="password" className="bg-accent/30 border-border/50" />
                </div>
                <Button className="bg-gradient-to-r from-red-600 to-pink-600">Update Password</Button>
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <h4 className="font-semibold mb-4">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline">Enable 2FA</Button>
            </div>

            <div className="border-t border-border/50 pt-6">
              <h4 className="font-semibold mb-4">Active Sessions</h4>
              <p className="text-sm text-muted-foreground mb-4">
                You have 2 active sessions
              </p>
              <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                Logout All Sessions
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { title: 'New Consultation Requests', enabled: true },
                { title: 'Patient Messages', enabled: true },
                { title: 'Appointment Reminders', enabled: true },
                { title: 'Lab Results Ready', enabled: true },
                { title: 'System Updates', enabled: false },
                { title: 'Email Digest', enabled: true },
              ].map((notif) => (
                <div
                  key={notif.title}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <label className="font-medium cursor-pointer">{notif.title}</label>
                  <input type="checkbox" defaultChecked={notif.enabled} className="w-4 h-4" />
                </div>
              ))}
            </div>
            <Button className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600">
              Save Preferences
            </Button>
          </Card>
        )}

        {activeTab === 'appearance' && (
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-4">Theme Preference</p>
                <div className="flex gap-4">
                  {['light', 'dark', 'system'].map((theme) => (
                    <label key={theme} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        defaultChecked={theme === 'dark'}
                      />
                      <span className="capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'integration' && (
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connected Services
            </h3>
            <div className="space-y-4">
              {['Electronic Health Records', 'Lab Management System', 'Pharmacy Partner'].map(
                (service) => (
                  <div
                    key={service}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/30"
                  >
                    <div>
                      <p className="font-medium">{service}</p>
                      <p className="text-xs text-green-400 mt-1">Connected</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                )
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
