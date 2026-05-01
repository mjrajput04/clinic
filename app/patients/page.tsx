import { patients } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

export default function PatientsPage() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Patients</h1>
          <p className="text-muted-foreground mt-2">Patient database and records</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="p-6 border-border/50 bg-gradient-to-br from-card/50 to-blue-500/5 backdrop-blur-sm hover:to-blue-500/10 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-16 h-16 rounded-full border-2 border-cyan-500/50"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="font-medium">{patient.condition}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium capitalize text-green-400">{patient.status}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Visit</p>
                <p className="font-medium">{patient.lastVisit}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-2">
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
