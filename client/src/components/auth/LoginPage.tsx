import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'TRAINEE' 
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); 
    setIsLoading(true);

    // Simulate server delay
    setTimeout(() => {
      if (isRegister) {
        // Validation for registration
        if (formData.password !== confirmPassword) {
          setErrorMessage("Passwords do not match!");
          setIsLoading(false);
          return;
        }
        console.log("REGISTER DATA:", formData);
        alert("Registration Successful!");
        setIsRegister(false);
      } else {
        // Logic for login
        console.log("LOGIN DATA:", formData.email);
        isAdmin ? navigate('/admin-dashboard') : navigate('/Trainee-dashboard');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d0a6b] via-[#5b247a] to-[#e94e77] flex flex-col text-white font-sans tracking-tight">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-bold italic tracking-tighter">
          TRAINER<span className="text-pink-400 font-light">REVIEW</span>
        </div>
        <button 
          onClick={() => {
            setIsAdmin(!isAdmin);
            setIsRegister(false);
            setConfirmPassword('');
            setErrorMessage('');
          }}
          className="border border-white/30 px-5 py-2 rounded-full hover:bg-white hover:text-purple-900 transition-all text-sm font-semibold"
        >
          {isAdmin ? "Trainee Portal" : "Admin Access"}
        </button>
      </nav>

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-gray-900">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-extrabold text-[#2d0a6b]">
              {isRegister ? "Register" : (isAdmin ? "Admin Login" : "Trainee Login")}
            </h2>
            <p className="text-gray-400 mt-2 font-medium">
              {isRegister ? "Join the trainer feedback system" : "Welcome back, please sign in"}
            </p>
          </div>

          {/* Error Message UI */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center text-sm font-bold animate-pulse">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#5b247a] text-gray-800"
                  placeholder="Enter your name"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#5b247a] text-gray-800"
                placeholder="name@company.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#e94e77] text-gray-800"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {isRegister && (
              <div>
                <label className="text-sm font-bold text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  required
                  className={`w-full bg-gray-50 border p-3 rounded-xl outline-none transition-all text-gray-800 ${
                    confirmPassword && formData.password !== confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 focus:ring-[#e94e77]'
                  }`}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#2d0a6b] to-[#e94e77] text-white py-4 rounded-2xl font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : (isRegister ? "Create Account" : "Sign In")}
            </button>
          </form>

          {!isAdmin && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  setIsRegister(!isRegister);
                  setConfirmPassword('');
                  setErrorMessage('');
                }}
                className="text-[#5b247a] font-bold hover:text-[#e94e77] transition-colors underline underline-offset-4"
              >
                {isRegister ? "Already have an account? Login" : "Need an account? Register here"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState(''); // New state for validation
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'TRAINEE' 
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (isRegister) {
//       // 1. Validation Check: Do passwords match?
//       if (formData.password !== confirmPassword) {
//         alert("Passwords do not match!");
//         return; // Stop the function here
//       }

//       // 2. If they match, proceed to "Database" logic
//       console.log("SENDING TO DATABASE:", formData);
//       alert("Registration Successful!");
//       setIsRegister(false);
//     } else {
//       // Login logic
//       isAdmin ? navigate('/admin-dashboard') : navigate('/Trainee-dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#2d0a6b] via-[#5b247a] to-[#e94e77] flex flex-col text-white font-sans tracking-tight">
      
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-6 bg-white/10 backdrop-blur-md border-b border-white/10">
//         <div className="text-2xl font-bold italic tracking-tighter">
//           TRAINER<span className="text-pink-400 font-light">REVIEW</span>
//         </div>
//         <button 
//           onClick={() => {
//             setIsAdmin(!isAdmin);
//             setIsRegister(false);
//             setConfirmPassword(''); // Reset confirm field
//           }}
//           className="border border-white/30 px-5 py-2 rounded-full hover:bg-white hover:text-purple-900 transition-all text-sm font-semibold"
//         >
//           {isAdmin ? "Trainee Portal" : "Admin Access"}
//         </button>
//       </nav>

//       <div className="flex-grow flex items-center justify-center p-4">
//         <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-gray-900 transform transition-all">
//           <div className="mb-8">
//             <h2 className="text-4xl font-extrabold text-[#2d0a6b]">
//               {isRegister ? "Register" : (isAdmin ? "Admin Login" : "Trainee Login")}
//             </h2>
//             <p className="text-gray-400 mt-2 font-medium">
//               {isRegister ? "Join the trainer feedback system" : "Welcome back, please sign in"}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {isRegister && (
//               <div>
//                 <label className="text-sm font-bold text-gray-700">Full Name</label>
//                 <input 
//                   type="text" 
//                   required
//                   className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#5b247a] text-gray-800"
//                   placeholder="Enter your name"
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 />
//               </div>
//             )}

//             <div>
//               <label className="text-sm font-bold text-gray-700">Email Address</label>
//               <input 
//                 type="email" 
//                 required
//                 className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#5b247a] text-gray-800"
//                 placeholder="name@company.com"
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-bold text-gray-700">Password</label>
//               <input 
//                 type="password" 
//                 required
//                 className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#e94e77] text-gray-800"
//                 placeholder="••••••••"
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//               />
//             </div>

//             {/* CONFIRM PASSWORD - Only for Register */}
//             {isRegister && (
//               <div>
//                 <label className="text-sm font-bold text-gray-700">Confirm Password</label>
//                 <input 
//                   type="password" 
//                   required
//                   className={`w-full bg-gray-50 border p-3 rounded-xl outline-none transition-all text-gray-800 ${
//                     confirmPassword && formData.password !== confirmPassword 
//                     ? 'border-red-500 focus:ring-red-500' 
//                     : 'border-gray-200 focus:ring-[#e94e77]'
//                   }`}
//                   placeholder="••••••••"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 {confirmPassword && formData.password !== confirmPassword && (
//                   <p className="text-red-500 text-xs mt-1">Passwords do not match!</p>
//                 )}
//               </div>
//             )}

//             <button className="w-full bg-gradient-to-r from-[#2d0a6b] to-[#e94e77] text-white py-4 rounded-2xl font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all text-lg mt-2">
//               {isRegister ? "Create Account" : "Sign In"}
//             </button>
//           </form>

//           {!isAdmin && (
//             <div className="mt-8 text-center">
//               <button 
//                 onClick={() => {
//                   setIsRegister(!isRegister);
//                   setConfirmPassword('');
//                 }}
//                 className="text-[#5b247a] font-bold hover:text-[#e94e77] transition-colors underline underline-offset-4"
//               >
//                 {isRegister ? "Already have an account? Login" : "Need an account? Register here"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

