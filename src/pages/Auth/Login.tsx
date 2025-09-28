import { useState } from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button label="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;


// import { useState } from "react";
// import Input from "../../components/forms/Input";
// import Button from "../../components/forms/Button";
// import { useAuth } from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// // React Icons
// import { FaEnvelope, FaLock } from "react-icons/fa";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(form.email, form.password);
//       navigate("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-96 flex flex-col gap-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Admin Login
//         </h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-600 px-3 py-2 rounded-md text-sm">
//             {error}
//           </div>
//         )}

//         {/* Email */}
//         <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
//           <FaEnvelope className="text-gray-500 mr-2" />
//           <Input
//             label="Email"
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="flex-1 border-none bg-transparent focus:ring-0"
//           />
//         </div>

//         {/* Password */}
//         <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
//           <FaLock className="text-gray-500 mr-2" />
//           <Input
//             label="Password"
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="flex-1 border-none bg-transparent focus:ring-0"
//           />
//         </div>

//         <Button
//           label="Login"
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
//         />
//       </form>
//     </div>
//   );
// };

// export default Login;
