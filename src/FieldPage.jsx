import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const FieldPage = ({ fieldName }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [jobRoles, setJobRoles] = useState([]);
  const navigate = useNavigate();
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const levels = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];
  // ✅ Fetch job roles based on fieldName
  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await fetch('/jobroleskills.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Data:", data);  // ✅ Debug log

        const fieldData = data
          .filter((item) => item.field.toLowerCase() === fieldName.toLowerCase())
          .map((item) => item.jobrole);

        const uniqueJobRoles = [...new Set(fieldData)];  // ✅ Remove duplicates
        console.log("Unique Job Roles:", uniqueJobRoles);

        setJobRoles(uniqueJobRoles);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };

    fetchJobRoles();
  }, [fieldName]);

  // ✅ Handle job role selection
  const handleFieldClick = (roleName) => {
    setSelectedJobRole(roleName);
  };

  // ✅ Popup control
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // ✅ Handle level selection
  const handleLevelChange = (level) => {
    setSelectedLevel(selectedLevel === level ? "" : level);
  };
  // ✅ Navigation for "Start the Learning"
const handleKnowYourLevel = (event) => {
  event.preventDefault();
  if (!selectedJobRole) {
    setShowPopup(true);
    return;
  }
  navigate(`/level/${fieldName}/${selectedLevel}`, {
    state: { jobRole: selectedJobRole, level: selectedLevel }  // Pass jobRole & level
  });
};

// ✅ Navigation for "Take Test"
const handleFetchRoadmap = (event) => {
  event.preventDefault();
  if (!selectedJobRole) {
    setShowPopup(true);
    return;
  }
  navigate(`/roadmap/${fieldName}/${selectedJobRole}`, {
    state: { jobRole: selectedJobRole }  // Pass jobRole & level (Novice by default)
  });
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

  {/* Main Content - Full Height Below Navbar */}
  <div className="flex flex-1 overflow-hidden pt-[70px]">
    {/* Left Section (70%) */}
    <div className="flex-1 flex flex-col gap-4 p-10">
      {/* First Section (30% height) */}
      <div className="h-[30%] rounded-[42px] text-[23px] bg-[#D9D9D9] p-10 flex flex-col justify-center">
        <h1 className="mb-4">
          Want the best personalized learning experience? Take the skill test to accurately assess your level rather than selecting it yourself!
        </h1>
        <div className="flex justify-center"> 
          <button
            onClick={handleFetchRoadmap}
            className="bg-[#00FF88] text-white h-[50px] w-[400px] rounded-[42px] transition-all duration-300 ease-out transform hover:scale-105"
          >
            Take Test
          </button>
        </div>
      </div>

      {/* Second Section (70% height) */}
      <div className="h-[70%] rounded-[42px] bg-[#D9D9D9] flex flex-col justify-center p-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Select Your Current Level
        </h2>
        <div className="space-y-2 ">
      {levels.map((level) => (
        <label key={level} className="flex items-center cursor-pointer space-x-2">
        <div className="relative scale-75">
          <input
            type="checkbox"
            id={level}
            className="peer hidden"
            checked={selectedLevel === level}
            onChange={() => handleLevelChange(level)}
          />
          <div
            className="relative flex size-12 items-center justify-center overflow-hidden rounded-full 
              bg-gradient-to-tr from-[#00FF88] to-white p-2.5 duration-100 hover:p-2 scale-[80%]"
          >
            {/* White background circle that disappears when checked */}
            <div
              className={`size-full rounded-full bg-white transition-all ${
                selectedLevel === level ? "size-0" : "size-full"
              }`}
            ></div>
      
            {/* Checkmark part 1: Left diagonal stroke */}
            <div
              className={`absolute left-[1.1rem] h-[3px] w-[20px] rounded-sm bg-[#34415C] duration-300 
                ${selectedLevel === level ? "opacity-100 translate-x-0 translate-y-0 rotate-[-41deg]" : "opacity-0 translate-x-10 -translate-y-10"}`}
            ></div>
      
            {/* Checkmark part 2: Right diagonal stroke */}
            <div
              className={`absolute left-2.5 top-6 h-[3px] w-[12px] rounded-sm bg-[#34415C] duration-300 
                ${selectedLevel === level ? "opacity-100 translate-x-0 translate-y-0 rotate-[45deg]" : "opacity-0 -translate-x-10 -translate-y-10"}`}
            ></div>
          </div>
        </div>
        <span className="text-gray-700">{level}</span>
      </label>
      
      
      ))}
    </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleKnowYourLevel}
            className="bg-[#00FF88] text-white h-[50px] w-[400px] rounded-[42px] transition-all duration-300 ease-out transform hover:scale-105 text-[23px]"
          >
            Start the Learning
          </button>
        </div>
      </div>
    </div>

    {/* Right Section: Job Roles Grid (30%) - Only Scrollable Part */}
    <div className="w-1/3 bg-[#445982] text-white p-6 rounded-l-2xl flex flex-col">
      <h2 className="text-xl font-bold mb-4">Select a jobrole from {fieldName}</h2>

      {/* Scrollable Job Roles Container */}
      <div className="flex-1 overflow-y-auto pr-2 
        [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
        [&::-webkit-scrollbar-thumb]:bg-[#00FF88] 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70]">
        <div className="grid grid-cols-1 gap-3">
          {jobRoles.length > 0 ? (
            jobRoles.map((role, index) => (
              <button
                key={index}
                onClick={() => handleFieldClick(role)}
                className={`bg-[#00FF88] text-[#34415C] font-bold py-2 px-4 rounded-lg transition ${selectedJobRole === role ? 'bg-[#34415C]  text-white' : ''}`}
              >
                {role}
              </button>
            ))
          ) : (
            <p className="text-gray-300">No job roles found for this field.</p>
          )}
        </div>
      </div>
    </div>
  </div>
  {/* ✅ Popup Modal */}
  {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">No Job Role Selected!</h2>
            <p className="mb-4 text-gray-700">Please select a job role before proceeding.</p>
            <button
              onClick={handlePopupClose}
              className="bg-[#00FF88] text-white px-4 py-2 rounded-md hover:bg-[#00cc70] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>


  );
};

export default FieldPage;
