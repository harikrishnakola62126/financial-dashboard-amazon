import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define the shape of our data
interface FinancialData {
  timestamp: string;
  value: number;
  category: string;
}

interface DashboardContextType {
  data: FinancialData[];
  isLoading: boolean;
  error: string | null;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>('2024');

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Generate mock data based on timeframe
        const mockData: FinancialData[] = [
          { timestamp: '2024-01', value: 125000, category: 'Revenue' },
          { timestamp: '2024-02', value: 135000, category: 'Revenue' },
          { timestamp: '2024-03', value: 118000, category: 'Revenue' },
          { timestamp: '2024-04', value: 142000, category: 'Revenue' },
          { timestamp: '2024-01', value: 95000, category: 'Expenses' },
          { timestamp: '2024-02', value: 88000, category: 'Expenses' },
          { timestamp: '2024-03', value: 102000, category: 'Expenses' },
          { timestamp: '2024-04', value: 91000, category: 'Expenses' },
        ].filter(item => item.timestamp.startsWith(timeframe));
        setData(mockData);
      } catch (err) {
        setError('Failed to load financial data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  const value = {
    data,
    isLoading,
    error,
    timeframe,
    setTimeframe,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};