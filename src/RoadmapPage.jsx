import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BouncingBall from "./BouncingBall";

const SkillQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { jobRole } = location.state || { jobRole: "" };
  const apiKey = "AIzaSyDUOZunebNGQMazQoQCPycKHeHhdYDQEc0"; // Replace with actual API key
  const [showPopup, setShowPopup] = useState(false);

  const handleFinishTestClick = () => {
    setShowPopup(true);
  };
  const processedResults = questions.map((q) => ({
    skill: q.skill,
    questionId: q.id,
    isCorrect: answers[q.id] === q.answer, // Check if selected answer is correct
  }));
  const handleConfirmFinish = () => {
    navigate("/result", { state: { results: processedResults } });

  };
  
  const handleCancelFinish = () => {
    setShowPopup(false);
  };
  
  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        const data = await response.json();
        const filteredSkills = data
          .filter((item) => item.jobrole === jobRole)
          .flatMap((item) => item.skills);
        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchJobRoleSkills();
  }, [jobRole]);

  useEffect(() => {
    if (skills.length === 0) return;

    const fetchQuestions = async () => {
      try {
        const prompt = `Generate 30-40 multiple-choice questions covering ${jobRole} skills: ${JSON.stringify(skills)}.
        Each question should include:
        - Skill name
        - Question ID
        - Four answer options
        - Correct answer
        Return JSON format:
        {
          "questions": [
            { "skill": "Skill1", "id": 1, "question": "Sample?", "options": ["A", "B", "C", "D"], "answer": "random" }
          ]
        }`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Full API Response:", data);

        const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsedData = JSON.parse(jsonMatch[0]);
            setQuestions(parsedData.questions || []);
            console.log("Parsed Questions:", parsedData.questions);
          } else {
            console.error("JSON match failed.");
          }
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [skills]);

  const handleAnswerSelection = (questionId, selectedOption) => {
     // Prevent changing answer

    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleFinishTest = () => {
    navigate("/result", { state: { results: answers } });
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

      <div className="w-[100%] mt-10 p-6 bg-[#445982] rounded-lg shadow-lg overflow-y-auto [&::-webkit-scrollbar]:w-3 
        [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
        [&::-webkit-scrollbar-thumb]:bg-[#00FF88] 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70] h-[100%]">
        <h2 className="text-3xl font-bold text-center text-white m-6">Quiz</h2>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <h3 className="text-xl text-white font-semibold">{index + 1}. {q.question}</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {q.options.map((option, idx) => {
                  const isSelected = answers[q.id] === option;
                  const isCorrect = option === q.answer;
                  let buttonClass = "bg-[#00FF88] hover:bg-[#00cc70]";

                  if (isSelected) {
                    buttonClass = isCorrect ? "bg-[#004822]" : "bg-[#004822]";
                  }

                  return (
                    <button
                      key={idx}
                      className={`w-full p-3 rounded-md ${buttonClass} ${
                        answers[q.id] !== undefined ? "" : ""
                      }`}
                      onClick={() => handleAnswerSelection(q.id, option)}
                       // Disable after selection
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          
          <div className="ml-[52%] mt-[14%] scale-[150%]">
          <BouncingBall />
        </div>
        
        )}
        {questions.length > 0 && (
  <button className="bg-red-500 px-6 m-4 py-3 rounded-md hover:bg-red-700 w-full mt-4" onClick={handleFinishTestClick}>
    Finish Test
  </button>
)}
{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Quiz Completion</h2>
      <p className="mb-4">You have {questions.length - Object.keys(answers).length} questions remaining. Do you want to finish?</p>
      <div className="flex justify-center gap-4">
        <button onClick={handleConfirmFinish} className="bg-red-500 text-white px-4 py-2 rounded-md">Finish</button>
        <button onClick={handleCancelFinish} className="bg-gray-300 px-4 py-2 rounded-md">Back to Quiz</button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default SkillQuestions;
