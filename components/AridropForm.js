import { useState } from "react";
import { useForm } from "react-hook-form";

const AirdropForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitForm = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <div className="inset-0 flex items-center justify-center p-4 overflow-auto mb-28">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-lg mb-24">
        <div className="text-center">
          <i className="fi fi-ss-parachute-box text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center ">
          Airdrop Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <label
              htmlFor="telegram"
              className="block text-sm font-medium text-gray-300"
            >
              Telegram Pseudo
            </label>
            <input
              type="text"
              id="telegram"
              placeholder="@username"
              {...register("telegram", {
                required: "Telegram pseudo is required",
              })}
              className=" p-2 mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {errors.telegram && (
              <p className="mt-1 text-sm text-red-400">
                {errors.telegram.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-300"
            >
              Twitter Handle
            </label>
            <input
              type="text"
              id="twitter"
              placeholder="@username"
              {...register("twitter", {
                required: "Twitter handle is required",
              })}
              className="p-2 mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {errors.twitter && (
              <p className="mt-1 text-sm text-red-400">
                {errors.twitter.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="p-2 mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="solana"
              className="block text-sm font-medium text-gray-300"
            >
              Solana Address
            </label>
            <input
              type="text"
              id="solana"
              placeholder="Solana address"
              {...register("solana", {
                required: "Solana address is required",
                pattern: {
                  value: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/, // eg: 7CXBG3tWYm9bH5bp4yHr8T1yZQYMQMF4uTVLV3m9SuCW
                  message: "Invalid Solana address format",
                },
              })}
              className="p-2 mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            {errors.solana && (
              <p className="mt-1 text-sm text-red-400">
                {errors.solana.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Enter a valid Solana address (32-44 characters, no spaces)
            </p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AirdropForm;
