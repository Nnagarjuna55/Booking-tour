
import { FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        {/* Left */}
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">Tourist Platform</span>. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Terms
          </a>
          {/* Socials */}
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-indigo-600">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-indigo-600">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
