import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../../features/student/student-slice";
import Markdown from "react-markdown";

function AddClassInsights() {
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  const [classInsights, setClassInsights] = useState({
    summary:
      "**Summary of Python Classroom Session:**\n\n- Introduction to Python programming language and its versatility in fields like web development, data science, and AI.\n- Course structure combining theory with practical exercises, emphasizing hands-on learning through real-world projects.\n- Encouragement of an open mindset, willingness to explore, and the availability of support during the learning journey.\n\n**Summary of Class Meeting for Programming Instructor Chethan:**\n\n- Topics covered included Python's readability, variables, data types, control structures, and loops.\n- Students displayed enthusiasm and understanding of the concepts, but could benefit from more hands-on exercises and exploration of Python code.\n- The focus on readability and philosophy of Python resonated well with students, providing a strong foundation for further learning.\n\n**Summary for Chethan:**\n\n- Reviewed conditional statements and introduced the concept of functions, emphasizing their role in code organization and modularity.\n- Addressed the student's interest in web development and mentioned potential frameworks like Django and Flask.\n- Encouraged continued curiosity and collaborative learning throughout the Python journey.",
    objective:
      "**Primary Objectives Discussed:**\n\n- **Python Fundamentals:**\n  - Develop a strong foundation in Python programming, covering variables, data types, operators, and control structures.\n  - Gain proficiency in writing simple Python programs.\n\n- **Problem-Solving Techniques:**\n  - Emphasize the importance of algorithmic thinking and problem-solving strategies.\n  - Encourage students to break down complex problems into smaller, manageable steps.\n\n- **Data Structures and Algorithms:**\n  - Introduce fundamental data structures (e.g., lists, tuples, dictionaries) and their applications.\n  - Explore popular algorithms (e.g., sorting and searching) and their efficiency.\n\n- **Hands-On Exercises:**\n  - Provide ample opportunities for students to practice and apply their skills through hands-on exercises and assignments.\n  - Foster a learning-by-doing approach.\n\n- **Real-World Projects:**\n  - Engage students in real-world programming projects to showcase their abilities and solve practical problems.\n  - Build a portfolio of projects to demonstrate their proficiency and creativity.",
    concepts_taught:
      "**Core Concepts Covered in the Python Class:**\n\n- **Python's Readability:** Python is designed to be easy to read and understand, making collaboration and code maintainability easier.\n\n\n- **Variables in Python:** Variables store data and are identified by names. Their values can be assigned and modified.\n\n\n- **Data Types in Python:** Python has various data types like integers, floats, strings, and more, which determine the kind of data a variable can hold.\n\n\n- **Control Structures:** Control structures like loops and conditional statements help control the flow of a program.\n   - Loops allow repetitive tasks to be executed multiple times.\n   - Conditional statements allow the program to make decisions based on conditions.\n\n\n- **Functions:** Functions are defined using the \"def\" keyword, take parameters, perform tasks, and return values (if needed).\n\n\n- **Modularity:** Breaking down a program into smaller, reusable functions enhances organization and maintainability.\n\n\n- **Web Development with Frameworks:** Explored popular frameworks like Django and Flask for web development, relevant to students' interests.\n\n\n- **Encouraged Asking Questions:** Fostered an environment where students can seek clarification and additional knowledge.",
    student_understanding_level:
      "**Students demonstrated a positive grasp of Python basics, expressing enthusiasm and curiosity while acknowledging the need for practice to enhance proficiency.**",
    gaps_identified:
      "- Lack of Explanation on Python's Strengths: Provide concrete examples of Python's strengths in various fields like web development, data science, and artificial intelligence.\n\n- Absence of Specific Project Details: Provide examples or scenarios to offer a clearer picture of the hands-on projects students can expect to work on during the course.\n\n- Insufficient Highlighting of Job Market Opportunities: Delve deeper into potential career paths or specific roles that require Python skills to motivate students.\n\n- Unclear Structured Class Format: Provide a clear schedule, timing, and mode of delivery for classes to help students plan their learning.\n\n<br>\n\nGaps and Areas of Misunderstanding:\n\n- Readability and User-friendliness: Provide more concrete examples and demonstrate how clarity benefits coding scenarios.\n\n- Data Types: Provide more examples and emphasize their significance in Python programming.\n\n- Control Structures: Expand on the concept of decision-making, conditions, and iteration to enhance understanding.\n\n<br>\n\nTopics Requiring Additional Clarification or Support:\n\n- Code Readability: Provide practical examples showcasing how Python's focus on readability aids in collaborative coding projects.\n\n- Data Type Applications: Highlight real-life scenarios where choosing the right data type is crucial.\n\n- Control Structure Usage: Illustrate the practical applications of control structures through real-world examples.",
    teacher_imporvement_suggestions:
      "- Provide more context about the relevance of Python in various fields.\n\n\n- Encourage collaboration among students during practical exercises and projects.\n\n\n- Offer additional online resources, tutorials, and books for further learning.\n\n\n- Hold interactive discussions during class to stimulate thought and engagement.\n\n\n- Introduce a variety of teaching methods, including presentations, discussions, activities, and exercises.",
  });
  const student = useSelector((state) => state.student.currentStudent);


  useEffect(() => {
    document.title =  "Add Class Insights";
  }, [])

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `student/get_student/${student._id}`
      );
      const studentData = response.data;
      dispatch(studentActions.addStudent(studentData));
      console.log("Student data fetched successfully:", studentData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const studentId = student._id;
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}classes/get_classes/${studentId}`
      );
      const fetchedClasses = res.data;

      // Iterate through fetchedClasses and update classInsights state
      const updatedClassInsights = {};
      fetchedClasses.forEach((classItem) => {
        if (
          classItem.class_insights &&
          Object.keys(classItem.class_insights).length > 0
        ) {
          updatedClassInsights[classItem._id] = classItem.class_insights;
        }
      });

      // Update state only if there are any class insights
      if (Object.keys(updatedClassInsights).length > 0) {
        setClassInsights((prevClassInsights) => ({
          ...prevClassInsights,
          ...updatedClassInsights,
        }));
      }

      setClasses(fetchedClasses);
      console.log("Classes fetched successfully:", fetchedClasses);
    } catch (error) {
      console.error("Error fetching Classes:", error);
    }
  };

  const getClassInsights = async (classId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}classes/get_class_insights/${classId}`
      );
      const classInsight = response.data.class_insight;
      // Update classInsights state with the fetched data
      setClassInsights((prevClassInsights) => ({
        ...prevClassInsights,
        [classId]: classInsight,
      }));
      console.log(
        `Class insights for class ${classId} fetched successfully:`,
        classInsight
      );
    } catch (error) {
      console.error(
        `Error fetching class insights for class ${classId}:`,
        error
      );
    }
  };

  const handleUploadFile = async (classId, file) => {
    try {
      const formData = new FormData();
      formData.append("transcript", file);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}llm/generate_class_insights/${student._id}`,
        formData
      );

      // Assuming the response contains updated class insights
      const updatedClassInsight = response.data.class_insight;
      // Update classInsights state with the new insights
      setClassInsights((prevClassInsights) => ({
        ...prevClassInsights,
        [classId]: updatedClassInsight,
      }));
      console.log(
        `Class insights for class ${classId} updated successfully:`,
        updatedClassInsight
      );
    } catch (error) {
      console.error(`Error uploading file for class ${classId}:`, error);
    }
  };

  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      fetchStudentData();
      fetchClasses();
    }

    return () => (effectRan.current = true);
  }, []);

  return (
    <div className="container mx-auto text-gray-50">
      {student && (
        <div>
          <div className="flex flex-row">
            <div className="flex-shrink-0">
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
              <button>
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>

          {/* Display classes */}
          <div className="my-4">
            <div className="text-3xl font-bold border-b-2 pb-1 mb-4">
              Classes
            </div>
            {classes.map((classItem) => (
              <div
                key={classItem._id}
                className="mb-4 p-4 bg-gradient-to-r from-prim to-secondary rounded-md text-black"
              >
                <div className="text-xl font-semibold ">
                  Class Topic:{" "}
                  <span className="font-normal text-gray-50">
                    {classItem.class_topic}
                  </span>
                </div>
                <div className="text-lg font-semibold">
                  Class Number:{" "}
                  <span className="font-normal text-gray-50">
                    {classItem.class_number}
                  </span>
                </div>
                <div className="text-lg font-semibold">
                  Updated At:{" "}
                  <span className="font-normal text-gray-50">
                    {classItem.updated_at}
                  </span>
                </div>
                
                {!classInsights[classItem._id] ? (
                  <div className="mt-2">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleUploadFile(classItem._id, e.target.files[0])
                      }
                    />
                    <button
                      onClick={() => getClassInsights(classItem._id)}
                      className="bg-primary px-3 py-2 rounded-md text-gray-50 hover:bg-primHover"
                    >
                      Upload Transcript
                    </button>
                  </div>
                ) : null}
                {classInsights[classItem._id] && (
                  <details className="mt-2">
                    <summary className="text-2xl mb-4 font-semibold text-white">
                      Class Insights
                    </summary>
                    <div className="flex flex-col gap-4">
                      <div className="bg-white rounded-md p-4">
                        <div className="text-lg font-semibold">Summary:</div>
                        <Markdown className="text-sm text-gray-700">
                          {classInsights[classItem._id].summary}
                        </Markdown>
                      </div>
                      <div className="bg-white rounded-md p-4">
                        <div className="text-lg font-semibold mt-4">
                          Objective:
                        </div>
                        <Markdown className="text-sm text-gray-700">
                          {classInsights[classItem._id].objective}
                        </Markdown>
                      </div>

                      <div className="bg-white rounded-md p-4">
                        <div className="text-lg font-semibold mt-4">
                          Concepts Taught:
                        </div>
                        <Markdown className="text-sm text-gray-700">
                          {classInsights[classItem._id].concepts_taught}
                        </Markdown>
                      </div>

                      <div className="bg-white rounded-md p-4">
                        <div className="text-lg font-semibold mt-4">
                          Student Understanding Level:
                        </div>
                        <Markdown className="text-sm text-gray-700">
                          {
                            classInsights[classItem._id]
                              .student_understanding_level
                          }
                        </Markdown>
                      </div>

                      <div className="bg-white rounded-md p-4">
                        <div className="text-lg font-semibold mt-4">
                          Gaps Identified:
                        </div>
                        <Markdown className="text-sm text-gray-700">
                          {classInsights[classItem._id].gaps_identified}
                        </Markdown>
                      </div>

                      <div className="bg-white rounded-md p-4">
                        <div className="text-lg font-semibold mt-4">
                          Teacher Improvement Suggestions:
                        </div>
                        <Markdown className="text-sm text-gray-700">
                          {
                            classInsights[classItem._id]
                              .teacher_imporvement_suggestions
                          }
                        </Markdown>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddClassInsights;
