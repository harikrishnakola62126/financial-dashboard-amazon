import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const FinancialChart: React.FC = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <div className="h-80 flex items-center justify-center">Loading chart...</div>;
  }

  // Transform data for the chart: group by timestamp
  const chartData: { [key: string]: any } = {};

  data.forEach((item) => {
    if (!chartData[item.timestamp]) {
      chartData[item.timestamp] = { timestamp: item.timestamp };
    }
    chartData[item.timestamp][item.category] = item.value;
  });

  const chartDataArray = Object.values(chartData);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartDataArray} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
          <Legend />
          <Line type="monotone" dataKey="Revenue" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Expenses" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;