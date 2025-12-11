import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: userData } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      userId: user?._id,
      userEmail: user?.email,
      userName: user?.displayName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-3xl"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto text-center my-6 mb-10 bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-purple-600">
        Please Pay <br /> <span className="text-rose-500">৳1500</span>
      </h3>

      <p className="text-gray-700 text-sm mt-1">{userData?.email}</p>

      <p className="text-lg font-semibold text-amber-600 mt-2">
        For Premium Access ⭐
      </p>
      <button onClick={handlePayment} className="btn btn-primary w-1/2 h-12">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
