import React from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import Admine from './Pages/Admine/Admine.jsx'
// import Sidebar from '../../Components/Siderbar/Sidebar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
  return (
    <div>
  <Navbar/>
  <Admine/>
    </div>
  )
}


// const App = () => {
//   return (
    
//       <Routes>
//         <Route path="/api/admin/login" element={<AdminLogin />} />
//         <Route path="api/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
//         <Route path="/admin/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
//         <Route path="/listproducts" element={<ProtectedRoute><ListProduct /></ProtectedRoute>} />
//       </Routes>    

//   );
// };

export default App;