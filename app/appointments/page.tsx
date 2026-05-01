import { appointments, doctors, patients } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Edit, Trash2, CheckCircle } from 'lucide-react';

export default function AppointmentsPage() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-2">Manage patient consultations</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
          <Plus className="h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {appointments.map((apt) => {
          const doctor = doctors.find((d) => d.id === apt.doctorId);
          const patient = patients.find((p) => p.id === apt.patientId);
          return (
            <Card
              key={apt.id}
              className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {patient?.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{patient?.name}</p>
                    <p className="text-sm text-muted-foreground">with {doctor?.name}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    {apt.status}
                  </span>
                  <p className="text-xs text-muted-foreground">{apt.type}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
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
