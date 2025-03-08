import { motion } from "framer-motion";

import { BrowserRouter as Router, Routes, Route, useNavigate,  Link } from "react-router-dom";
const Program = () => {
  return (
    <div className="min-h-screen  bg-[#34415C] font-montserrat">
    {/* Navbar */}
    <nav className=" fixed bg-[#445982] shadow-lg h-[70px] w-full drop-shadow-[0px_5px_16px_rgba(68,89,130,0.7)] z-50">
      <div className="w-full">
        <div className="flex justify-between">
          {/* Logo Section */}
          <div className="w-[30%] text-2xl font-bold text-[#00FF88] pl-3 text-[28px] font-montserrat text-2xl p-1">
            <div className="block">SKILL</div>
            <div className="block">NAVIGATOR.</div>
          </div>

          {/* Links Section */}
          <div className="w-[70%] flex justify-between pr-10 pt-9 text-[#FFFFFF] text-[16px] font-montserrat">
      <Link to="/" className="transition duration-300">HOME</Link>
      <Link to="/program" className="transition duration-300">PROGRAMS</Link> {/* Updated Link */}
      <Link to="/career" className="transition duration-300">CAREER</Link>   {/* Updated Link */}
      <Link to="/about" className="transition duration-300">ABOUT</Link>
      <Link to="/dashboard" className="transition duration-300">DASHBOARD</Link>
    </div>
        </div>
      </div>
    </nav>
    <div className="min-h-screen bg-[#34415C] text-white pt-[10%] py-16 px-8 md:px-16 lg:px-32">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Programs
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore our structured programs designed to upskill individuals across various domains and expertise levels.
      </motion.p>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-3">📖 Beginner Programs</h2>
          <p className="text-gray-400">
            Get started with foundational skills and step into the tech world with confidence.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-3">🎓 Advanced Learning</h2>
          <p className="text-gray-400">
            Enhance your expertise with specialized training programs tailored for professionals.
          </p>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default Program;
