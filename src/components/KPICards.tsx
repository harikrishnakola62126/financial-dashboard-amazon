import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const KPICards: React.FC = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">Loading KPIs...</div>;
  }

  const revenue = data.filter(item => item.category === 'Revenue').reduce((sum, item) => sum + item.value, 0);
  const expenses = data.filter(item => item.category === 'Expenses').reduce((sum, item) => sum + item.value, 0);
  const profit = revenue - expenses;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  const kpis = [
    { title: 'Total Revenue', value: `$${(revenue / 1000).toFixed(0)}K`, icon: TrendingUp, trend: '+10.2%', color: 'text-green-500' },
    { title: 'Total Expenses', value: `$${(expenses / 1000).toFixed(0)}K`, icon: TrendingDown, trend: '-4.7%', color: 'text-red-500' },
    { title: 'Profit Margin', value: `${profitMargin.toFixed(1)}%`, icon: DollarSign, trend: '+2.5%', color: 'text-blue-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              <p className={`text-xs font-semibold ${kpi.color} mt-1`}>{kpi.trend}</p>
            </div>
            <kpi.icon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;