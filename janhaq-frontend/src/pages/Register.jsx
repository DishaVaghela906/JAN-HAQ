import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { saveUser } from '../utils/userDb'; // Import our saveUser function
import OnboardingForm from '../components/OnboardingForm';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setIsOnboardingOpen(true); 
  };
  
  const handleOnboardingComplete = (profileData) => {
    const newUser = { 
      email: form.email, 
      name: form.fullName, 
      profile: profileData 
    };

    // 1. Save the new user to our mock database
    saveUser(newUser);

    // 2. Log the user in
    login(newUser);

    setIsOnboardingOpen(false);
    navigate('/dashboard'); 
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center px-6 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              Register for JanHaq
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
              <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition">
                Register
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
              Already have an account? <a href="/login" className="hover:underline">Login</a>
            </div>
          </div>
        </div>
      </div>
      
      {isOnboardingOpen && (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      )}
    </>
  );
}
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import OnboardingForm from '../components/OnboardingForm'; 
// export default function Register() {
//   const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
//   const [isOnboardingOpen, setIsOnboardingOpen] = useState(false); // State to control the modal
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     // On successful registration, open the onboarding modal
//     setIsOnboardingOpen(true); 
//   };
  
//   const handleOnboardingComplete = (profileData) => {
//     console.log("Onboarding complete! Profile data:", profileData);
    
//     // In a real app, we would send this profileData to the backend here.
//     // For now, we'll log them in and redirect.
    
//     const userData = { email: form.email, name: form.fullName, profile: profileData };
//     login(userData); // We can update login to store profile too
//     setIsOnboardingOpen(false);
//     navigate('/dashboard'); 
//   };

//   return (
//     <>
//       <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
//         <div className="flex-grow flex items-center justify-center px-6 py-12">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 w-full max-w-md">
//             <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
//               Register for JanHaq
//             </h2>
//             <form onSubmit={handleRegister} className="space-y-4">
//               {/* --- Your existing form inputs go here --- */}
//               <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
//               <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
//               <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
//               <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"/>
              
//               <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition">
//                 Register
//               </button>
//             </form>
//             <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
//               Already have an account? <a href="/login" className="hover:underline">Login</a>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Conditionally render the onboarding modal */}
//       {isOnboardingOpen && (
//         <OnboardingForm onComplete={handleOnboardingComplete} />
//       )}
//     </>
//   );
// }

