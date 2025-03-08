import React, { useState } from "react";
import { Link } from "react-router-dom";

const jobRoles = [
  "AI/ML Engineer",
  "Cybersecurity Analyst",
  "Data Scientist",
  "Cloud Engineer",
  "DevOps Engineer",
  "Blockchain Developer",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer",
  "Software Engineer",
  "Network Engineer",
  "Cloud Architect",
];

const DashboardPage = () => {
  const [selectedRole, setSelectedRole] = useState(jobRoles[0]);
  const [progress, setProgress] = useState(80); // Initial progress value (can be dynamic)

  const strokeOffset = (1 - progress / 100) * 282.743; // Calculate the dash offset based on progress percentage


  return (
    <div className="min-h-screen bg-[#34415C] font-montserrat">
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
          </div>
        </div>
      </nav>

      {/* Main Dashboard Layout */}
      <div className="flex pt-[5%] flex-col w-full h-[calc(100vh-70px)]">
        {/* Top Section - Job Role Selection */}
        <div
          className="h-[20%] bg-[#223044] flex items-center justify-start space-x-4 p-4 overflow-x-auto 
          [&::-webkit-scrollbar]:h-2.5
          [&::-webkit-scrollbar-track]:bg-[#D9D9D9]
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#00FF88]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:transition-all
          [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70]
          dark:[&::-webkit-scrollbar-track]:bg-[#34415C]
          dark:[&::-webkit-scrollbar-thumb]:bg-[#445982]
          dark:[&::-webkit-scrollbar-thumb]:hover:bg-[#5b719f]"
        >
          {jobRoles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-6 py-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                selectedRole === role
                  ? "bg-[#00FF88] text-[#223044]"
                  : "bg-white text-[#34415C] hover:bg-[#00FF88] hover:text-[#223044]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Bottom Section - Dynamic Content */}
        <div className="h-[80%] flex">
          {/* Left Section (30%) */}
          <div className="w-[30%] flex flex-col">
           
           {/* Top Left - Progress Ring */}
           <div className="h-[50%] flex justify-center bg-[#445982] pt-1 p-5 text-white rounded-[35px] font-bold m-4 text-xl">
              <div>
                <h3 className="text-center">Progress</h3>
                <div className="relative flex justify-center items-center">
                  {/* Circular Progress Bar */}
                  <svg width="100" height="100" viewBox="0 0 100 100" className="transform rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#D9D9D9"
                      strokeWidth="5"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#00FF88"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="282.743" // Circumference of the circle (2 * pi * radius)
                      strokeDashoffset={strokeOffset} // Dynamic offset based on progress
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute text-xl font-semibold text-[#00FF88]">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Left - Recommendations */}
            <div
              className="h-[50%] bg-[#556A93] p-5 text-white rounded-[35px] m-4 overflow-y-auto 
              [&::-webkit-scrollbar]:w-2.5
              [&::-webkit-scrollbar-track]:bg-[#D9D9D9]
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-[#00FF88]
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:transition-all
              [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70]
              dark:[&::-webkit-scrollbar-track]:bg-[#34415C]
              dark:[&::-webkit-scrollbar-thumb]:bg-[#445982]
              dark:[&::-webkit-scrollbar-thumb]:hover:bg-[#5b719f]"
            >
              <h3 className="text-lg font-semibold flex  justify-center">
                Recommendations
              </h3>
              <ul className="mt-2 space-y-2">
                <li>- Complete Course XYZ</li>
                <li>- Read Research Paper ABC</li>
                <li>- Take Mock Test</li>
                <li>- Complete Course XYZ</li>
                <li>- Read Research Paper ABC</li>
                <li>- Take Mock Test</li>
                <li>- Complete Course XYZ</li>
                <li>- Read Research Paper ABC</li>
                <li>- Take Mock Test</li>
                <li>- Complete Course XYZ</li>
                <li>- Read Research Paper ABC</li>
                <li>- Take Mock Test</li>
                <li>- Complete Course XYZ</li>
                <li>- Read Research Paper ABC</li>
                <li>- Take Mock Test</li>
                <li>- Complete Course XYZ</li>
                <li>- Read Research Paper ABC</li>
                <li>- Take Mock Test</li>
              </ul>
            </div>
          </div>

          {/* Right Section (70%) */}
          <div className="w-[70%] flex flex-col">
            {/* Top Right - Skills to Focus On */}
            <div className="h-[50%] bg-[#445982] p-4 text-white m-4 rounded-[35px]">
              <h3 className="text-lg font-semibold flex  justify-center">
                Skills to Focus On
              </h3>
              <ul className="mt-2 space-y-2">
                <li>- Python & TensorFlow</li>
                <li>- Data Preprocessing</li>
                <li>- Cloud Deployment</li>
              </ul>
            </div>
            {/* Bottom Right - Progress Tracking Table */}
            <div
              className="h-[50%] bg-[#556A93] p-4 text-white rounded-[35px] m-4 overflow-y-auto 
  [&::-webkit-scrollbar]:w-2.5
  [&::-webkit-scrollbar-track]:bg-[#D9D9D9]
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#00FF88]
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:transition-all
  [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70]
  dark:[&::-webkit-scrollbar-track]:bg-[#34415C]
  dark:[&::-webkit-scrollbar-thumb]:bg-[#445982]
  dark:[&::-webkit-scrollbar-thumb]:hover:bg-[#5b719f]"
            >
              <h3 className="text-lg font-semibold flex justify-center">
                Your Progress
              </h3>
              <table className="w-full mt-2 border-collapse border border-white">
                <thead>
                  <tr>
                    <th className="border border-white px-4 py-2">✔</th>
                    <th className="border border-white px-4 py-2">Skill</th>
                    <th className="border border-white px-4 py-2">Progress</th>
                    <th className="border border-white px-4 py-2">Take Test</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-white px-4 py-2">
                      Neural Networks
                    </td>
                    <td className="border border-white px-4 py-2">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#00FF88] h-full rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </td>
                    <td className="border border-white px-4 py-2">
                      <button className="bg-[#00FF88] px-2 py-1 rounded">
                        Test
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-white px-4 py-2">
                      Data Analysis
                    </td>
                    <td className="border border-white px-4 py-2">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#00FF88] h-full rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </td>
                    <td className="border border-white px-4 py-2">
                      <button className="bg-[#00FF88] px-2 py-1 rounded">
                        Test
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-white px-4 py-2">
                      Data Analysis
                    </td>
                    <td className="border border-white px-4 py-2">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#00FF88] h-full rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </td>
                    <td className="border border-white px-4 py-2">
                      <button className="bg-[#00FF88] px-2 py-1 rounded">
                        Test
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-white px-4 py-2">
                      Data Analysis
                    </td>
                    <td className="border border-white px-4 py-2">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#00FF88] h-full rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </td>
                    <td className="border border-white px-4 py-2">
                      <button className="bg-[#00FF88] px-2 py-1 rounded">
                        Test
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-white px-4 py-2">
                      Data Analysis
                    </td>
                    <td className="border border-white px-4 py-2">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#00FF88] h-full rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </td>
                    <td className="border border-white px-4 py-2">
                      <button className="bg-[#00FF88] px-2 py-1 rounded">
                        Test
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
