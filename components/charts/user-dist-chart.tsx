'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface UserDistChartProps {
  activeUsers: number;
  inactiveUsers: number;
}

export function UserDistChart({ activeUsers, inactiveUsers }: UserDistChartProps) {
  const data = [
    { name: 'Active Users', value: activeUsers },
    { name: 'Inactive Users', value: inactiveUsers },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          <Cell fill="#06b6d4" />
          <Cell fill="#6b7280" />
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(20, 30, 50, 0.95)',
            border: '1px solid rgba(100, 150, 255, 0.3)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
