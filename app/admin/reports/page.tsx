'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileBarChart, TrendingUp, Users, Calendar } from 'lucide-react';
import { analyticsData, billingData, patients, doctors } from '@/lib/mock-data';

const reportTypes = ['Overview', 'Revenue', 'Users', 'Appointments'];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('Overview');
  const [dateRange, setDateRange] = useState('last30');

  const handleExport = (name: string) => {
    alert(`Exporting "${name}" report...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Comprehensive system reports and analytics</p>
        </div>
        <Button onClick={() => handleExport(activeReport)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
          <Download className="h-4 w-4 mr-2" /> Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            {reportTypes.map((type) => (
              <Button
                key={type}
                size="sm"
                variant={activeReport === type ? 'default' : 'outline'}
                onClick={() => setActiveReport(type)}
                className={activeReport === type ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-0' : ''}
              >
                {type}
              </Button>
            ))}
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="ml-auto px-3 py-1.5 bg-accent/50 border border-border/30 rounded-lg text-sm text-foreground"
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="year">This year</option>
          </select>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$178,300', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
          { label: 'Total Patients', value: patients.length.toString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Total Doctors', value: doctors.length.toString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Consultations', value: '196', icon: Calendar, color: 'from-orange-500 to-red-500' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="p-5 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${s.color} flex items-center justify-center mb-3`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Monthly Trend */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-blue-400" /> Monthly Trend
          </h3>
          <Button variant="ghost" size="sm" onClick={() => handleExport('Monthly Trend')} className="text-muted-foreground">
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="py-3 text-left font-semibold text-muted-foreground">Month</th>
                <th className="py-3 text-right font-semibold text-muted-foreground">Consultations</th>
                <th className="py-3 text-right font-semibold text-muted-foreground">Revenue</th>
                <th className="py-3 text-right font-semibold text-muted-foreground">Patients</th>
                <th className="py-3 text-right font-semibold text-muted-foreground">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((row, i) => (
                <tr key={i} className="border-b border-border/20 hover:bg-accent/20 transition-colors">
                  <td className="py-3 font-medium">{row.month}</td>
                  <td className="py-3 text-right">{row.consultations}</td>
                  <td className="py-3 text-right text-green-400">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 text-right">{row.patients}</td>
                  <td className="py-3 text-right">
                    <span className="text-cyan-400">{row.satisfaction}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Billing Summary */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Billing</h3>
          <Button variant="ghost" size="sm" onClick={() => handleExport('Billing')} className="text-muted-foreground">
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
        <div className="space-y-2">
          {billingData.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
              <div>
                <p className="text-sm font-medium">{bill.service}</p>
                <p className="text-xs text-muted-foreground">{bill.date} · {bill.patientId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${bill.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  bill.status === 'paid'
                    ? 'bg-green-500/15 text-green-400'
                    : 'bg-yellow-500/15 text-yellow-400'
                }`}>
                  {bill.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
