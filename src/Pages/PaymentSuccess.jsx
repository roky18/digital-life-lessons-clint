import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-xl p-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <h1 className="text-xl mt-2 font-bold text-blue-600">
          🌼🌻 Congratulations! 🌻🌼
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your payment. Your premium access has been activated
          successfully ✔✔.
        </p>

        <div className="mt-6">
          <Link to="/dashboard" className="btn btn-success w-full">
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-3">
          <Link to="/" className="btn btn-primary w-full">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
