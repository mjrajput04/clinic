'use client';

import { analyticsData, doctors, appointments, patients } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { UserDistChart } from '@/components/charts/user-dist-chart';
import {
  Users,
  Calendar,
  Heart,
  TrendingUp,
  MessageSquare,
  Plus,
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Patients',
      value: '15,240',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Active Consultations',
      value: '24',
      change: '+8%',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Scheduled Appointments',
      value: '184',
      change: '+5%',
      icon: Calendar,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Avg Patient Satisfaction',
      value: '96%',
      change: '+2%',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
    },
  ];

  const revenueChartData = analyticsData;
  const satisfactionData = analyticsData.map((d) => ({
    name: d.month,
    satisfaction: d.satisfaction,
  }));

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Dr. Mitchell</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Plus className="h-4 w-4" />
          New Consultation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
              <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-2 p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6">Revenue & Consultations</h3>
          <div className="h-80 flex items-end justify-between gap-2 px-2">
            {revenueChartData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex gap-1 items-end h-56">
                  <div
                    className="w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${(item.revenue / 45000) * 100}%` }}
                  />
                  <div
                    className="w-3 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"
                    style={{ height: `${(item.consultations / 120) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span>Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded" />
              <span>Consultations</span>
            </div>
          </div>
        </Card>

        {/* Satisfaction Chart */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-6">Patient Satisfaction</h3>
          <div className="h-80 flex items-end justify-between gap-4 px-2">
            {satisfactionData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-6 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"
                  style={{ height: `${(item.satisfaction / 100) * 224}px` }}
                />
                <span className="text-xs text-muted-foreground text-center">{item.name}</span>
                <span className="text-xs font-semibold">{item.satisfaction}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Doctors & Appointments Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Doctors */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Top Doctors This Month</h3>
          <div className="space-y-3">
            {doctors.slice(0, 5).map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{doctor.patients}</p>
                  <p className="text-xs text-yellow-500 flex items-center gap-1">
                    ★ {doctor.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {appointments.slice(0, 5).map((apt) => {
              const doctor = doctors.find((d) => d.id === apt.doctorId);
              const patient = patients.find((p) => p.id === apt.patientId);
              return (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{patient?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      with {doctor?.name}
                    </p>
                    <p className="text-xs text-cyan-400 mt-1">{apt.time}</p>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    {apt.status}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
