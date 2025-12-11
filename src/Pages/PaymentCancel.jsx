import { XCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
     return (
    <div className="min-h-screen flex items-center justify-center bg-red-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-xl p-8 text-center">
        
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-red-600">
          Payment Canceled
        </h1>

        <p className="text-gray-500 mt-2">
          Your payment was not completed.  
          If this was a mistake, you can try again anytime.
        </p>

        <div className="mt-6">
          <Link 
            to="/dashboard/payment"
            className="btn btn-error w-full"
          >
            Try Again
          </Link>
        </div>

        <div className="mt-3">
          <Link 
            to="/"
            className="btn btn-primary w-full"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentCancel;