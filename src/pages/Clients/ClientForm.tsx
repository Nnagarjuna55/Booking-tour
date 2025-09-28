import { useForm } from "../../hooks/useForm";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import { createClient } from "../../api/clientApi";
import { FaUser, FaEnvelope, FaPhone, FaUsers } from "react-icons/fa";

const ClientForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { values, handleChange, reset } = useForm({
    fullName: "",
    email: "",
    phone: "",
    groupSize: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClient(values);
    reset();
    onSuccess();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaUser className="text-gray-500 mr-2" />
          <Input
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaEnvelope className="text-gray-500 mr-2" />
          <Input
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaPhone className="text-gray-500 mr-2" />
          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            required
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Group Size */}
        <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 bg-gray-50">
          <FaUsers className="text-gray-500 mr-2" />
          <Input
            label="Group Size"
            type="number"
            name="groupSize"
            value={values.groupSize}
            onChange={handleChange}
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
        </div>

        {/* Button */}
        <Button
          label="Save Client"
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        />
      </form>
    </div>
  );
};

export default ClientForm;
