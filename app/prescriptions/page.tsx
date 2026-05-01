import { prescriptions, patients } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';

export default function PrescriptionsPage() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground mt-2">Medication prescriptions</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
          <Plus className="h-4 w-4" />
          New Prescription
        </Button>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-3">
        {prescriptions.map((rx) => {
          const patient = patients.find((p) => p.id === rx.patientId);
          return (
            <Card
              key={rx.id}
              className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                      {rx.medication.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{rx.medication}</p>
                      <p className="text-xs text-muted-foreground">Patient: {patient?.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Dosage</p>
                      <p className="font-medium">{rx.dosage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-medium">{rx.frequency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">{rx.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    {rx.status}
                  </span>
                  <p className="text-xs text-muted-foreground">{rx.prescribedDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
