'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, AlertCircle, CheckCircle, Clock, Heart,
  Brain, Pill, FileText, Share2, Download, TrendingUp,
} from 'lucide-react';
import { patients, aiOutputExamples } from '@/lib/mock-data';

type RiskLevel = 'high' | 'moderate' | 'low';

const riskConfig: Record<RiskLevel, { color: string; icon: React.ReactNode }> = {
  high: { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: <AlertCircle className="h-4 w-4" /> },
  moderate: { color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: <Clock className="h-4 w-4" /> },
  low: { color: 'text-green-400 bg-green-500/10 border-green-500/20', icon: <CheckCircle className="h-4 w-4" /> },
};

export default function AIOutputPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOutput = aiOutputExamples.find((a) => a.patientId === selectedId);
  const selectedPatient = patients.find((p) => p.id === selectedId);

  const getRisk = (level: string) =>
    riskConfig[(level as RiskLevel)] ?? riskConfig.low;

  const handleExport = () => alert('Report exported successfully!');
  const handleShare = () => alert('Report link copied to clipboard!');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Generated Output</h1>
        <p className="text-muted-foreground">Clinical analysis and recommendations powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm flex flex-col" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-accent/50 border-border/30"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredPatients.map((patient) => {
                const output = aiOutputExamples.find((a) => a.patientId === patient.id);
                const isSelected = selectedId === patient.id;
                const risk = output ? getRisk(output.riskLevel) : null;

                return (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedId(patient.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/30'
                        : 'bg-accent/30 hover:bg-accent/50 border border-border/20'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <img src={patient.avatar} alt={patient.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.age} yrs · {patient.condition}</p>
                        {risk && output && (
                          <span className={`inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-md border ${risk.color}`}>
                            {risk.icon}
                            <span className="capitalize">{output.riskLevel}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-3 pt-3 border-t border-border/20">
              {filteredPatients.length} patients
            </p>
          </Card>
        </div>

        {/* Analysis Panel */}
        <div className="lg:col-span-2">
          {selectedOutput && selectedPatient ? (
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-border/30">
                <div className="flex items-start gap-4">
                  <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-12 h-12 rounded-lg" />
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                    <p className="text-muted-foreground">{selectedPatient.age} years old · {selectedPatient.condition}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedOutput.title} · {selectedOutput.date}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${getRisk(selectedOutput.riskLevel).color}`}>
                  {getRisk(selectedOutput.riskLevel).icon}
                  <span className="capitalize">{selectedOutput.riskLevel} Risk</span>
                </span>
              </div>

              {/* Confidence Score */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-400" /> AI Confidence Score
                  </span>
                  <span className="text-lg font-bold text-blue-400">{selectedOutput.confidenceScore}%</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${selectedOutput.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Diagnosis */}
              <div className="mb-5">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400" /> Primary Diagnosis
                </h3>
                <p className="text-sm text-muted-foreground bg-accent/30 p-3 rounded-lg">{selectedOutput.diagnosis}</p>
              </div>

              {/* Clinical Analysis */}
              <div className="mb-5">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" /> Clinical Analysis
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedOutput.analysis}</p>
              </div>

              {/* Key Findings */}
              <div className="mb-5">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-yellow-400" /> Key Findings
                </h3>
                <ul className="space-y-1.5">
                  {selectedOutput.keyFindings.map((f, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medications */}
              <div className="mb-5">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <Pill className="h-4 w-4 text-cyan-400" /> Medications
                </h3>
                <div className="space-y-1.5">
                  {selectedOutput.medications.map((med, i) => (
                    <div key={i} className="p-2.5 bg-accent/30 rounded-lg border border-border/30 text-sm">{med}</div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-5">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" /> AI Recommendations
                </h3>
                <ul className="space-y-1.5">
                  {selectedOutput.recommendations.map((rec, i) => (
                    <li key={i} className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-sm flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow-up */}
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" /> Follow-up Recommended
                </span>
                <span className="text-base font-bold text-blue-400">{selectedOutput.followUp}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border/30">
                <Button onClick={handleExport} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export Report
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex-1" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center min-h-96">
              <div className="text-center">
                <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Select a patient to view AI analysis</p>
                <p className="text-muted-foreground text-sm">Choose from the list on the left to see detailed clinical analysis and recommendations</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
