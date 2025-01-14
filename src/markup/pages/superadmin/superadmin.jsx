import React, { useEffect, useState } from "react";
import axios from "axios";
import './superadmin.css'; // Ensure your custom styles, if any, do not override Bootstrap

const SuperadminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/superadmin/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const handleApprove = (id) => {
        axios.post(`http://localhost:3000/api/superadmin/approve/${id}`)
            .then(response => {
                const updatedUser = response.data;
                setUsers(users.map(user => user.id === id ? updatedUser : user));
            })
            .catch(error => console.error("Error approving user:", error));
    };

    const handleBlock = (id) => {
        axios.post(`http://localhost:3000/api/superadmin/block/${id}`)
            .then(response => {
                const updatedUser = response.data;
                setUsers(users.map(user => user.id === id ? updatedUser : user));
            })
            .catch(error => console.error("Error blocking user:", error));
    };

    const handleUnblock = (id) => {
        axios.post(`http://localhost:3000/api/superadmin/unblock/${id}`)
            .then(response => {
                const updatedUser = response.data;
                setUsers(users.map(user => user.id === id ? updatedUser : user));
            })
            .catch(error => console.error("Error unblocking user:", error));
    };

    const clients = users.filter(user => user.role === 'Client');
    const drivers = users.filter(user => user.role === 'Fournisseur');
    const admin = users.filter(user => user.role === 'Admin');

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Superadmin Dashboard</h1>

            <h2 className="text-center mb-4">Patients</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isApproved ? "Approved" : "Pending"} - {user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button className="btn btn-success btn-sm mr-2" onClick={() => handleApprove(user.id)}>Approve</button>
                                <button className="btn btn-danger btn-sm mr-2" onClick={() => handleBlock(user.id)}>Block</button>
                                <button className="btn btn-warning btn-sm" onClick={() => handleUnblock(user.id)}>Unblock</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-center mb-4">Doctors</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isApproved ? "Approved" : "Pending"} - {user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button className="btn btn-success btn-sm mr-2" onClick={() => handleApprove(user.id)}>Approve</button>
                                <button className="btn btn-danger btn-sm mr-2" onClick={() => handleBlock(user.id)}>Block</button>
                                <button className="btn btn-warning btn-sm" onClick={() => handleUnblock(user.id)}>Unblock</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <h2 className="text-center mb-4">Admin</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admin.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isApproved ? "Approved" : "Pending"} - {user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button className="btn btn-success btn-sm mr-2" onClick={() => handleApprove(user.id)}>Approve</button>
                                <button className="btn btn-danger btn-sm mr-2" onClick={() => handleBlock(user.id)}>Block</button>
                                <button className="btn btn-warning btn-sm" onClick={() => handleUnblock(user.id)}>Unblock</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuperadminDashboard;
