import { useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/expenses");
      setExpenses(response.data.expenses);

      const total = response.data.expenses.reduce(
        (sum, exp) => sum + exp.amount,
        0
      );
      setLoading(false);
    } catch (error) {
      console.log("Error Fetching expenses", error);
      setLoading(false);
    }
  };

  const getCategoryData = () => {
    const categoryMap = {};
    expenses.forEach((expense) => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] += expense.amount;
      }
    });
    return Object.keys(categoryMap).map((category) => ({
      name: category,
      value: categoryMap[category],
    }));
  };

  if(loading){
    return(
        <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading....</div>
        </div>
    )
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
