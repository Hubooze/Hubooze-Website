
import './App.css';
import './axiosConfig';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Component/Navbar/Navbar';

import HomePage from './Pages/Home'
// Mr. Ravinders files
import { WomenSection, MenSection, KidsSection } from './Component/ProductSection/Sections'; // Adjust the import path based on your project structure

import AdminRegister from './Component/Admin/AdminRegister'
import AdminLogin from './Component/Admin/AdminLogin';
import AdminDashboard from './Component/Admin/AdminDashboard';

import LoginSignup from './Pages/LoginSignup';

import About from './Pages/About';
import Contact from './Pages/Contact';
import CompanyPolicy from './Pages/Policy';
import TermsAndConditions from './Pages/TermsAndConditions';
import PressRelease from './Pages/PressRelease';
import Careers from './Pages/Careers';
import Blogs from './Pages/Blogs';
import Employees from './Pages/Employees';

import Cancel from './Pages/Cancel';
import Success from './Pages/Success';

import CartItem from './Component/CartItem/CartItem';
import Checkout from './Pages/Checkout';
import Footer from './Component/Footer/Footer';


function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
       
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/women' element={<WomenSection />} />
          <Route path='/men' element={<MenSection />} />
          <Route path='/kids' element={<KidsSection />} />
          
        </Routes>

        <Routes>
          <Route path='/login' element={<LoginSignup />} />
        </Routes>

        <Routes>
          <Route path='/adminlogin' element={<AdminLogin />} />  
          <Route
            path='/adminregister'
            element={isAuthenticated() ? <AdminRegister /> : <Navigate to="/adminlogin" />}
          />       
          <Route
            path='/admin/dashboard'
            element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/adminlogin" />}
          />
        </Routes>

        <Routes>
          <Route path="/cart" element={<CartItem />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<CompanyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/press-releases' element={<PressRelease />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/employees' element={<Employees />} />
        </Routes> 

        <Routes >
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>

        <Footer />

      </BrowserRouter>


    </div>
  );
}

export default App;
