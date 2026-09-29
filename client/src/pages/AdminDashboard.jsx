import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data.data);

      const queryParams = new URLSearchParams();
      if (status) queryParams.append('status', status);
      if (priority) queryParams.append('priority', priority);
      if (search) queryParams.append('search', search);

      const ticketsRes = await api.get(`/admin/tickets?${queryParams.toString()}`);
      setTickets(ticketsRes.data.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, priority]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/admin/tickets/${id}`, { status: newStatus });
      fetchData(); 
    } catch (error) {
      console.error("Error updating ticket status", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container admin-container">
        <h2>Admin Dashboard</h2>
        
        <div className="stats-grid">
          <div className="stat-card"><h3>Total</h3><p>{stats.total || 0}</p></div>
          <div className="stat-card open"><h3>Open</h3><p>{stats.open || 0}</p></div>
          <div className="stat-card in-progress"><h3>In Progress</h3><p>{stats.inProgress || 0}</p></div>
          <div className="stat-card resolved"><h3>Resolved</h3><p>{stats.resolved || 0}</p></div>
        </div>

        <div className="filters-section">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="text" 
              placeholder="Search tickets by title..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="form-control"
            />
            <button type="submit" className="btn-primary">Search</button>
          </form>
          
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control filter-select">
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-control filter-select">
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {loading ? (
          <p>Loading admin data...</p>
        ) : (
          <div className="table-responsive">
            {tickets.length === 0 ? (
              <div className="empty-state">No tickets found matching your criteria.</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title & Description</th>
                    <th>Submitted By</th>
                    <th>Priority</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr key={ticket._id}>
                      <td>
                        <strong>{ticket.title}</strong>
                        <p className="table-desc">{ticket.description.substring(0, 50)}...</p>
                      </td>
                      <td>
                        {ticket.user_id?.name || 'Unknown User'} 
                        <br/> 
                        <small>{ticket.user_id?.email}</small>
                      </td>
                      <td><span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td>
                      <td>
                        <select 
                          value={ticket.status} 
                          onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                          className={`form-control status-select ${ticket.status.toLowerCase().replace(' ', '-')}`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;