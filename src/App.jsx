// import { Routes, Route } from 'react-router-dom'
// import Navbar from './Components/Navbar'
// import Home from './components/Home'
// import Upload from './pages/Upload'

// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Dashboard from './pages/DashBoard'
// import JobApplicationApp from './pages/jobapply'

// function App() {
//   return (
//     <>
//       <Navbar />
      
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//                 <Route path="/dash" element={<Dashboard/>} />
//                 <Route path="/apply" element={<JobApplicationApp/>} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//          <Route path="/upload" element={<Upload />} />
//         {/* <Route path="/results/audio" element={} />  */}
//         {/* <Route path="/results/factcheck" element={} />
//         <Route path="/results/posture" element={} /> */}
//       </Routes>
//     </>
//   )
// }

// export default App



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Home from './components/Home';
// import Upload from './pages/Upload';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/DashBoard';
// import JobApplicationApp from './pages/jobapply';

// // Authentication Context
// export const AuthContext = React.createContext();

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for existing session
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   // Protected Route Component
//   const ProtectedRoute = ({ children, requiredRole }) => {
//     if (!user) {
//       return <Navigate to="/login" replace />;
//     }
    
//     if (requiredRole && user.role !== requiredRole) {
//       return <Navigate to="/" replace />;
//     }
    
//     return children;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//         <Navbar />
        
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           {/* Company Dashboard - Only for company members */}
//           <Route 
//             path="/dash" 
//             element={
//               <ProtectedRoute requiredRole="company">
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Job Application - Only for interviewers/candidates */}
//           <Route 
//             path="/apply" 
//             element={
//               <ProtectedRoute requiredRole="interviewer">
//                 <JobApplicationApp />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Upload - Accessible to authenticated users */}
//           <Route 
//             path="/upload" 
//             element={
//               <ProtectedRoute>
//                 <Upload />
//               </ProtectedRoute>
//             } 
//           />
//         </Routes>
//       </div>
//     </AuthContext.Provider>
//   );
// }

// export default App;



import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './components/Home';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/DashBoard';
import JobApplicationApp from './pages/jobapply';

// Authentication Context
export const AuthContext = React.createContext();

// Custom useAuth hook - THIS WAS MISSING
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Get user role for easier access
  const userRole = user?.role || null;
  const isAuthenticated = !!user;

  // Protected Route Component
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Enhanced context value with additional properties
  const authContextValue = {
    user,
    userRole,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Company Dashboard - Only for company members */}
          <Route 
            path="/dash" 
            element={
              <ProtectedRoute requiredRole="company">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Job Application - Only for interviewers/candidates */}
          <Route 
            path="/apply" 
            element={
              <ProtectedRoute requiredRole="interviewer">
                <JobApplicationApp />
              </ProtectedRoute>
            } 
          />
          
          {/* Upload - Accessible to authenticated users */}
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
