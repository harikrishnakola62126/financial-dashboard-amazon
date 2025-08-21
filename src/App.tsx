import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { DashboardProvider } from './context/DashboardContext';
import './App.css';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <main className="p-4 md:p-8">
          <Dashboard />
        </main>
      </div>
    </DashboardProvider>
  );
}

export default App;