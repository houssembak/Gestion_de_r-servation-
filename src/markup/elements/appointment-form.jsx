import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    name: "",
    phone: "",
    reason: "",
    appointmentDate: "",
  });

  const [token, setToken] = useState(""); // Store the token
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  // Fetch token and validate user login on load
  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Get token from localStorage

    if (storedToken) {
      setToken(storedToken); // Save token in state

      // Fetch user details to check authentication
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Pass token to backend
          },
        })
        .then((response) => {
          setUser(response.data.user); // Store logged-in user data
          setIsAuthenticated(true); // Mark user as authenticated
        })
        .catch(() => {
          setIsAuthenticated(false); // Mark user as not authenticated
          localStorage.removeItem("token"); // Clear invalid token
        });
    } else {
      setIsAuthenticated(false); // No token, mark as guest
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must register and log in to book an appointment.");
      window.location.href = "/login"; // Redirect to login
      return;
    }

    if (user?.role !== "Patient") {
      alert("Only registered clients can book appointments.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      alert("Appointment booked successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error.message);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-form form-wrapper">
      <h3 className="title">Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            className="form-select form-control"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Doctor</label>
          <select
            className="form-select form-control"
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
          >
            <option value="">Select Doctor</option>
            <option value="64a1f3b6e5bfc8f6a2d8b934">Dr. Smith</option>
            <option value="64a1f3b6e5bfc8f6a2d8b935">Dr. Brown</option>
            <option value="64a1f3b6e5bfc8f6a2d8b936">Dr. Johnson</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <textarea
            className="form-control"
            id="reason"
            name="reason"
            placeholder="Reason for Appointment"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-lg">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;

