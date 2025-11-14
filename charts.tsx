
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const chartColors = {
  blue: '#3b82f6',
  sky: '#0ea5e9',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  emerald: '#10b981',
  rose: '#f43f5e',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-800 p-2 border border-stone-700 rounded-md shadow-lg">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>{`${pld.name}: ${pld.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export const AttendanceTrendChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis dataKey="name" stroke="#9ca3af" />
      <YAxis stroke="#9ca3af" />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ color: '#d1d5db' }} />
      <Line type="monotone" dataKey="attendance" stroke={chartColors.blue} strokeWidth={2} activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export const AssignmentStatsChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis dataKey="name" stroke="#9ca3af" />
      <YAxis stroke="#9ca3af" />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ color: '#d1d5db' }}/>
      <Bar dataKey="submitted" fill={chartColors.emerald} />
      <Bar dataKey="pending" fill={chartColors.rose} />
    </BarChart>
  </ResponsiveContainer>
);

export const EventParticipationChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Tooltip content={<CustomTooltip />}/>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={Object.values(chartColors)[index % Object.keys(chartColors).length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export const StudentAttendanceSummary = ({ percentage }: { percentage: number }) => {
    const data = [{ name: 'Attendance', value: percentage, fill: percentage > 75 ? chartColors.emerald : percentage > 50 ? '#f59e0b' : chartColors.rose }];
    return (
        <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart 
                innerRadius="70%" 
                outerRadius="85%" 
                data={data} 
                startAngle={90} 
                endAngle={-270}
                barSize={20}
            >
                <RadialBar
                    background
                    dataKey="value" 
                    cornerRadius={10}
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-3xl font-bold">
                    {`${percentage}%`}
                </text>
                <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-stone-400 text-sm">
                    Attendance
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    );
};
