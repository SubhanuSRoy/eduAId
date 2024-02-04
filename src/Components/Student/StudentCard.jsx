import React from "react";
import { useDispatch } from "react-redux";
import { studentActions } from "../../features/student/student-slice";
import { Link, useNavigate } from "react-router-dom";

function StudentCard({ student }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleAddClass = () => {
    // Add logic to navigate to the "Add Class" component for this student
    // You may want to pass the student ID or other details as route params
    // For example: history.push(`/add-class/${student.id}`);
    console.log("Adding class for student:", student.name);
  };

  const handleViewStudent = () => {
    // Dispatch an action to store the currently viewed student in Redux
    dispatch(studentActions.addStudent(student));

    nav(`/students/view/${student._id}`); // Navigate to the student details page (or use Link component from react-router-dom
    console.log("Viewing student:", student.name);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md text-boxdark">
      <h2 className="text-xl font-bold mb-2">{student.name}</h2>
      <p className="text-gray-600 mb-2">Enrolled in: {student.course}</p>
      {/* You can display more details here as needed */}

      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/students/add-insights/${student._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Class
        </Link>
        <button
          onClick={handleViewStudent}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Student
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
