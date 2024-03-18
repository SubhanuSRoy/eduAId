import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherActions } from "../../features/teacher/teacher-slice";
import axios from "axios";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const teacher = useSelector((state) => state.teacher.currentTeacher);

  //convex
  const addNewTeacher = useMutation(api.teachers.teachers.addNewTeacher);
  const updateTeacher = useMutation(api.teachers.teachers.updateTeacher);
  const getTeacherByEmail = useQuery(api.teachers.teachers.getTeacherByEmail);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    subjects_taught: "",
    grade_levels: "",
    years_of_experience: 0,
    short_bio: "",
    teaching_methods: "",
    qualifications: "",
  });

  useEffect(() => {
    document.title = "Add Teacher Profile";
  }, []);

  const effectRan = useRef(false);

  // Use the teacher data from Redux to populate the initial form values

  useEffect(() => {
    if (!effectRan.current) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...teacher,
      }));
    }

    return () => (effectRan.current = true);
  }, []);

  useEffect(() => {
    const fetchTeacherData = async () => {
      console.log("Fetching teacher data...");
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "teacher/get_latest_teacher/"
        );
        console.log(response);
        const teacherData = response.data; // Assuming the response contains teacher details
        dispatch(teacherActions.addTeacher(teacherData));
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    // Fetch data only if teacher is not available in Redux store
    if (!teacher) {
      fetchTeacherData();
    }
  }, [dispatch, teacher]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Make an API call to update the teacher profile

      // console.log("Adding new teacher profile:", formData);
      const addedTeacher = await addNewTeacher(formData);
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "teacher/add_teacher/",
        formData
      );
      // console.log("Teacher added successfully:", await addNewTeacher(formData));
      dispatch(teacherActions.addTeacher(response.data));

      setLoading(false);
      alert("Teacher profile updated successfully");
    } catch (error) {
      console.error("Error updating teacher profile:", error);
      setLoading(false);
    }

    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container mx-auto">
      <div className="text-4xl text-white mb-4 ml-4">
        Add your teaching profile
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-md p-4 grid grid-cols-2 gap-x-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
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
            onChange={handleChange}
            value={formData.email}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="contact_number"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contact_number"
            name="contact_number"
            onChange={handleChange}
            value={formData.contact_number}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="123-456-7890"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="subjects_taught"
            className="block text-sm font-medium text-gray-700"
          >
            Subjects Taught
          </label>
          <input
            type="text"
            id="subjects_taught"
            name="subjects_taught"
            onChange={handleChange}
            value={formData.subjects_taught}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="Python, Computer Science"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="grade_levels"
            className="block text-sm font-medium text-gray-700"
          >
            Grade Levels
          </label>
          <input
            type="text"
            id="grade_levels"
            name="grade_levels"
            onChange={handleChange}
            value={formData.grade_levels}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="4-12"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="years_of_experience"
            className="block text-sm font-medium text-gray-700"
          >
            Years of Experience
          </label>
          <input
            type="number"
            id="years_of_experience"
            name="years_of_experience"
            onChange={handleChange}
            value={formData.years_of_experience}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="5 years"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="short_bio"
            className="block text-sm font-medium text-gray-700"
          >
            Short Bio
          </label>
          <input
            type="text"
            id="short_bio"
            name="short_bio"
            onChange={handleChange}
            value={formData.short_bio}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="Passionate Python teacher with a focus on practical learning."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="teaching_methods"
            className="block text-sm font-medium text-gray-700"
          >
            Teaching Methods
          </label>
          <input
            type="text"
            id="teaching_methods"
            name="teaching_methods"
            onChange={handleChange}
            value={formData.teaching_methods}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="Interactive coding sessions, project-based learning."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="qualifications"
            className="block text-sm font-medium text-gray-700"
          >
            Qualifications
          </label>
          <input
            type="text"
            id="qualifications"
            name="qualifications"
            onChange={handleChange}
            value={formData.qualifications}
            className="mt-1 px-3 py-2 border-2 block w-full"
            placeholder="Bachelor's in Computer Science, Teaching Certification"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2"
        >
          {loading ? "saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
