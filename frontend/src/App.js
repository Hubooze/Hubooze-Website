
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShopItem from './Pages/ShopCategory';
import Shop from './Pages/Shop'
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Component/Footer/Footer';
import men_banner from './Component/Assets/banner_mens.png';
import woman_banner from './Component/Assets/banner_women.png';
import kid_banner from './Component/Assets/banner_kids.png';
import mencat from './Subcagory/subcateman'
import Cancel from './Pages/Cancel';
import Success from './Pages/Success';
// import LatestCollectionspage from './Pages/LatestCollectionspage';
// import Exclusiveoffer from './Pages/Exclusiveoffer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import CompanyPolicy from './Pages/CompanyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';
import PressRelease from './Pages/PressRelease';

import AdminRegister from './Component/Admin/AdminRegister'
import AdminLogin from './Component/Admin/AdminLogin';
import AdminDashboard from './Component/Admin/AdminDashboard';
import WomenCRUD from './Component/WomenCRUD';
import MenCRUD from './Component/MenCRUD';
import KidsCRUD from './Component/KidsCRUD';

function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopItem banner={men_banner} subcate={mencat} category="men" />} />
          <Route path='/womens' element={<ShopItem banner={woman_banner} category="women" />} />
          <Route path='/kids' element={<ShopItem banner={kid_banner} category="kid" />} />
        </Routes>

        {/* <Routes>
          <Route path='/Product' element={<Product />}/>
          <Route path=":ProductId" element={<Product />} />
        </Routes> */}

        <Routes>
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>

        <Routes>
          {/* <Route path='/*' element={<AdminLogin />} /> */}
          
          <Route path='/adminlogin' element={<AdminLogin />} />
          
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route
            path='/admin/dashboard'
            element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/adminlogin" />}
          />
          <Route
            path='/admin/women'
            element={isAuthenticated() ? <WomenCRUD /> : <Navigate to="/adminlogin" />}
          />
          <Route
            path='/admin/men'
            element={isAuthenticated() ? <MenCRUD /> : <Navigate to="/adminlogin" />}
          />
          <Route
            path='/admin/kids'
            element={isAuthenticated() ? <KidsCRUD /> : <Navigate to="/adminlogin" />}
          />
          {/* <Route path='/*' element={<Navigate to="/adminlogin" />} />  */}
        </Routes>

        {/* <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/company-policy' element={<CompanyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/press-releases' element={<PressRelease />} />
        </Routes> */}

        <Routes >
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      
        {/* <Footer /> */}

      </BrowserRouter>


    </div>
  );
}

export default App;
