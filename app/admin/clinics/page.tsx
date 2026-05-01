'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Edit, Building2, Plus } from 'lucide-react';
import { clinics, clinicData } from '@/lib/mock-data';
import { useModal } from '@/lib/modal-context';

export default function ClinicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { openModal } = useModal();

  const filtered = clinics.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (clinic: typeof clinics[0]) => {
    openModal('clinic', 'view', { ...clinic, doctors: String(clinic.doctors), patients: String(clinic.patients) });
  };

  const handleEdit = (clinic: typeof clinics[0]) => {
    openModal('clinic', 'edit', { ...clinic, doctors: String(clinic.doctors), patients: String(clinic.patients) });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Clinics Management</h1>
          <p className="text-muted-foreground">Manage clinic locations and configurations</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" /> Add Clinic
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clinics', value: clinicData.totalClinics },
          { label: 'Total Doctors', value: clinicData.totalDoctors },
          { label: 'Total Patients', value: clinicData.totalPatients.toLocaleString() },
          { label: 'Monthly Appointments', value: clinicData.monthlyAppointments.toLocaleString() },
        ].map((s, i) => (
          <Card key={i} className="p-5 border-border/50 bg-card/50 backdrop-blur-sm text-center">
            <p className="text-2xl font-bold text-blue-400">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-accent/50 border-border/30"
          />
        </div>
      </Card>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((clinic) => (
          <Card key={clinic.id} className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{clinic.name}</h3>
                  <p className="text-xs text-muted-foreground">{clinic.type}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                clinic.status === 'active'
                  ? 'bg-green-500/15 text-green-400'
                  : 'bg-gray-500/15 text-gray-400'
              }`}>
                {clinic.status}
              </span>
            </div>

            <div className="space-y-1.5 mb-4 text-sm text-muted-foreground">
              <p>{clinic.address}</p>
              <p>{clinic.phone} · {clinic.email}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <span><span className="font-bold text-blue-400">{clinic.doctors}</span> doctors</span>
                <span><span className="font-bold text-cyan-400">{clinic.patients.toLocaleString()}</span> patients</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleView(clinic)} className="h-8 px-2 text-muted-foreground hover:text-foreground">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleEdit(clinic)} className="h-8 px-2 text-blue-400 hover:text-blue-300">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
