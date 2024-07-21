
import './App.css';
import Navbar from './Component/Navbar/Navbar';
// import NewNavbar from './Component/NewNavbar/NewNavbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import LatestCollectionspage from './Pages/LatestCollectionspage';
import Exclusiveoffer from './Pages/Exclusiveoffer';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {/* <NewNavbar/> */}
        <Routes>
        <Route path='/offers' element={<Exclusiveoffer/>} />
        </Routes>
        <Routes >
          <Route path='/latestcollection' element={<LatestCollectionspage/>} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopItem banner={men_banner} subcate={mencat} category="men" />} />
          <Route path='/womens' element={<ShopItem banner={woman_banner} category="women" />} />
          <Route path='/kids' element={<ShopItem banner={kid_banner} category="kid" />} />

          <Route path='/Product' element={<Product />}>
            <Route path=":ProductId" element={<Product />} />
          </Route>

        
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />

        </Routes>
        <Footer />

      </BrowserRouter>


    </div>
  );
}

export default App;
