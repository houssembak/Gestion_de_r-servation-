import React, { useEffect, useState } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Charger les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users"); // Remplacez par votre API
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  // Charger les rendez-vous
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/appointments"); // Remplacez par votre API
      setAppointments(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
  }, []);

  // Approuver un utilisateur
  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${userId}/approve`); // API fictive
      alert("Utilisateur approuvé avec succès !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'approbation de l'utilisateur :", error);
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`); // API fictive
      alert("Utilisateur supprimé avec succès !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  // Supprimer un rendez-vous
  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/appointments/${appointmentId}`); // API fictive
      alert("Rendez-vous supprimé avec succès !");
      fetchAppointments();
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous :", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tableau de bord Super Admin</h1>

      {/* Section Utilisateurs */}
      <h2>Gestion des utilisateurs</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isValidated ? "Validé" : "Non validé"}</td>
              <td>
                {!user.isValidated && (
                  <button onClick={() => approveUser(user._id)}>Approuver</button>
                )}
                <button onClick={() => deleteUser(user._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section Rendez-vous */}
      <h2>Gestion des rendez-vous</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Département</th>
            <th>Docteur</th>
            <th>Date</th>
            <th>Raison</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.department}</td>
              <td>{appointment.doctor}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.reason}</td>
              <td>
                <button onClick={() => deleteAppointment(appointment._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminDashboard;
