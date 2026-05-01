'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  AlertCircle,
  Download,
} from 'lucide-react';
import { adminMetrics, analyticsData } from '@/lib/mock-data';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Analytics</h1>
          <p className="text-muted-foreground">
            System performance and analytics overview
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: `$${adminMetrics.totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            change: '+12.5%',
            color: 'from-green-500 to-emerald-500',
          },
          {
            label: 'Total Users',
            value: adminMetrics.totalUsers.toLocaleString(),
            icon: Users,
            change: '+8.2%',
            color: 'from-blue-500 to-cyan-500',
          },
          {
            label: 'System Health',
            value: `${adminMetrics.systemHealth}%`,
            icon: Zap,
            change: 'Optimal',
            color: 'from-purple-500 to-pink-500',
          },
          {
            label: 'Uptime',
            value: `${adminMetrics.uptime}%`,
            icon: BarChart3,
            change: 'Stable',
            color: 'from-orange-500 to-red-500',
          },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card
              key={idx}
              className="p-6 border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-400">
                  {metric.change}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="col-span-1 lg:col-span-2 p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
          <div className="h-80 flex items-end justify-between gap-2 px-2">
            {analyticsData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                  style={{ height: `${(item.revenue / 45000) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Users */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6">User Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Active Users</span>
                <span className="font-semibold text-cyan-400">
                  {adminMetrics.activeUsers}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{
                    width: `${(adminMetrics.activeUsers / adminMetrics.totalUsers) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Inactive Users</span>
                <span className="font-semibold text-gray-400">
                  {adminMetrics.totalUsers - adminMetrics.activeUsers}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gray-500 to-gray-600"
                  style={{
                    width: `${((adminMetrics.totalUsers - adminMetrics.activeUsers) / adminMetrics.totalUsers) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* System Health */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          System Health Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Database', status: 'healthy', uptime: '99.9%' },
            { name: 'API Server', status: 'healthy', uptime: '99.8%' },
            { name: 'Cache Layer', status: 'healthy', uptime: '99.95%' },
          ].map((service, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-lg border border-green-500/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{service.name}</span>
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground">
                Status: <span className="text-green-400">Healthy</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Uptime: <span className="text-cyan-400">{service.uptime}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm border-orange-500/30">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-400" />
          System Alerts
        </h3>
        <div className="space-y-2">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm">
            <p className="font-medium text-yellow-400 mb-1">
              High Memory Usage
            </p>
            <p className="text-muted-foreground">
              Server memory usage at 85%. Consider scaling up resources.
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm">
            <p className="font-medium text-blue-400 mb-1">
              Scheduled Maintenance
            </p>
            <p className="text-muted-foreground">
              Database maintenance scheduled for tonight at 2:00 AM UTC.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
