import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import AllExpenses from './components/AllExpenses';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    💰 Expense Tracker
                  </span>
                </Link>
                <div className="flex space-x-4 items-center">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Add Expense
                  </Link>
                  <Link
                    to="/all"
                    className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    All Expenses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/all" element={<AllExpenses />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;