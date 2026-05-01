'use client';

import { billingData, patients } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, Mail } from 'lucide-react';


const monthlyData = [
  { month: 'Jan', paid: 12500, pending: 2300, overdue: 800 },
  { month: 'Feb', paid: 14200, pending: 1900, overdue: 500 },
  { month: 'Mar', paid: 15800, pending: 2100, overdue: 300 },
  { month: 'Apr', paid: 16500, pending: 1800, overdue: 200 },
  { month: 'May', paid: 17200, pending: 2500, overdue: 100 },
];

export default function BillingPage() {
  const totalRevenue = billingData.reduce((acc, bill) => acc + bill.amount, 0);
  const paidAmount = billingData.filter((b) => b.status === 'paid').reduce((acc, b) => acc + b.amount, 0);
  const pendingAmount = billingData.filter((b) => b.status === 'pending').reduce((acc, b) => acc + b.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Billing & Payments</h1>
          <p className="text-muted-foreground mt-2">Financial management</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-border/50 bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm">
          <p className="text-muted-foreground font-medium mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-green-400">${totalRevenue}</p>
          <p className="text-xs text-muted-foreground mt-2">From {billingData.length} transactions</p>
        </Card>
        <Card className="p-6 border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm">
          <p className="text-muted-foreground font-medium mb-2">Paid</p>
          <p className="text-3xl font-bold text-blue-400">${paidAmount}</p>
          <p className="text-xs text-muted-foreground mt-2">Successfully received</p>
        </Card>
        <Card className="p-6 border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-sm">
          <p className="text-muted-foreground font-medium mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">${pendingAmount}</p>
          <p className="text-xs text-muted-foreground mt-2">Awaiting payment</p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
        <div className="h-80 flex items-end justify-between gap-1 px-2">
          {monthlyData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex gap-1 items-end h-56">
                <div
                  className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                  style={{ height: `${(item.paid / 18000) * 100}%` }}
                />
                <div
                  className="flex-1 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t"
                  style={{ height: `${(item.pending / 3000) * 100}%` }}
                />
                <div
                  className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                  style={{ height: `${(item.overdue / 1000) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>Paid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span>Overdue</span>
          </div>
        </div>
      </Card>

      {/* Transactions */}
      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {billingData.map((bill) => {
            const patient = patients.find((p) => p.id === bill.patientId);
            return (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{patient?.name}</p>
                  <p className="text-sm text-muted-foreground">{bill.service}</p>
                  <p className="text-xs text-muted-foreground mt-1">{bill.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${bill.amount}</p>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                      bill.status === 'paid'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {bill.status}
                  </span>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="icon" variant="ghost" className="text-blue-400">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-cyan-400">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
