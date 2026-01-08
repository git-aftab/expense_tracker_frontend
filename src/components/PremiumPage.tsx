import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const PremiumPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const response = await api.get("/payment/premium-status");
      console.log(response.data.isPremium);
      setIsPremium(response.data.isPremium);
    } catch (error) {
      console.error("Error checking premium status:", error);
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    setMessage({
      type: "",
      text: "",
    });

    try {
      // create order
      const orderResponse = await api.post("/payment/create-order");
      const { orderId, amount, keyId } = orderResponse.data;

      // simulate payment for demo now.
      const verifyResponse = await api.post("/payment/verify-payment", {
        orderId: orderId,
        paymentId: `pay_demo_${Date.now()}`,
        signature: `sign_demo_${Date.now()}`,
      });

      setMessage({
        type: "Success",
        text: verifyResponse.data.message,
      });

      //   Reload User Data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "Error",
        text:
          error.response?.data?.message || "Payment failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-xl shadow-2xl p-12 text-white text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4">You're a Premium Member!</h1>
          <p className="text-xl opacity-90 mb-8">
            Enjoy all premium features and advanced analytics
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Premium Features Active:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
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
              <div className="flex items-center gap-3">
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
              <div className="flex items-center gap-3">
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
                <span>Custom Date Ranges</span>
              </div>
              <div className="flex items-center gap-3">
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
    );
  }
  return (
    <div className="">
        <div className="text-center mb-12">
            <h1>upgrade to premium</h1>
            <p>unlock powerful features to take control of your finance</p>
        </div>

        {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'}`} ></div>
        )}
    </div>
  );
};

export default PremiumPage;
