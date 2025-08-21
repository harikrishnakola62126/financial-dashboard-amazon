import React from 'react';
import KPICards from './KPICards';
import FinancialChart from './FinancialChart';
import TimeframeFilter from './TimeframeFilter';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Filter Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Key Metrics</h2>
        <TimeframeFilter />
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue vs. Expenses Trend</h3>
        <FinancialChart />
      </div>
    </div>
  );
};

export default Dashboard;