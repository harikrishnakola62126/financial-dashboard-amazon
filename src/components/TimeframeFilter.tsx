import React from 'react';
import { useDashboard } from '../context/DashboardContext';

const TimeframeFilter: React.FC = () => {
  const { timeframe, setTimeframe } = useDashboard();

  return (
    <div className="flex space-x-2">
      {['2023', '2024'].map((year) => (
        <button
          key={year}
          onClick={() => setTimeframe(year)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${timeframe === year ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

export default TimeframeFilter;