import { useEffect, useState } from "react";
import axios from "axios";

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [message, setMessage] = useState({ type: "", text: "" });

  const categories = [
    "All",
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Bills",
    "Health",
    "Other",
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/expenses");
      const data = response.data.expenses;
      console.log(data);
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/expenses/${id}`);
      setMessage({
        type: "success",
        text: "Expense Deleted Successfully",
      });
      fetchExpenses();
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete expense." });
      setTimeout(() => {
        setMessage({ type: "error", text: "Failed to delete expense." });
      }, 3000);
    }
  };

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.flilter((exp) => exp.catergory === filterCategory);

  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 ">
        <div className="text-xl text-gray-600">Loading</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">All Expenses</h1>
        <p className="text-gray-600">Manage and view all your expenses</p>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-gray-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center">
            {message.type === "success" ? (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Filter and stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter By Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
                {categories.map((cat)=>(
                    <option value={cat} key={cat}>{cat}</option>
                ))}
            </select>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Total in {filterCategory}</p>
            <p className="text-3xl font-bold text-purple-600">₹{totalAmount}</p>
          </div>
        </div>
      </div>

      {/* Expense Table */}
      {filteredExpenses.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-linear-to-r from-purple-600 to-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
      ):('')}
    </div>
  );
};

export default AllExpenses;
