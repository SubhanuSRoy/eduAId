import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StudentCard from "../../Components/Student/StudentCard";

function ViewAllStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacher = useSelector((state) => state.teacher.currentTeacher);

  useEffect(() => {
    document.title =  "View All Students";
  }, [])

  useEffect(() => {
    const fetchTopStudents = async () => {
      console.log("Fetching top students...");

      if (teacher) {
        console.log(teacher);
        try {
          // Make an API call to get the top 10 students
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL +
              `teacher/${teacher._id}/students/`
          );
          console.log(response);
          setStudents(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching top students:", error);
          setLoading(false);
        }
      }
    };

    fetchTopStudents();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex items-center space-x-4 mt-4 w-full">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 px-3 py-2 rounded-md w-64"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          <span role="img" aria-label="Search">
            🔍
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-white">
        {loading ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          // filter the students based on the search term, if search term is empty, show all students
          students
            .filter((student) =>
              student?.name.toLowerCase().includes(searchTerm)
            )
            .map((student) => (
              <StudentCard key={student._id} student={student} />
            ))
        )}
      </div>
    </div>
  );
}

export default ViewAllStudents;
