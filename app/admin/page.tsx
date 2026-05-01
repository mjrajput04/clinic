'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users, TrendingUp, Activity, Building2, AlertCircle,
  CheckCircle, Clock, ArrowRight,
} from 'lucide-react';
import { adminMetrics, systemAlerts, auditLogs, clinics } from '@/lib/mock-data';
import Link from 'next/link';

const kpis = [
  { label: 'Total Users', value: adminMetrics.totalUsers.toLocaleString(), icon: Users, color: 'from-blue-500 to-cyan-500', change: '+8.2%' },
  { label: 'Active Users', value: adminMetrics.activeUsers.toLocaleString(), icon: Activity, color: 'from-green-500 to-emerald-500', change: '+5.1%' },
  { label: 'Total Revenue', value: `$${adminMetrics.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'from-blue-500 to-cyan-500', change: '+12.5%' },
  { label: 'Total Clinics', value: clinics.length.toString(), icon: Building2, color: 'from-orange-500 to-red-500', change: 'Stable' },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${kpi.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-400">{kpi.change}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </Card>
          );
        })}
      </div>

      {/* System Health + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-3">
            {[
              { name: 'Database', uptime: '99.9%', ok: true },
              { name: 'API Server', uptime: '99.8%', ok: true },
              { name: 'Cache Layer', uptime: '99.95%', ok: true },
              { name: 'AI Engine', uptime: `${adminMetrics.systemHealth}%`, ok: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
                <span className="text-xs text-green-400 font-semibold">{s.uptime}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-400" /> System Alerts
            </h3>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
              {systemAlerts.length} active
            </span>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border text-sm ${
                  alert.type === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <p className={`font-medium mb-0.5 ${alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}>
                  {alert.type === 'warning' ? '⚠' : 'ℹ'} {alert.severity.toUpperCase()}
                </p>
                <p className="text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Link href="/admin/logs">
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
              <div className="flex items-center gap-3">
                {log.status === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.user} · {log.target}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
