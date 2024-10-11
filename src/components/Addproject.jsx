
import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import PaymentsList from './PaymentsList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialProjects = [
  { id: 1, name: 'Project A', dueDate: '2024-10-15', status: 'active', earnings: 20666 },
  { id: 2, name: 'Project B', dueDate: '2024-11-20', status: 'completed', earnings: 15011 },
];

const initialPayments = [
  { id: 1, amount: 20666, status: 'paid' },
  { id: 2, amount: 15011, status: 'unpaid' },
];

const ProjectAdd = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [payments, setPayments] = useState(initialPayments);
  const [totalEarnings, setTotalEarnings] = useState(() => {
 
    const projectEarnings = initialProjects.reduce((sum, project) => sum + project.earnings, 0);
    const paymentEarnings = initialPayments.filter(payment => payment.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);
    return projectEarnings + paymentEarnings;
  });

  const addProject = (project) => {
  const newProject = { id: Date.now(), ...project };
  setProjects([...projects, newProject]);
  setTotalEarnings(prev => prev + project.earnings);
  setPayments([...payments, { id: Date.now() + 1, amount: project.earnings, status: 'unpaid' }]);
  toast.success(`Project "${project.name}" added with earnings of $${project.earnings}!`);
};


  const deleteProject = (id) => {
    const projectToDelete = projects.find((project) => project.id === id);
    if (projectToDelete) {
      setProjects(projects.filter((project) => project.id !== id));
      setTotalEarnings(prev => prev - projectToDelete.earnings);
      toast.error(`Project "${projectToDelete.name}" deleted!`);
    }
  };

  const toggleProjectStatus = (id) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === id) {
        const newStatus = project.status === 'active' ? 'completed' : 'active';
        toast.success(`Project status changed to "${newStatus}"!`);
        return { ...project, status: newStatus };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const markPaymentAsPaid = (id) => {
    const paymentToUpdate = payments.find(payment => payment.id === id);
    if (paymentToUpdate && paymentToUpdate.status !== 'paid') {
      setPayments(
        payments.map((payment) =>
          payment.id === id ? { ...payment, status: 'paid' } : payment
        )
      );
      setTotalEarnings(prev => prev + paymentToUpdate.amount);
      toast.success(`Payment of $${paymentToUpdate.amount} marked as paid!`);
    }
  };

  const deletePayment = (id) => {
    const paymentToDelete = payments.find(payment => payment.id === id);
    if (paymentToDelete) {
      setPayments(payments.filter(payment => payment.id !== id));
      setTotalEarnings(prev => prev - paymentToDelete.amount);
      toast.error(`Payment of $${paymentToDelete.amount} deleted!`);
    }
  };

  return (
    <div className="container p-4 border border-4" style={{ backgroundColor: "#7afff8", borderRadius: "25px", borderColor: "#333" }}>
    <ToastContainer position="top-center" />
    
    <h1 className="mt-4 text-dark">Add Projects</h1>
    <ProjectForm addProject={addProject} />
  
    <div className="row my-4">
      {projects.map((project) => (
        <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
          <div className="card h-100 border border-3" style={{ borderColor: "#333" }}>
            <div className="card-body">
              <h5 className="card-title text-info">{project.name}</h5>
              <p className="card-text">Due Date: {project.dueDate}</p>
              <p className="card-text">
                Status: 
                <span className={`badge ${project.status === 'active' ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {project.status}
                </span>
              </p>
              <p className="card-text">Earnings: ${project.earnings}</p>
              <button
                className={`btn ${project.status === 'active' ? 'btn-warning text-dark' : 'btn-success'}`}
                onClick={() => toggleProjectStatus(project.id)}
              >
                {project.status === 'active' ? 'Active' : 'Completed'}
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  
    {/* Displaying Total Earnings */}
    <h2 className="text-dark">Earnings Overview</h2>
    <p>Total Earnings: ${totalEarnings}</p>
  
    {/* Payments List Section */}
    <PaymentsList payments={payments} markPaymentAsPaid={markPaymentAsPaid} deletePayment={deletePayment} />
  </div>
  
  
  );
};

export default ProjectAdd;
