
import React, { useState } from 'react';

const ProjectForm = ({ addProject }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [status, setStatus] = useState('active'); // default status

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dueDate || !paymentAmount) {
      alert('Please fill in all fields.');
      return;
    }
    addProject({ name, dueDate, paymentAmount: parseFloat(paymentAmount), status });
    setName('');
    setDueDate('');
    setPaymentAmount('');
    setStatus('active');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" >
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Payment Amount</label>
        <input
          type="number"
          className="form-control"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
