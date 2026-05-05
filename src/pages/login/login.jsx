import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../component/layout/layout.jsx';
const createFakeToken = (payload) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa('fake-signature');
  return `${header}.${encodedPayload}.${signature}`;
};

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

export default function Login({ saveUserData }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await loginSchema.validate(user, { abortEarly: false });
      
      const existingUsers = JSON.parse(localStorage.getItem('appUsers') || '[]');
      const foundUser = existingUsers.find(u => u.email === user.email);
      const userName = foundUser ? foundUser.name : user.email.split('@')[0];
      
      const userPayload = { name: userName, email: user.email };
      const fakeToken = createFakeToken(userPayload);
      
      localStorage.setItem('userToken', fakeToken);
      
      saveUserData();
      navigate('/');

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
      
      {/* الصندوق الشفاف */}
      <div 
        className="p-4 p-md-5 rounded-3" 
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)', // لون أبيض شفاف
          backdropFilter: 'blur(10px)', // تأثير البلور (ضبابي) للخلفية
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <h2 className="mb-4 text-center fw-bold text-white">Login to Your Account</h2>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email address</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={user.email} onChange={handleInputChange} autoComplete="off" />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={user.password} onChange={handleInputChange} autoComplete="current-password" />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-outline-success btn-lg">Login</button>
         </div>
        </form>
      </div>

    </div>
    </AuthLayout>
  );
}