import React, { useState, useEffect,} from "react";
import { useParams } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, useNavigate,  Link } from "react-router-dom";
import FieldPage from './FieldPage';
import LevelPage from "./LevelPage.jsx";
import RoadmapPage from "./RoadmapPage.jsx";
import DashboardPage from "./DashboardPage.jsx";
import Result from "./Result";
import { motion } from 'framer-motion';
import About from "./About.jsx";
import Career from "./Career";
import Program from "./Program";

// ✅ Placeholder for JobRolePage
const JobRolePage = () => {
  const { roleName } = useParams();
  return <h1>Job Role: {roleName.replace(/-/g, " ")}</h1>;
};

const App = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('/jobroleskills.json')
      .then((response) => response.json())
      .then((data) => {
        const uniqueFields = [...new Set(data.map(item => item.field))];
        setEntries(uniqueFields);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);
  const containerData = [
    {
      text: "We provide you with the option of test to know ur level.",
      image: "1stcontainer.svg",
    },
    {
      text: " We will segment your account to the result of test or yopur preferenced one",
      image: "2ndcontainer.svg",
    },
    {
      text: "WE provide custom roadmap with pdf,youtube courcesv recommendation also question for practice ",
      image: "3rdcontainer.svg",
    },
    {
      text: "Personalize progress tracking",
      image: "4thcontainer.svg",
    },
    // Add other data items as needed
  ];
  const handleFieldClick = (fieldName) => {
    navigate(`/field/${fieldName.toLowerCase().replace(/ /g, "-")}`);
  };

  const handleDropdownToggle = () => {
    setExpanded((prev) => !prev);
  };
  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Each word appears with a delay
        duration: 0.3,
      },
    }),
  };


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

            <Link to="/program" className="transition duration-300">
                PROGRAMS
              </Link>{" "}
              {/* Updated Link */}
              <Link to="/career" className="transition duration-300">
                CAREER
              </Link>{" "}
              {/* Updated Link */}
              <Link to="/about" className="transition duration-300">
                ABOUT
              </Link>
  <Link to="/dashboard" className="transition duration-300">DASHBOARD</Link>
</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full">
        {/* Learn, Practice, Accomplish Section */}
        <div className="h-[550px] w-full flex justify-between items-center">
          {/* Left Section */}
          <div className="text-[#FFFFFF] font-bold text-[70px] text-left pl-[80px] pt-10">
            <div className="block">LEARN</div>
            <div className="block">PRACTICE</div>
            <div className="block">ACCOMPLISH</div>
          </div>

          {/* Right Section (Image) */}
          <div className="flex justify-end items-center mt-[10%] h-full">
            <img src="/computer.png" alt="Inverted" className="object-contain pr-40" />
          </div>
        </div>

        {/* Field Buttons Grid */}
        <div className={`grid grid-cols-4 gap-4 p-10 w-[1370px] mx-auto ${expanded ? "max-h-[700px]  overflow-y-scroll  " : ""}`}>
          <div className="col-span-4 text-center text-white text-2xl font-bold mb-4">Select your field</div>
          
          {/* Grid Buttons */}
          {entries.slice(0, expanded ? entries.length : 8).map((field, index) => (
  <div
    key={index}
    className="bg-[#00FF88] text-white h-[80px] w-[300px] flex items-center justify-center rounded-[42px] transition-all duration-300 ease-out transform hover:scale-105"
    style={{ filter: "drop-shadow(0px 4px 37px rgba(0,0,0,0.5))" }}
  >
    <button
      onClick={() => handleFieldClick(field)}
      className="text-[#445982] font-bold text-[20px] rounded-[42px] transition-all duration-300 ease-out"
    >
      {field}
    </button>
  </div>
))}

        </div>

        {/* Dropdown Arrow */}
        <div className="flex justify-center mt-4">
          <button onClick={handleDropdownToggle} className="text-white text-3xl transition duration-300 transform hover:scale-110">
            {expanded ? "▲" : "▼"}
          </button>
        </div>

        {/* Info Section */}
        <div className="flex flex-col space-y-4 w-full p-5"></div>
      </div>

      <div className="w-full flex flex-col items-center gap-5 mt-10">
      {containerData.map((item, index) => {
        const words = item.text.split(" "); // Split text into words
   
         {/* animations */}
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false }} // Set to false to trigger on every scroll
            className="w-[80%] h-[450px] flex gap-5 items-center p-5 bg-[#445982] rounded-lg shadow-lg"
          >
            {/* Left Side (Alternates) */}
            {index % 2 === 0 ? (
              <>
                <div className="w-[30%] text-white text-xl font-bold">
                {words.map((word, i) => (
  <motion.span
    key={i}
    custom={i}
    variants={wordAnimation}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    className="inline-block mr-3" // Add margin-right for spacing
  >
    {word}
  </motion.span>
))}

                </div>
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-[70%] flex justify-center"
                >
                  <img
                    src={item.image}
                    alt="Illustration"
                    className="h-[400px] object-cover rounded-lg pl-60"
                  />
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-[70%] flex justify-center"
                >
                  <img
                    src={item.image}
                    alt="Illustration"
                    className="h-[400px] object-cover rounded-lg pr-60 "
                  />
                </motion.div>
                <div className="w-[30%] text-white text-xl font-bold">
                {words.map((word, i) => (
  <motion.span
    key={i}
    custom={i}
    variants={wordAnimation}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    className="inline-block mr-3" // Add margin-right for spacing
  >
    {word}
  </motion.span>
))}

                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
    {/* Footer */}
<footer className="bg-[#445982] text-white text-center " style={{ height: '300px' }}>
  <div className="flex flex-col justify-center mt-[100px]  items-center h-full">
    <p className="text-xl font-semibold mb-4">SKILL NAVIGATOR</p>
    <div className="flex space-x-6">
      <a href="#home" className="transition duration-300 hover:text-[#00FF88]">Home</a>
      <a href="#about" className="transition duration-300 hover:text-[#00FF88]">Programs</a>
      <a href="#signin" className="transition duration-300 hover:text-[#00FF88]">Career</a>
      <a href="#signup" className="transition duration-300 hover:text-[#00FF88]">About</a>
      <a href="#profile" className="transition duration-300 hover:text-[#00FF88]">Dashboard</a>
    </div>
    <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Skill Navigator. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
};


const FieldPageWrapper = () => {
  const { fieldName } = useParams();
  return <FieldPage fieldName={fieldName.replace(/-/g, " ")} />;
};
const AppWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/field/:fieldName" element={<FieldPageWrapper />} />
        <Route path="/job-role/:roleName" element={<JobRolePage />} />
        <Route path="/level/:jobRole/:level" element={<LevelPage />} />
       

        <Route path="/roadmap/:jobRole/:level" element={<RoadmapPage />} />
        <Route path="/result" element={<Result />} />
        
        <Route path="/about" element={<About />} /> {/* ✅ Added About Route */}
        <Route path="/roadmap/:skillName/:progress" element={<RoadmapPage />} />

        <Route path="/career" element={<Career />} /> {/* Career Page Route */}
        <Route path="/program" element={<Program />} />{" "}
        {/* Program Page Route */}
      </Routes>
    </Router>
  );
};
export default AppWrapper;
