import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, Share2, FileText } from 'lucide-react';

const medicalRecords = [
  {
    id: 1,
    patient: 'John Anderson',
    type: 'Lab Results',
    date: '2024-04-28',
    status: 'completed',
  },
  {
    id: 2,
    patient: 'Maria Garcia',
    type: 'X-Ray Imaging',
    date: '2024-04-26',
    status: 'completed',
  },
  {
    id: 3,
    patient: 'Robert Zhang',
    type: 'Consultation Notes',
    date: '2024-04-25',
    status: 'completed',
  },
  {
    id: 4,
    patient: 'John Anderson',
    type: 'ECG Report',
    date: '2024-04-24',
    status: 'pending',
  },
];

export default function MedicalRecordsPage() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground mt-2">Patient medical documents and reports</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
          <Plus className="h-4 w-4" />
          Upload Record
        </Button>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {medicalRecords.map((record) => (
          <Card
            key={record.id}
            className="p-4 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{record.type}</p>
                  <p className="text-sm text-muted-foreground">{record.patient}</p>
                  <p className="text-xs text-muted-foreground mt-1">{record.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    record.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {record.status}
                </span>
                <Button size="icon" variant="ghost" className="text-blue-400">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-cyan-400">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
