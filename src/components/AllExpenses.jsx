import { useState } from "react";
import axios from "axios";

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [message, setMessage] = useState({ type: "", text: "" });

  return <div>AllExpenses</div>;
};

export default AllExpenses;
