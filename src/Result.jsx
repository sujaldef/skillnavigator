import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedJobRole, setSelectedJobRole] = useState("");
const [selectedLevel, setSelectedLevel] = useState("");
  const { results } = location.state || { results: [] };
 
  const { jobRole, level } = location.state || {};
  // Group results by skill
  const skillStats = results.reduce((acc, { skill, isCorrect }) => {
    if (!acc[skill]) {
      acc[skill] = { correct: 0, total: 0 };
    }
    acc[skill].total += 1;
    if (isCorrect) {
      acc[skill].correct += 1;
    }
    return acc;
  }, {});

  const score = results.filter((r) => r.isCorrect).length;
  const total = results.length;

  // Calculate the percentage
  const percentage = total > 0 ? (score / total) * 100 : 0;
  const circumference = 2 * Math.PI * 16; // Circle's circumference (2 * PI * radius)
  const strokeDasharrayValue = (percentage / 100) * circumference;

  // State to store dynamic values
  const [strokeDashArray, setStrokeDashArray] = useState(strokeDasharrayValue);
  const [displayScore, setDisplayScore] = useState(`${score}/${total}`);

  useEffect(() => {
    setStrokeDashArray(strokeDasharrayValue);
    setDisplayScore(`${score}/${total}`);
  }, [score, total, strokeDasharrayValue]);
  
  const handlestartlearning = (event) => {
    event.preventDefault();
    
  navigate(`/level/${jobRole}/${level}`);
  };
  
  

  return (
  <div className="flex h-screen w-screen bg-[#34415C] overflow-hidden">
            {/* Navbar (Fixed) */}
            <nav className="bg-[#445982] shadow-lg h-[70px] w-full fixed top-0 left-0 z-50 flex items-center px-4">
              <div className="w-[30%] text-2xl font-bold text-[#00FF88] font-montserrat">
                <div>SKILL</div>
                <div>NAVIGATOR.</div>
              </div>
              <div className="w-[70%] flex justify-between text-[#FFFFFF] text-[16px] font-montserrat">
                <Link to="/" className="transition duration-300">
                  HOME
                </Link>
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
                <Link to="/dashboard" className="transition duration-300">
                  DASHBOARD
                </Link>
              </div>
            </nav>

      {/* Main Content */}
      <div className="flex w-full h-full pt-[5%] p-4">
        {/* Left Container */}
        <div className="w-[30%] flex flex-col items-center">
          {/* Progress Circle */}
          <div className="relative size-60">
  <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36">
    <circle
      cx="18" cy="18" r="16"
      stroke="#00ff88"  // Explicitly setting stroke to red
      fill="#d1ffdd"
      strokeWidth="1"
      strokeDasharray="75 100"
      strokeLinecap="round"
    />
    <circle
      cx="18" cy="18" r="16"
      stroke="#009e52"  // Explicitly setting stroke to green
      fill="none"
      strokeWidth="2"
      strokeDasharray={`${strokeDashArray} ${circumference}`}
      strokeLinecap="round"
    />
  </svg>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <span className="text-4xl font-bold text-[#009e52]">{displayScore}</span>
    <span className="text-[#009e52] block">Score</span>
  </div>
</div>


          {/* Bottom Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center overflow-hidden mt-4">
            <img
              src="greatejob.jpg"
              alt="Learning Illustration"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Right Container */}
        <div className="w-[70%] flex flex-col gap-8 pl-6">
          {/* Motivation Section */}
          <div className="h-[15%] m-10 rounded-full bg-white flex gap-6 items-center justify-center">
            <div className="w-[70%] p-6 text-2xl text-center">
              <h1> Improve your performance by learning </h1>
            </div>
            <div className="w-[30%] flex items-center justify-center">
              <button
                onClick={handlestartlearning}
                className="bg-[#00FF88] text-white text-xl font-bold px-6 py-3 rounded-full hover:scale-105 transition-all duration-300"
              >
                Let's Start Learning
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="h-[70%] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Summary</h2>

            {/* Skill Performance List */}
            <div className="w-full flex flex-col gap-4">
  {Object.entries(skillStats).map(([skill, { correct, total }]) => (
    <div key={skill} className="flex justify-between bg-gray-100 p-3 rounded-lg shadow">
      <span className="text-lg font-medium text-gray-700">{skill}</span>
      <span className="text-lg font-semibold text-[#009e52]">
        {correct}/{total} Correct
      </span>
    </div>
  ))}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
