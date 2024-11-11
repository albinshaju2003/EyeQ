// src/Dashboard.js
import React, { useState } from "react";
import "./Dashboard.css";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { LiaBinocularsSolid } from "react-icons/lia";
import { MdSpaceDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [viewReports, setViewReports] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [timestampInfo, setTimestampInfo] = useState(null);
  const [isTimestampGenerated, setIsTimestampGenerated] = useState(false);  // Track if timestamp is generated
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "user@example.com";

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setUploadedVideo(videoURL);
      setPrompt(""); // Reset prompt when a new video is uploaded
      setIsTimestampGenerated(false); // Reset timestamp info
      setTimestampInfo(null); // Clear previous timestamp data
    }
  };

  const handleReportsClick = () => {
    setViewReports(true);
  };

  const handleDashboardClick = () => {
    setViewReports(false);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // Function to generate timestamps only when the button is clicked
  const generateTimestampInfo = () => {
    setTimestampInfo([
      { time: "00:12", description: "Detected a car entering the scene." },
      { time: "00:45", description: "Person detected near the building entrance." },
      { time: "01:30", description: "Dog detected moving across the field." },
    ]);
    setIsTimestampGenerated(true);  // Mark that timestamps have been generated
  };

  const data = {
    labels: ["Person", "Car", "Bicycle", "Dog", "Cat", "Bus"],
    datasets: [
      {
        label: "Frequency of Objects Detected",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Object Detection Frequency" },
    },
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title"><LiaBinocularsSolid />&nbsp;EyeQ</h2>
        <ul className="sidebar-menu">
          <li onClick={handleDashboardClick}><MdSpaceDashboard />&nbsp;Dashboard</li>
          <li onClick={handleReportsClick}><TbReportSearch />&nbsp;Reports</li>
          <li><IoMdSettings />&nbsp;Settings</li>
        </ul>
      </div>

      {/* Main Dashboard */}
      <div className="main-content">
        <div className="top-bar">
          <div className="search-section">
            <div className="search-icon">&#128269;</div>
            <input type="text" placeholder="Search..." className="search-input" />
          </div>
          <div className="top-icons">
            <i className="fa fa-bell"></i>
            <i className="fa fa-envelope"></i>
            <i className="fa fa-user-circle" onClick={toggleProfile}><CgProfile /></i>
          </div>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <p>Email: {email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <h2 className="dashboard-header">Dashboard</h2>
        <div className="cards">
          <div className="card blue"><h3>CAMERA INPUTS</h3><span>249</span><i className="fa fa-box card-icon"></i></div>
          <div className="card orange"><h3>DETECTIONS</h3><span>25</span><i className="fa fa-th-large card-icon"></i></div>
          <div className="card green"><h3>USER LOG</h3><span>1500</span><i className="fa fa-users card-icon"></i></div>
          <div className="card red"><h3>Alerts</h3><span>56</span><i className="fa fa-bell card-icon"></i></div>
        </div>

        {viewReports ? (
          <div className="chart-container" style={{ marginTop: "20px" }}>
            <h3>Object Detection Report</h3>
            <Bar data={data} options={options} />
          </div>
        ) : (
          <div className="video-upload" style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
            <div className="upload-section">
              <h3>Upload Video </h3>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
              {uploadedVideo && (
                <div className="uploaded-video-preview" style={{ marginTop: '20px' }}>
                  <video src={uploadedVideo} controls width="100%"></video>
                </div>
              )}
            </div>
            {uploadedVideo && (
              <div className="prompt-section" style={{ flex: '1' }}>
                <h3>Enter Prompt</h3>
                <textarea
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter a prompt for object detection analysis"
                  rows="4"
                  style={{ width: '100%', marginTop: '10px', padding: '8px' }}
                />
                {/* Submit button to generate timestamps */}
                <button
                  onClick={generateTimestampInfo}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>

                {isTimestampGenerated && timestampInfo && (
                  <div className="timestamp-info" style={{ marginTop: '20px' }}>
                    <h4>Detected Objects</h4>
                    <ul>
                      {timestampInfo.map((info, index) => (
                        <li key={index}><strong>{info.time}</strong>: {info.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
