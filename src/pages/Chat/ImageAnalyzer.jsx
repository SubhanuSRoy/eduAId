import React, { useEffect, useState } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Added state for image preview


  useEffect(() => {
    document.title =  "Image Analyzer - LLM";
  }, [])
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Create a temporary URL for the selected image
    setImagePreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    responseText && setResponseText("");
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("text", prompt);

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "llm/analyze_image_notes/", // Replace with your backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setResponseText(response.data.response || "No response text");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setResponseText("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-full p-6 bg-white rounded-md shadow-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-wrap sm:flex-nowrap items-center w-full gap-4"
      >
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Select an image:
          </label>
          <input
            type="file"
            id="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>
        <input
          type="text"
          id="prompt"
          placeholder="Enter a question about the image"
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full mt-1 border-2 border-gray-500 text-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>

      {imagePreview && (
        <img
          className="mx-auto my-4"
          src={imagePreview}
          alt="Selected for analysis"
          style={{ maxWidth: '100%', maxHeight: '400px' }} // Set max width and height for the preview
        />
      )}

      {!responseText && !imagePreview && (
        <img
          className="mx-auto my-4"
          src="https://i.gifer.com/XlO9.gif"
          alt="ready to answer questions"
        />
      )}
      {responseText && (
        <div className="mt-8">
          <TypeAnimation speed={75} sequence={[responseText]} className="text-lg"/>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
