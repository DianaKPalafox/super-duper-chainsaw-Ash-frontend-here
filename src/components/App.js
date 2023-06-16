//dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styling/App.css";

import NavigationBar from "./NavigationBar";
import HomePage from "../routes/HomePage";
import UploadPage from "../routes/UploadPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </>
  );
}

export default App;
