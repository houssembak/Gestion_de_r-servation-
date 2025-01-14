import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import Images
import logo from "../../images/logo.png";

const CLOUDINARY_UPLOAD_PRESET = "your_actual_preset";
const CLOUDINARY_CLOUD_NAME = "your_actual_cloud_name";

const FormRegister = () => {
    // State declarations
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [CIN, setCIN] = useState('');
    const [role, setRole] = useState('Patient'); // Patient or Doctor
    const [specialization, setSpecialization] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [availability, setAvailability] = useState(new Date());
    const [message, setMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [diplomaImage, setDiplomaImage] = useState(null);

    const handleDateChange = (date) => {
        setAvailability(date);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Cloudinary file uploads
            let profileImageUrl = null;
            let diplomaImageUrl = null;

            // Upload profile image to Cloudinary
            if (profileImage) {
                const formData = new FormData();
                formData.append("file", profileImage);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );
                profileImageUrl = response.data.secure_url;
            }

            // Upload diploma image to Cloudinary (for doctors)
            if (diplomaImage && role === "Doctor") {
                const formData = new FormData();
                formData.append("file", diplomaImage);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );
                diplomaImageUrl = response.data.secure_url;
            }

            // Prepare data for backend
            const registrationData = {
                name,
                email,
                password,
                phoneNumber,
                CIN,
                role,
                specialization: role === "Doctor" ? specialization : undefined,
                availability: role === "Doctor" ? availability.toISOString() : undefined,
                medicalHistory: role === "Patient" ? medicalHistory : undefined,
                profileImage: role === "Doctor" && { profileImage: profileImageUrl },
                diplomaImage:  role === "Doctor" && { diplomaImage: diplomaImageUrl },
            };

            // Send data to the backend
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                registrationData
            );

            setMessage(response.data.message || "Registration successful!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error during registration.");
        }
    };

    return (
        <>
            <div className="section-area account-wraper2">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8">
                            <div className="appointment-form form-wraper">
                                <div className="logo">
                                    <img src={logo} alt="" />
                                </div>
                                <form onSubmit={handleRegister}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="CIN"
                                            value={CIN}
                                            onChange={(e) => setCIN(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="Patient">Patient</option>
                                            <option value="Doctor">Doctor</option>
                                        </select>
                                    </div>
                                    {role === "Doctor" && (
                                        <>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Specialization"
                                                    value={specialization}
                                                    onChange={(e) => setSpecialization(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Availability</label>
                                                <DatePicker
                                                    selected={availability}
                                                    onChange={handleDateChange}
                                                    className="form-control"
                                                    dateFormat="yyyy/MM/dd"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Profile Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Diploma Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setDiplomaImage(e.target.files[0])}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {role === "Patient" && (
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Medical History"
                                                value={medicalHistory}
                                                onChange={(e) => setMedicalHistory(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary w-100 radius-xl">
                                            Register Now
                                        </button>
                                    </div>
                                    <div className="text-center mt-40">
                                        <p className="mt-0">Already have an account?</p>
                                        <Link className="btn btn-lg btn-secondary w-100" to="/form-login">Login</Link>
                                    </div>
                                </form>
                                {message && <div className="alert alert-info mt-3">{message}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormRegister;
