import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router";

const JoinPremium = () => {
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto">
      <h3 className="text-primary text-center font-semibold mb-10 text-3xl">
        Join Premium
      </h3>
      <div className="flex flex-col items-center gap-10 my-24">
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json"
          className="w-72"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">Unlock Premium Lessons 🚀</h2>
          <p className="mb-4 text-gray-500">
            Get unlimited access to high-quality life lessons.
          </p>
          <button
            onClick={() => navigate("/upgrade")}
            className="btn flex mx-auto btn-primary"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPremium;
