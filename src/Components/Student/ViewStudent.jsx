import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../../features/student/student-slice";
import Markdown from "react-markdown";

function ViewStudent() {
  const dispatch = useDispatch();
  const [transcriptFile, setTranscriptFile] = useState(null);

  const [temporaryClassTopics, setTemporaryClassTopics] = useState({});

  const [studyPlan, setStudyPlan] = useState([
    {
      class_no: "Class 1",
      topic: "Introduction to Python",
    },
    {
      class_no: "Class 2",
      topic: "Python Basics",
    },
    {
      class_no: "Class 3",
      topic: "Control Structures",
    },
    {
      class_no: "Class 4",
      topic: "Functions",
    },
    {
      class_no: "Class 5",
      topic: "Modules and Packages",
    },
    {
      class_no: "Class 6",
      topic: "Object-Oriented Programming",
    },
    {
      class_no: "Class 7",
      topic: "File Handling",
    },
    {
      class_no: "Class 8",
      topic: "Data Structures",
    },
    {
      class_no: "Class 9",
      topic: "Exception Handling",
    },
    {
      class_no: "Class 10",
      topic: "Python Projects",
    },
    {
      class_no: "Class 11",
      topic: "Review and Q&A",
    },
    {
      class_no: "Class 12",
      topic: "Final Project Presentation",
    },
  ]);

  const [classes, setClasses] = useState([]);
  const student = useSelector((state) => state.student.currentStudent);

  useEffect(() => {
    document.title = "View Student " + student.name;
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `student/get_student/${student._id}`
      );
      const studentData = response.data; // Assuming the response contains student details
      // Update the student data in the Redux store
      dispatch(studentActions.addStudent(studentData));
      setStudyPlan(response.data.study_plan);
      console.log("Student data fetched successfully:", studentData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };



  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      fetchStudentData();
 
    }

    return () => (effectRan.current = true);
  }, []);

  const handleFileChange = (e) => {
    setTranscriptFile(e.target.files[0]);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("transcript", transcriptFile);

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL +
          `llm/generate_study_plan_json/${student._id}`,
        formData
      );
      console.log(
        "Transcript file submitted successfully:",
        student._id,
        formData,
        response.data
      );
      const updatedStudyPlan = response.data.study_plan; // Update with the actual field in the response
      setStudyPlan(updatedStudyPlan);
    } catch (error) {
      console.error("Error submitting transcript file:", error);
    }
  };

  const handleClassTopicChange = (classNo, newTopic) => {
    setTemporaryClassTopics((prevTopics) => ({
      ...prevTopics,
      [classNo]: newTopic,
    }));
  };

  const handleAddClass = async (classNo) => {
    const newTopic = temporaryClassTopics[classNo];
    try {
      const studentId = student._id;
      console.log("Adding class for student:", studentId, newTopic);
      // Make a POST request to your backend endpoint to add the class
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "classes/add_class/",
        {
          student_id: studentId,
          class_topic: newTopic,
          class_number: classNo,
        }
      );
      alert("Class added with topic: " + res.data.class_topic);
    } catch (error) {
      console.error("Error adding class:", error);
      // Handle errors as needed
    }
  };

  const handleGenerateStudyPlan = () => {
    // Implement logic for generating study plan
  };

  return (
    <div className="container mx-auto text-gray-50">
      {student && (
        <div>
          <div className="flex flex-row">
            <div className="flex-shrink-0">
              {/* Display student details */}
              <div className="my-4">
                <div className="text-3xl font-bold border-b-2 pb-1 mb-4">
                  Student Details
                </div>
                <div className="text-lg font-semibold">
                  Name: <span className="font-normal">{student.name}</span>
                </div>
                <div className="text-lg font-semibold">
                  Email: <span className="font-normal">{student.email}</span>
                </div>
                <div className="text-lg font-semibold">
                  Grade: <span className="font-normal">{student.grade}</span>
                </div>
                <div className="text-lg font-semibold">
                  Course: <span className="font-normal">{student.course}</span>
                </div>
              </div>
            </div>
            <div className="ml-4">
              {/* Icon for edit plan */}
              <button>
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>

          {/* File upload section */}
          <div className="text-lg">
            Upload transcript of demo class to generate study plan
          </div>
          <form
            onSubmit={handleFileSubmit}
            className="flex justify-between mt-4 w-full bg-gray-100 text-boxdark p-4 rounded-md"
          >
            <input
              type="file"
              onChange={handleFileChange}
              placeholder="Upload the txt file of the transcript"
            />
            <button
              type="submit"
              className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Upload and generate study plan
            </button>
          </form>

          {/* Buttons for actions */}
          <div className="mt-4 flex w-full justify-between items-center">
            <Link
              to={`/students/add-insights/${student._id}`}
              className="bg-green-500 text-white py-2 px-4 rounded font-semibold text-lg"
            >
              Get Class Insights
            </Link>
          </div>

          {/* Display study plan after checking if its an object */}
          
          {studyPlan && (
            <details className="mt-4 ">
              <summary className=" text-3xl font-bold pb-1">
                Study Plan{" "}
                {/* <div className="inline-flex bg-white rounded-md  p-2 ml-4">
                  <svg
                    className="h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 168 168"
                    id="artificial-intelligence"
                  >
                    <circle cx="2" cy="149.5" r="2" fill="#2d4356"></circle>
                    <path
                      fill="#2d4356"
                      d="M11 147.5H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"
                    ></path>
                    <path
                      fill="#0bceb2"
                      d="M118.154 155.5h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm-60 0h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm45.846 0H64a2 2 0 0 0 0 4h15.94v2H72a2 2 0 0 0 0 4h25a2 2 0 0 0 0-4h-8.94v-2H104a2 2 0 0 0 0-4z"
                    ></path>
                    <path
                      fill="#2d4356"
                      d="M59 51.79V46.5a1.996 1.996 0 0 0-1.01-1.74l-14-8A2.004 2.004 0 0 0 41 38.5v21.47l-8-6.43V37.21a7 7 0 1 0-4 0V54.5a2.007 2.007 0 0 0 .75 1.56l11 8.83a1.377 1.377 0 0 0 .25.17V86.5a1.988 1.988 0 0 0 .48 1.3L47 94.24v16.55a7 7 0 1 0 4 0V93.5a1.988 1.988 0 0 0-.48-1.3L45 85.76V41.95l10 5.71v4.13a7 7 0 1 0 4 0ZM28 30.5a3 3 0 1 1 3 3 2.996 2.996 0 0 1-3-3Zm24 87a3 3 0 1 1-3-3 2.996 2.996 0 0 1 3 3Zm5-56a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3Z"
                    ></path>
                    <path
                      fill="#0bceb2"
                      d="M77.41 53.09 70 45.67V30.5a2 2 0 0 0-4 0v16a1.966 1.966 0 0 0 .59 1.41L74 55.33v29.34l-15 15V85.21a7 7 0 1 0-4 0v19.29a2.01 2.01 0 0 0 1.23 1.85 2.068 2.068 0 0 0 .77.15 1.959 1.959 0 0 0 1.41-.59l19-19A1.966 1.966 0 0 0 78 85.5v-31a1.966 1.966 0 0 0-.59-1.41zM57 81.5a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3zM32 96.79V83.21a7 7 0 1 0-4 0v13.58a7 7 0 1 0 4 0zM27 76.5a3 3 0 1 1 3 3 2.996 2.996 0 0 1-3-3zm3 30a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3z"
                    ></path>
                    <path
                      fill="#2d4356"
                      d="M160 147.5h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"
                    ></path>
                    <circle cx="166" cy="149.5" r="2" fill="#2d4356"></circle>
                    <path
                      fill="#2d4356"
                      d="M150.72 147.5h-22.26a10.611 10.611 0 0 0 2.22-6.49v-4.17l3.31-2.62a1.995 1.995 0 0 0 .39-2.73l-2.51-3.51 3.99-1.39a2 2 0 0 0 1.24-2.53l-2.12-6.29h5.81a4.205 4.205 0 0 0 3.45-1.82 4.336 4.336 0 0 0 .48-3.98l-8.52-22.66 2.43-5.31a1.968 1.968 0 0 0 .18-.83V72.09c-.63-15.12-6.8-27.84-17.85-36.79A54.87 54.87 0 0 0 84.4 23.54a1.754 1.754 0 0 0-.4-.04h-8a2.006 2.006 0 0 0-2 2v16a1.966 1.966 0 0 0 .59 1.41l8 8a1.966 1.966 0 0 0 1.41.59h12a1.966 1.966 0 0 0 1.41-.59l3.26-3.25a6.993 6.993 0 1 0-2.83-2.83l-2.67 2.67H84.83L78 40.67V27.5h5.81a1.872 1.872 0 0 0 .58.04c17.8-.67 36.14 7.39 45 23.96h-6.68a7.001 7.001 0 1 0-8.71 8.71V78.5H99a2.006 2.006 0 0 0-2 2v11H81a1.966 1.966 0 0 0-1.41.59l-16 16a1.966 1.966 0 0 0-.59 1.41v16.29a7 7 0 1 0 4 0v-15.46L81.83 95.5H118a2 2 0 0 0 1.79-1.11l6-12a1.944 1.944 0 0 0 .21-.89v-7h8.81v8.24l-2.59 5.66a2.054 2.054 0 0 0-.06 1.54l8.82 23.45a.305.305 0 0 1-.03.29.194.194 0 0 1-.16.09h-8.59a1.996 1.996 0 0 0-1.63.84 2.022 2.022 0 0 0-.27 1.8l2.38 7.05-4.65 1.62a1.97 1.97 0 0 0-1.25 1.28 1.994 1.994 0 0 0 .28 1.77l2.96 4.14-2.58 2.03a2.005 2.005 0 0 0-.76 1.57v5.14a6.538 6.538 0 0 1-3.16 5.63 6.123 6.123 0 0 1-3.11.86c-8.36 0-40.41-10.52-40.41-28v-4.17a2 2 0 0 0-4 0v4.17c0 13.8 15.03 23.13 27.94 28H17.28a2.017 2.017 0 1 0 0 4h133.44a2.017 2.017 0 1 0 0-4ZM104 38.5a3 3 0 1 1-3 3 2.996 2.996 0 0 1 3-3Zm-36 94a3 3 0 1 1-3-3 2.996 2.996 0 0 1 3 3Zm45-79a3 3 0 1 1 3 3 2.996 2.996 0 0 1-3-3Zm11 17a2.006 2.006 0 0 0-2 2v8.53l-5.24 10.47H101v-9h15a2 2 0 0 0 2-2V60.21a7.077 7.077 0 0 0 4.71-4.71h8.56a48.373 48.373 0 0 1 3.43 15Z"
                    ></path>
                    <path
                      fill="#0bceb2"
                      d="M103 58.5a7.059 7.059 0 0 0-3.33.84l-3.26-3.25A1.966 1.966 0 0 0 95 55.5H84a2.006 2.006 0 0 0-2 2v16a2.022 2.022 0 0 0 .7 1.52l6.3 5.4V91.5h4v-12a1.988 1.988 0 0 0-.7-1.52l-6.3-5.4V59.5h8.17l2.67 2.67A7.002 7.002 0 1 0 103 58.5Zm0 10a3 3 0 1 1 3-3 2.996 2.996 0 0 1-3 3Z"
                    ></path>
                    <path
                      fill="#2d4356"
                      d="M54 30.5a3 3 0 1 0-3-3 3.003 3.003 0 0 0 3 3zm0-4.5a1.5 1.5 0 1 1-1.5 1.5A1.501 1.501 0 0 1 54 26zm94.856 18.5a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-16.156-24a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm17.156-24a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-138.16 43a2 2 0 1 0-2 2 2.002 2.002 0 0 0 2-2zm-3 0a1 1 0 1 1 1 1 1.001 1.001 0 0 1-1-1z"
                    ></path>
                    <path
                      fill="#0bceb2"
                      d="M8.111 11.765 9.597 9.81l-.939-.532-.954 2.19h-.032l-.969-2.175-.956.548 1.472 1.909v.031l-2.301-.297v1.064l2.316-.297v.031L5.747 14.19l.892.564 1.018-2.206h.031l.939 2.19.986-.563-1.502-1.878v-.031l2.362.282v-1.064l-2.362.313v-.032zM38.334 6.23l-.856 1.099.513.325.586-1.271h.018l.541 1.261.568-.324-.865-1.081v-.018l1.36.162V5.77l-1.36.18v-.018l.856-1.126-.541-.306-.55 1.261h-.018l-.558-1.252-.55.315.847 1.1v.018L37 5.77v.613l1.334-.171v.018zM163.029 29.021v-1.043l-2.317.307v-.031l1.458-1.918-.921-.522-.936 2.148h-.031l-.951-2.133-.937.538 1.443 1.872v.031l-2.256-.292v1.043l2.271-.291v.031l-1.458 1.872.875.553.998-2.165h.03l.921 2.149.967-.552-1.473-1.842v-.031l2.317.276zM80.701 13.288l1.258-1.655-.794-.45-.808 1.853h-.027l-.82-1.84-.808.464 1.245 1.615v.026L78 13.05v.9l1.96-.251v.026l-1.258 1.615.754.477.861-1.867h.026l.795 1.853.834-.476-1.271-1.589v-.026l1.999.238v-.9l-1.999.264v-.026z"
                    ></path>
                  </svg>
                </div> */}
              </summary>
              {/* <Markdown className="text-sm text-gray-300 pt-2 mt-4">
                {studyPlan}
              </Markdown> */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {studyPlan.map((classInfo, index) => (
                  <div
                    key={index}
                    className="border p-4 flex flex-col items-center"
                  >
                    <div className="font-bold mb-2">{classInfo.class_no}</div>
                    <input
                      className="mb-2 text-boxdark px-2 py-1 rounded-sm"
                      value={
                        temporaryClassTopics[classInfo.class_no] ||
                        classInfo.topic
                      }
                      onChange={(e) =>
                        handleClassTopicChange(
                          classInfo.class_no,
                          e.target.value
                        )
                      }
                    />
                    <button
                      onClick={() => handleAddClass(classInfo.class_no)} // Adjust the function accordingly
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Class
                    </button>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Display classes */}
        </div>
      )}
    </div>
  );
}

export default ViewStudent;
