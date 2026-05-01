'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Send,
  Settings,
  Copy,
  Heart,
  Clock,
  Volume2,
} from 'lucide-react';
import { Waveform } from '@/components/waveform';
import { patients, doctors } from '@/lib/mock-data';

const currentPatient = patients[0];
const currentDoctor = doctors[0];

const aiSuggestions = [
  {
    id: 1,
    category: 'Diagnosis',
    text: 'Consider checking blood pressure in both arms',
    confidence: 92,
  },
  {
    id: 2,
    category: 'Treatment',
    text: 'Current medication appears effective',
    confidence: 88,
  },
  {
    id: 3,
    category: 'Follow-up',
    text: 'Schedule follow-up in 4 weeks',
    confidence: 85,
  },
];

const transcriptLines = [
  {
    speaker: 'Doctor',
    text: 'Good morning, how have you been feeling lately?',
    time: '10:00 AM',
  },
  {
    speaker: 'Patient',
    text: 'Pretty good, no major complaints. Just some occasional fatigue.',
    time: '10:02 AM',
  },
  {
    speaker: 'Doctor',
    text: 'Let\'s do a quick blood pressure check...',
    time: '10:04 AM',
  },
  {
    speaker: 'AI Assistant',
    text: 'Blood pressure reading: 128/82 mmHg - within normal range',
    time: '10:05 AM',
  },
];

export default function ConsultationPage() {
  const [isRecording, setIsRecording] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('transcript');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Consultation</h1>
          <p className="text-muted-foreground mt-1">Real-time AI-assisted consultation</p>
        </div>
      </div>

      {/* Main Consultation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video & Waveform Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Area */}
          <Card className="border-border/50 bg-gradient-to-br from-background/50 via-background/30 to-blue-500/5 backdrop-blur-sm overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 relative flex items-center justify-center group">
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse" />
              </div>

              {/* Doctor Video */}
              <div className="absolute top-4 right-4 w-32 h-32 rounded-lg border-2 border-blue-500/50 overflow-hidden bg-slate-800 flex items-center justify-center">
                <img
                  src={currentDoctor.avatar}
                  alt={currentDoctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Large Patient Avatar */}
              <div className="text-center z-10">
                <img
                  src={currentPatient.avatar}
                  alt={currentPatient.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-500/50"
                />
                <h3 className="text-xl font-semibold">{currentPatient.name}</h3>
                <p className="text-muted-foreground text-sm">{currentPatient.condition}</p>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Consultation Active</span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 px-4 py-2 rounded-lg border border-border/50">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold font-mono">{formatTime(duration)}</span>
              </div>
            </div>
          </Card>

          {/* Waveform */}
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Audio Waveform</h3>
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-cyan-400" />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-background/50 to-blue-500/5 p-4 border border-border/30">
              <Waveform isRecording={isRecording} animated={true} />
            </div>
          </Card>

          {/* Control Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => setIsRecording(!isRecording)}
              className={`gap-2 ${
                isRecording
                  ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30'
                  : 'bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30'
              }`}
            >
              {isRecording ? (
                <>
                  <Mic className="h-5 w-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Start Recording
                </>
              )}
            </Button>

            <Button
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              className="gap-2"
            >
              {isMuted ? (
                <>
                  <MicOff className="h-5 w-5" />
                  Unmute
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Mute
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-destructive hover:bg-destructive/10"
            >
              <PhoneOff className="h-5 w-5" />
              End Consultation
            </Button>
          </div>
        </div>

        {/* Right Sidebar - AI Suggestions & Info */}
        <div className="space-y-4">
          {/* Patient Info Card */}
          <Card className="p-4 border-border/50 bg-gradient-to-br from-card/50 to-blue-500/5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={currentPatient.avatar}
                alt={currentPatient.name}
                className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
              />
              <div>
                <p className="font-semibold">{currentPatient.name}</p>
                <p className="text-xs text-muted-foreground">Age {currentPatient.age}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Condition</p>
                <p className="font-medium">{currentPatient.condition}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-medium capitalize text-green-400">{currentPatient.status}</p>
              </div>
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card className="p-4 border-border/50 bg-gradient-to-br from-card/50 to-purple-500/5 backdrop-blur-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-purple-400" />
              AI Suggestions
            </h3>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 rounded-lg bg-accent/30 border border-border/30 hover:border-purple-500/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-xs font-semibold text-purple-400 uppercase">
                      {suggestion.category}
                    </p>
                    <span className="text-xs bg-purple-500/20 px-2 py-1 rounded text-purple-300">
                      {suggestion.confidence}%
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {suggestion.text}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full mt-2 h-8 gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="h-3 w-3" />
                    Copy to note
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Vitals */}
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Patient Vitals</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Pressure</span>
                <span className="font-semibold text-green-400">128/82 mmHg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heart Rate</span>
                <span className="font-semibold text-green-400">72 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">O2 Saturation</span>
                <span className="font-semibold text-green-400">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temperature</span>
                <span className="font-semibold text-green-400">98.6°F</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Transcript & Notes Section */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex border-b border-border/50">
          {['transcript', 'notes', 'notes-ai'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-cyan-500 text-cyan-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'transcript' && 'Live Transcript'}
              {tab === 'notes' && 'Doctor Notes'}
              {tab === 'notes-ai' && 'AI Summary'}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4">
          {activeTab === 'transcript' && (
            <div className="space-y-4 h-80 overflow-y-auto">
              {transcriptLines.map((line, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        line.speaker === 'AI Assistant'
                          ? 'bg-purple-500/20 text-purple-400'
                          : line.speaker === 'Doctor'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {line.speaker}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground/90">{line.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{line.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="h-80 overflow-y-auto">
                <p className="text-muted-foreground text-sm">
                  Doctor notes will appear here during the consultation...
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-4 py-2 rounded-lg bg-accent/30 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50"
                />
                <Button size="icon" className="gap-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notes-ai' && (
            <div className="h-80 overflow-y-auto">
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-border/50 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Summary</h4>
                  <p className="text-sm text-foreground/80">
                    Patient presents with stable condition. Vitals within normal range. No acute concerns detected.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Key Points</h4>
                  <ul className="text-sm text-foreground/80 space-y-1 ml-4 list-disc">
                    <li>BP: 128/82 - optimal</li>
                    <li>HR: 72 bpm - normal</li>
                    <li>Reports fatigue - monitor closely</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Recommendations</h4>
                  <p className="text-sm text-foreground/80">
                    Continue current medication. Schedule follow-up in 4 weeks. Recommend increased water intake.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
