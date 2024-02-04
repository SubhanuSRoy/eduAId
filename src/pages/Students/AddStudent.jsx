import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../../features/student/student-slice";
import axios from "axios";

function AddStudent() {
  const dispatch = useDispatch();

  const teacher = useSelector((state) => state.teacher.currentTeacher);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
    course: "",
  });

  useEffect(() => {
    document.title =  "Add Student";
  }, [])

  // check if teacher exists then add the teacher ID to the form data

  useEffect(() => {
    if (teacher) {
      setFormData((prevData) => ({
        ...prevData,
        teacher_id: teacher._id,
      }));
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(teacher);

    try {
      // Make an API call to add a new student
      console.log("Adding student:", formData);
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "student/add_student/",
        formData
      );
      setLoading(false);
      const newStudent = response.data;
      dispatch(studentActions.addstudent(newStudent));
      setLoading(false);
      console.log("Student added successfully:", newStudent);

      // Clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        grade: "",
        course: "",
      });
    } catch (error) {
      setLoading(false);
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-4xl text-white mb-4 ml-4">Add a new student</div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-md p-4 grid grid-cols-2 gap-x-4"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-gray-700"
          >
            Grade
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            required
            value={formData.grade}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="10"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700"
          >
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            required
            value={formData.course}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="Mathematics"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2"
        >
          {loading ? "adding..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
