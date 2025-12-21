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
            <div className={`p-4 rounded-lg ${message.type === 'success'}`}></div>
        )}
    </div>
  );
};

export default AllExpenses;
