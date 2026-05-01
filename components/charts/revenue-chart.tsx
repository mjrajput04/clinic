'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
        <YAxis stroke="rgba(255,255,255,0.5)" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 30, 50, 0.95)',
            border: '1px solid rgba(100, 150, 255, 0.3)',
            borderRadius: '8px',
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: '#10b981', r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
