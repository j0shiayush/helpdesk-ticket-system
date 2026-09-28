import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get('/tickets');
      setTickets(data.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const deleteTicket = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await api.delete(`/tickets/${id}`);
        fetchTickets(); // Refresh the list
      } catch (error) {
        console.error("Error deleting ticket", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="header-row">
          <h2>My Support Tickets</h2>
          <Link to="/dashboard/create" className="btn-primary">Create New Ticket</Link>
        </div>
        
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <div className="empty-state">You have no open tickets.</div>
        ) : (
          <div className="ticket-grid">
            {tickets.map(ticket => (
              <div key={ticket._id} className="ticket-card">
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="ticket-desc">{ticket.description}</p>
                <div className="ticket-meta">
                  <span><strong>Category:</strong> {ticket.category}</span>
                  <span><strong>Priority:</strong> <span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></span>
                </div>
                <div className="ticket-actions">
                  <button onClick={() => deleteTicket(ticket._id)} className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;