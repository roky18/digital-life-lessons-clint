import React from "react";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";

const Upgrade = () => {
  const { user } = useAuth();

  if (!user || user.isPremium) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">
          You are already a Premium user! ⭐
        </h2>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mb-10">
      <h3 className="text-primary text-center font-semibold my-6 mb-10 text-3xl">
        Upgrade
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          <thead>
            <tr className="font-semibold text-purple-400">
              <th>#</th>
              <th>Feature</th>
              <th>Free</th>
              <th>Premium ⭐</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Number of Lessons</td>
              <td className="text-red-600 font-semibold">Limited</td>
              <td className="text-green-600 font-semibold">Unlimited</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Premium Lesson Creation</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ad-free Experience</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Priority Listing</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>5</td>
              <td>All of Featured</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Life Time Access</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Access to All Life Lessons</td>
              <td className="text-red-600 font-semibold">Partial</td>
              <td className="text-green-600 font-semibold">Full</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-10">
        <Link to={`/dashboard/payment`}>
          <button className="btn text-black btn-success h-12 w-9/10">
            Upgrade to Premium <span className="
            text-red-600">৳ 1500</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Upgrade;
