import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // Import rehype-raw
import BouncingBall from "./BouncingBall";
import { progress } from "framer-motion";

function App() {
  const [input, setInput] = useState(""); // To store user input
  const [response, setResponse] = useState(""); // To store API response
  const [loading, setLoading] = useState(false); // Loading state
  const [activeTab, setActiveTab] = useState("Theory"); // To track the active tab
  const [studyMaterial, setStudyMaterial] = useState("");
  const [askAiLoading, setAskAiLoading] = useState(false); // For Ask AI
  const [materialLoading, setMaterialLoading] = useState(false); // For Study Material
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isaskaiOpen, setIsAskAIOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // To store study material
  const [skills, setSkills] = useState([]); // State to store skills
  const handleTakeTestClick = (skill) => {
    navigate(`/roadmap/${skill.name}/${progress}`, {
      // Assuming skill.name contains the skill name
      state: { skillName: skill.name, progress: 0 }, // Using skill.name instead of skill.skills
    });
  };
// Function to calculate progress based on segmentation and level
const calculateProgress = (segmentation, level) => {
  const levelOrder = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];
  const segmentOrder = ["Invoice Level", "Beginner Level", "Intermediate Level", "Advanced Level", "Expert Level"];

  const levelIndex = levelOrder.indexOf(level);
  const segmentIndex = segmentOrder.indexOf(segmentation);

  if (levelIndex === -1 || segmentIndex === -1) return 0;  // Invalid level or segmentation

  // Logic based on level
  if (level === "Novice") {
    return 0;  // All skills at 0%
  } else if (level === "Beginner") {
    return segmentation === "Invoice Level" ? 90 : 0;  // Invoice Level at 90%, others 0%
  } else if (level === "Intermediate") {
    if (segmentation === "Invoice Level" || segmentation === "Beginner Level") {
      return 80;  // Invoice and Beginner Level at 80%
    } else {
      return 0;
    }
  } else if (level === "Advanced") {
    if (segmentIndex <= 2) {  // Invoice, Beginner, Intermediate at 80%
      return 80;
    } else {
      return 0;
    }
  } else if (level === "Expert") {
    return 80;  // All skills at 100%
  }

  return 0;  // Default to 0% if no match
};


  const { jobRole, level } = location.state || { jobRole: "", level: "" };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleTuteClick = (skill) => {
    setSelectedSkill(skill);
    setIsSidebarOpen(false); // Close the sidebar
    fetchStudyMaterial("Theory", skill); // Fetch material for selected skill
  };

  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json"); // Fetch from public folder
        const data = await response.json();
        const filteredSkills = data.filter((item) => item.jobrole === jobRole); // Replace jobRoleSkills with data
        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching job role skills:", error);
      }
    };

    if (jobRole) {
      fetchJobRoleSkills();
    }
  }, [jobRole]);

  const apiKey = "AIzaSyDUOZunebNGQMazQoQCPycKHeHhdYDQEc0"; // Replace with your Gemini API key
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAskAiLoading(true); // Fix: Ensure this is the loading state for Ask AI
    setResponse("");

    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const apiResponse =
        result.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";
      setResponse(apiResponse);
    } catch (error) {
      setResponse(
        "Error fetching response. Please check the input or API key."
      );
      console.error("API Error:", error);
    } finally {
      setAskAiLoading(false); // Fix: Ensure Ask AI loading state resets correctly
    }
  };

  useEffect(() => {
    fetchStudyMaterial("Theory");
  }, []); // Runs only once on component mount
  const parseStudyMaterial = (rawText) => {
    const titleMatch = rawText.match(/## (.+?)\n/);
    const definitionMatch = rawText.match(/\*\*Definition:\*\* (.+?)\*\*/);
    const corePrinciplesMatches = [...rawText.matchAll(/\* \*\*(.+?)\*\*/g)];
    const moduleMatches = [
      ...rawText.matchAll(
        /\*\*Module \d+: (.+?)\*\*([\s\S]*?)(?=\*\*Module|\*\*Project|\*\*Career|\n$)/g
      ),
    ];

    return {
      title: titleMatch ? titleMatch[1] : "No Title",
      definition: definitionMatch ? definitionMatch[1] : "No Definition",
      corePrinciples: corePrinciplesMatches.map((match) => match[1]),
      modules: moduleMatches.map((module) => ({
        title: module[1],
        details: module[2].trim(),
      })),
    };
  };

  const fetchStudyMaterial = async (tab, skill = selectedSkill) => {
    if (!skill) return; // Don't fetch if no skill is selected

    setMaterialLoading(true);
    setStudyMaterial("");
    setActiveTab(tab);

    const prompts = {
      Theory: `Instruction: Create a structured learning path for  "${skill}" in  "${jobRole}" at "${level}" level in ascending order of complexity. Include definitions, core principles, subtopics with explanations, real-world applications, industry insights, and mini-projects.`,

      PDF: `Instruction: Provide PDF resources for  "${skill}" in "${jobRole}" at "${level}" level. Include titles, descriptions, and direct links to downloadable PDFs covering beginner to advanced topics.`,

      Projects: `Instruction: List real-world projects for  "${skill}" in "${jobRole}" at "${level}" level. Include project titles, descriptions, tech stacks, GitHub repository links, and expected outcomes.`,

      Lecture: `Instruction: Provide high-quality lecture resources & YouTube playlists  "${skill}" in for "${jobRole}" at "${level}" level. Include lecture titles, brief descriptions, and direct links to the content.`,

      Questions: `Instruction: Create practice questions for "${jobRole}" at "${level}" level. Include multiple-choice questions, coding challenges, scenario-based problems, and answer keys where applicable.`,
    };

    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: prompts[tab] }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const apiResponse =
        result.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      setStudyMaterial(apiResponse);
    } catch (error) {
      setStudyMaterial("Error fetching content. Please try again.");
      console.error("API Error:", error);
    } finally {
      setMaterialLoading(false);
    }
  };

  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        const data = await response.json();
        const filteredSkills = data.filter((item) => item.jobrole === jobRole);
        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching job role skills:", error);
      }
    };

    if (jobRole) {
      fetchJobRoleSkills();
      fetchStudyMaterial("Theory");
    }
  }, [jobRole]);

  const handleTabClick = (tab) => {
    fetchStudyMaterial(tab);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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

      {/* Parent Container */}
      <div className="flex h-screen w-screen overflow-hidden relative">
        {/* Left Section (Sliding Sidebar) */}
        <div
          className={`fixed h-screen w-[50%] top-[70px] left-0 bg-[#34415C] p-4 space-y-4 transition-transform duration-300  rounded-[35px] z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        >
          {/* Close Button */}

          {/* Section 1- info */}
          <div className="bg-[#D9D9D9] rounded-[35px] p-3 pl-[5%] flex items-center justify-between">
            <h2 className="text-left text-xl font-bold text-[#34415C]">
              Select a skill to study , and track your progress
            </h2>

            <button
              onClick={() => setIsSidebarOpen(false)}
              type="button"
              className="w-[105px] bg-red-600 rounded-[20px] p-2 inline-flex items-center justify-center text-white  hover:text-gray-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
            >
              <span className="sr-only">Close menu</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Section 2- roadmap */}
          <div className="bg-[#D9D9D9] rounded-[35px] p-3 pl-[5%] flex items-center justify-between">
            <h2 className="text-left text-xl font-bold text-[#34415C]">
              Your Own Personalized Roadmap
            </h2>
            <button className="bg-[#00FF88]  text-[#34415C] px-4 py-2 rounded-full font-semibold hover:bg-[#00DD77]">
              Download
            </button>
          </div>

          {/* Section  - Skills Progress */}
          <div
            className="bg-[#D9D9D9] rounded-[35px] p-4 overflow-y-auto  [&::-webkit-scrollbar]:w-3 
        [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
        [&::-webkit-scrollbar-thumb]:bg-[#00FF88] 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70] h-[100%] max-h-[68%]"
          >
            <h2 className="text-center text-xl font-bold text-[#34415C] mb-2">
              Skills Progress
            </h2>
            <table className="w-full border-collapse ">
              <thead className="sticky top-[-16px]  h-[40px] bg-[#D9D9D9]">
                <tr>
                  <th>✔️</th>
                  <th>Skills</th>
                  <th>Progress</th>
                  <th>Take Test</th>
                  <th>TUTE</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, index) => (
                  <tr key={index}>
                    <td className="p-2 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">{skill.skills}</td>
                    <td className="p-2 w-[200px]">
                      <progress
                        value={calculateProgress(skill.segmentation, level)} // Dynamically set progress
                        max="100"
                        className="w-full"
                      ></progress>
                    </td>

                    <td className="p-2 text-center">
                      <button
                        className="bg-[#00FF88] text-[#34415C] px-4 py-1 rounded-lg hover:bg-blue-600"
                        onClick={() => handleTakeTestClick(skill)} // Updated Code
                      >
                        Take Test
                      </button>
                    </td>

                    <td className="p-2 text-center">
                      <button
                        className="bg-[#00FF88] text-[#34415C] px-4 py-1 rounded-lg hover:bg-blue-600"
                        onClick={() => handleTuteClick(skill.skills)}
                      >
                        TUTE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`fixed h-screen w-[50%] top-[70px] left-0 bg-[#34415C] p-4 space-y-4 transition-transform duration-300 z-50 ${
            isaskaiOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        >
          {/* Section 3 - Ask AI */}

          <div className="bg-[#D9D9D9] rounded-[35px] h-[90%] p-4 flex flex-col">
            <div
              className="overflow-y-auto  [&::-webkit-scrollbar]:w-3 
        [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
        [&::-webkit-scrollbar-thumb]:bg-[#00FF88] 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70] h-[100%] p-2 pt-8 flex-1 bg-[#D9D9D9]"
            >
              {askAiLoading ? (
                <div className="ml-[30%] mt-[25%] scale-[70%]">
                  <BouncingBall />
                </div>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {response}
                </ReactMarkdown>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full p-2 rounded-[42px]"
                placeholder="Ask AI..."
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=95149&format=png&color=000000"
                  alt="Send Icon"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
          {/* ask ai CLOSE button */}
          <button
            onClick={() => setIsAskAIOpen(false)}
            type="button"
            className="w-[55px] bg-red-600 rounded-[20px] p-2 inline-flex items-center justify-center text-white  hover:text-gray-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-1 right-8 bg-red-500 text-white px-4 py-2 rounded-full z-50 hover:bg-red-600 "
          >
            <span className="sr-only">Close menu</span>

            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Right Section (Fixed & Full Width) */}
        <div className="fixed top-[70px] left-0 w-full h-[92%] bg-[#34415C]">
          <div className="p-2  h-screen flex flex-row items-center justify-center">
            {/* Left Side - Horizontal Buttons */}
            <div className="flex flex-col items-center justify-between gap-14 mt-[-5%]">
              {[
                {
                  label: "Select a skill",
                  action: () => setIsSidebarOpen(true),
                },
                { label: "Ask AI", action: () => setIsAskAIOpen(true) },
                { label: "Theory", action: () => handleTabClick("Theory") },
                { label: "PDF", action: () => handleTabClick("PDF") },
                { label: "Lecture", action: () => handleTabClick("Lecture") },
                { label: "Projects", action: () => handleTabClick("Projects") },
                {
                  label: "Questions",
                  action: () => handleTabClick("Questions"),
                },
              ].map((button) => (
                <button
                  key={button.label}
                  onClick={button.action}
                  className={`p-2 w-[120px] text-center rounded-full ${
                    activeTab === button.label
                      ? "bg-blue-600 text-white"
                      : "bg-[#34415C] text-white hover:bg-blue-600"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>

            {/* Right Side - Content Section */}
            <div
              className="flex-1 p-10 ml-4 pt-5 rounded-[35px] bg-[#D9D9D9] overflow-y-auto  [&::-webkit-scrollbar]:w-3 
        [&::-webkit-scrollbar-thumb]:bg-[#009e52] 
        [&::-webkit-scrollbar-thumb]:rounded-full 
         h-[100%]"
            >
              {materialLoading ? (
                <div className="ml-[40%] mt-[15%]">
                  <BouncingBall />
                </div>
              ) : (
                <div className="prose max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {studyMaterial}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
