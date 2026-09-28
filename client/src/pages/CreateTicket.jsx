import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreateTicket = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      await api.post('/tickets', data);
      navigate('/dashboard'); // Go back to dashboard on success
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to create ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container" style={{ alignItems: 'flex-start', paddingTop: '50px' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form" style={{ maxWidth: '600px' }}>
          <div className="header-row">
            <h2>Create New Ticket</h2>
            <Link to="/dashboard">Back</Link>
          </div>
          
          {apiError && <div className="error-message">{apiError}</div>}

          <div className="form-group">
            <label>Title</label>
            <input {...register('title', { required: 'Title is required' })} />
            {errors.title && <span className="error-text">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              {...register('description', { required: 'Description is required' })} 
              rows="4"
              className="form-control"
            />
            {errors.description && <span className="error-text">{errors.description.message}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <input {...register('category', { required: 'Category is required' })} placeholder="e.g. Hardware, Billing, Software" />
            {errors.category && <span className="error-text">{errors.category.message}</span>}
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select {...register('priority')} className="form-control">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;