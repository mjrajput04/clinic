'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Edit, Trash2, Eye, Users, UserCheck, UserX, Plus } from 'lucide-react';
import { doctors } from '@/lib/mock-data';
import { useModal } from '@/lib/modal-context';

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { openModal, openConfirm } = useModal();

  const filtered = doctors.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (user: typeof doctors[0]) => {
    openModal('user', 'view', { ...user });
  };

  const handleEdit = (user: typeof doctors[0]) => {
    openModal('user', 'edit', { ...user });
  };

  const handleDelete = (user: typeof doctors[0]) => {
    openConfirm(`Delete user "${user.name}"? This action cannot be undone.`, () => {
      console.log('Deleted', user.id);
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage system users and access levels</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: doctors.length, icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Active Users', value: doctors.filter((d) => d.status === 'online').length, icon: UserCheck, color: 'from-green-500 to-emerald-500' },
          { label: 'Offline Users', value: doctors.filter((d) => d.status === 'offline').length, icon: UserX, color: 'from-gray-500 to-gray-600' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="p-5 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${s.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-accent/50 border-border/30"
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-accent/20">
                <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Specialty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border/20 hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.specialty}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      user.status === 'online'
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-gray-500/15 text-gray-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleView(user)} className="h-8 px-2 text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(user)} className="h-8 px-2 text-blue-400 hover:text-blue-300">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(user)} className="h-8 px-2 text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border/30 bg-accent/10 text-xs text-muted-foreground">
          Showing {filtered.length} of {doctors.length} users
        </div>
      </Card>
    </div>
  );
}
