import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            💰{" "}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Expense Tracker
            </span>
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Take control of your finances. Track expenses, analyze spending
            patterns, and achieve your financial goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-16">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition border-2 border-purple-600"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Track Expenses
              </h3>
              <p className="text-gray-600">
                Easily log and categorize your daily expenses in seconds
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Visual Analytics
              </h3>
              <p className="text-gray-600">
                Beautiful charts and insights to understand your spending
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your data is encrypted and protected with industry-standard
                security
              </p>
            </div>
          </div>

          {/* Premium Features */}
          <div className="mt-20 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl shadow-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">✨ Go Premium</h2>
            <p className="text-xl mb-8 opacity-90">
              Unlock advanced analytics, PDF exports, and more for just ₹99/year
            </p>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Export to PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Priority Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
