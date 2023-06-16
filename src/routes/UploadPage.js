import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import "../styling/UploadPage.css";

function UploadPage() {
  const paperStyle = { width: 600, margin: "20px auto" };

  const [resume, setResume] = useState(null);
  const [summary, setSummary] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [employeeID, setEmployeeID] = useState("");
  const [infosysEmail, setInfosysEmail] = useState("");

  const handleResumeUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setResume(uploadedFile);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhotoUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setPhoto(uploadedFile);
  };

  const handleEmployeeIDChange = (event) => {
    setEmployeeID(event.target.value);
  };

  const handleInfosysEmailChange = (event) => {
    setInfosysEmail(event.target.value);
  };

  const handleSummaryChange = (event) => {
    const { value, selectionStart } = event.target;
    const lines = value.split("\n");

    if (
      event.key === "Enter" &&
      selectionStart === value.length &&
      lines[lines.length - 1].trim() === ""
    ) {
      event.preventDefault();
      setSummary(value + "\n•");
    } else {
      setSummary(value);
    }
  };

  const validateForm = () => {
    // Validate first name
    if (!/^[A-Za-z]+$/.test(firstName)) {
      alert("First name must contain letters only");
      return false;
    }

    // Validate last name
    if (!/^[A-Za-z]+$/.test(lastName)) {
      alert("Last name must contain letters only");
      return false;
    }

    // Validate employee ID
    if (!/^\d{7}$/.test(employeeID)) {
      alert("Employee ID must have 7 digits");
      return false;
    }

    // Validate Infosys Email
    if (/^[a-zA-Z]+@[a-zA-Z0-9._%+-]+infosys\.com$/.test(infosysEmail)) {
      alert("Enter your Infosys email");
      return false;
    }

    // Validate summary
    if (!/^(?!\s*$).+/.test(summary)) {
      alert("You have to enter a short summary");
      return false;
    }

    // Validate photo upload
    if (!photo) {
      alert("Please upload a photo");
      return false;
    }

    // Validate resume and profile
    if (!resume || !/\.(pdf|doc|docx|ppt)$/i.test(resume.name)) {
      alert(
        "Please upload a PDF, DOC, DOCX, or PPT file for resume or profile"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("resume", resume);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("employeeID", employeeID);
    formData.append("infosysEmail", infosysEmail);
    formData.append("interest", summary);
  
    // Create a JSON object for the user data
    const userData = {
      firstName,
      lastName,
      employeeID,
      infosysEmail,
      interest: summary,
    };
    // Add the user data as a separate part in the form data
    formData.append("user", JSON.stringify(userData));
  
    try {
      const response = await axios.post(
        "http://localhost:8080/user/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Response:", response.data);
  
      alert("Upload complete!");
  
      setFirstName("");
      setLastName("");
      setEmployeeID("");
      setInfosysEmail("");
      setSummary("");
      setPhoto(null);
      setResume(null);
    } catch (error) {
      if (error.response) {
        console.error("Server Error: ", error.response.data);
      } else if (error.request) {
        console.error("Network Error: ", error.request);
      } else {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <Container>
      <Paper elevation={5} style={paperStyle}>
        <h2 className="upload-form-heading">Add new Associate</h2>
        <form onSubmit={handleSubmit} className="upload-container">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="upload-form"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="First name"
                onChange={handleFirstNameChange}
                className="flex-textfield"
              />

              <TextField
                required
                id="outlined-required"
                label="Last name"
                onChange={handleLastNameChange}
                className="flex-textfield"
              />

              <TextField
                required
                id="outlined-required"
                label="Employee ID"
                onChange={handleEmployeeIDChange}
                className="flex-textfield"
              />

              <TextField
                required
                id="outlined-required"
                label="Infosys Email"
                onChange={handleInfosysEmailChange}
                className="flex-textfield"
              />

              <TextField
                required
                id="outlined-multiline-static"
                label="Summary of Experience"
                multiline
                rows={6}
                value={summary}
                onChange={handleSummaryChange}
                className="summary-input"
              />

              <label htmlFor="fileInput">
                <Button variant="outlined" component="span">
                  Upload Photo
                </Button>
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
              />

              <label htmlFor="resumeInput">
                <Button variant="outlined" component="span">
                  Upload Resume or Profile
                </Button>
              </label>
              <input
                type="file"
                id="resumeInput"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleResumeUpload}
              />

<Button variant="contained" type="submit" component="span" className="button"  >
            Submit
          </Button>

            </div>
          </Box>
         
        </form>
      </Paper>
    </Container>
  );
}

export default UploadPage;