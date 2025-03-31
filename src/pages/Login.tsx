import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      localStorage.setItem('user', JSON.stringify(formData));
      alert('Account created successfully!');
      navigate('/profile');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        alert('Login successful');
        navigate('/profile');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFormData({ ...formData, profileImage: reader.result });
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 hover:underline">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full p-2 border rounded-md"
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full p-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="w-full p-2 border rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}
          {/* {!isLogin && (
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-md"
              onChange={handleImageUpload}
            />
          )} */}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
