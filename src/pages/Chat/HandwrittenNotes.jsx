import React, { useEffect, useState } from "react";
import axios from "axios";

function HandwrittenNotes() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadedPdfUrl, setUploadedPdfUrl] = useState(null);
  const [receivedPdfUrl, setReceivedPdfUrl] = useState(null);

  useEffect(() => {
    document.title = "Handwritten Notes Converter - LLM";
  }, []);

  const handleFileChange = (event) => {
    // Handle file selection
    const file = event.target.files[0];
    setSelectedFile(file);

    // Display the selected PDF
    const fileUrl = URL.createObjectURL(file);
    setUploadedPdfUrl(fileUrl);
  };

  const handleFileSubmit = async () => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Make a POST request to your backend endpoint for conversion
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}pdf_analyzer/generate_notes/`,
        formData,
        {
          responseType: "blob", // Specify responseType as arraybuffer to receive binary data
        }
      );

      console.log(response);
      // Create a Blob from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Set the received PDF URL to display in the component
      setReceivedPdfUrl(url);

      // Create a temporary <a> element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", "converted_notes.pdf");

      // Append the <a> element to the body and click it to trigger the download
      document.body.appendChild(tempLink);
      tempLink.click();

      // Clean up the temporary elements and URL
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error converting notes:", error);
      // Handle errors as needed
    }
  };

  return (
    <div className="container mx-auto text-gray-50">
      <h1 className="text-3xl font-bold mb-4">Handwritten Notes Converter</h1>

      {/* File input for selecting handwritten notes PDF */}
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      {/* Button to submit the file for conversion */}
      <button
        onClick={handleFileSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4"
      >
        Convert Notes
      </button>

      {/* Render uploaded PDF */}
      {uploadedPdfUrl && (
        <div>
          <h2 className="text-xl font-bold mt-4">Uploaded PDF:</h2>
          <embed
            src={uploadedPdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </div>
      )}

      
    </div>
  );
}

export default HandwrittenNotes;
