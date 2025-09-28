import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-96 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>

        {/* Email Input */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaEnvelope className="text-gray-500 mr-2" />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Button */}
        <Button
          label="Send Reset Link"
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        />
      </form>
    </div>
  );
};

export default ResetPassword;
