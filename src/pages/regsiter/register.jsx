import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../component/layout/layout.jsx';


const registrationSchema = Yup.object({
  name: Yup.string().required('Full Name is required.'),
  email: Yup.string().email('Email address is invalid.').required('Email is required.'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long.').required('Password is required.'),
});

export default function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSuccess(false);
    try {
      await registrationSchema.validate(user, { abortEarly: false });
      setErrors({});
      setIsSuccess(true);

      const existingUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === user.email);

      if (!userExists) {
        existingUsers.push({ name: user.name, email: user.email });
        localStorage.setItem('appUsers', JSON.stringify(existingUsers));
      }

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
      }
      setErrors(validationErrors);
    }
  }
  return (
    <AuthLayout>
       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div 
        className="p-4 p-md-5 rounded-3" 
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <h2 className="mb-4 text-center fw-bold text-white">Create a New Account</h2>
        {isSuccess && (
          <div className="alert alert-success text-center">
            Thanks for registering! Redirecting to login...
          </div>
        )}

<form onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Full Name</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" name="name" value={user.name} onChange={handleInputChange} autoComplete="off" />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email address</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={user.email} onChange={handleInputChange} autoComplete="off" />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={user.password} onChange={handleInputChange} autoComplete="new-password" />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-outline-success btn-lg">Register</button>
          </div>
        </form>
      </div>
    </div>
    </AuthLayout>
  );
}