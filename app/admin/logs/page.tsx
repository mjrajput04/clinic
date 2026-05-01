'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, CheckCircle, XCircle, ScrollText, Filter } from 'lucide-react';
import { auditLogs } from '@/lib/mock-data';

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all');

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Logs & Audit</h1>
          <p className="text-muted-foreground">System activity and security audit trail</p>
        </div>
        <Button variant="outline" onClick={() => alert('Exporting logs...')}>
          <Download className="h-4 w-4 mr-2" /> Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Events', value: auditLogs.length, color: 'text-foreground' },
          { label: 'Successful', value: auditLogs.filter((l) => l.status === 'success').length, color: 'text-green-400' },
          { label: 'Failed', value: auditLogs.filter((l) => l.status === 'failed').length, color: 'text-red-400' },
        ].map((s, i) => (
          <Card key={i} className="p-5 border-border/50 bg-card/50 backdrop-blur-sm text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-accent/50 border-border/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(['all', 'success', 'failed'] as const).map((s) => (
              <Button
                key={s}
                size="sm"
                variant={statusFilter === s ? 'default' : 'outline'}
                onClick={() => setStatusFilter(s)}
                className={statusFilter === s ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-0' : ''}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-accent/20">
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
                <th className="px-6 py-4 text-left font-semibold">Target</th>
                <th className="px-6 py-4 text-left font-semibold">IP Address</th>
                <th className="px-6 py-4 text-left font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-border/20 hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4">
                    {log.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-accent/50 rounded text-xs">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{log.target}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{log.ip}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border/30 bg-accent/10 text-xs text-muted-foreground flex items-center gap-2">
          <ScrollText className="h-3 w-3" />
          Showing {filtered.length} of {auditLogs.length} log entries
        </div>
      </Card>
    </div>
  );
}
