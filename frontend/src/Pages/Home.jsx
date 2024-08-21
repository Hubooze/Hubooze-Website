import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <div className="advertisement-video">
      {/* Embed your advertisement video here */}
    </div>
    
    <h2>Women</h2>
    <div className="row">
      <Link to="/category/Women?sub_category=T-Shirts and Jeans"><div className="card">T-Shirts and Jeans</div></Link>
      <Link to="/category/Women?sub_category=Ethnic"><div className="card">Ethnic</div></Link>
      <Link to="/category/Women?sub_category=Sarees"><div className="card">Sarees</div></Link>
      <Link to="/category/Women?sub_category=Active Wear"><div className="card">Active Wear</div></Link>
    </div>

    <h2>Men</h2>
    <div className="row">
      <Link to="/category/Men?sub_category=T-Shirts and Shirts"><div className="card">T-Shirts/Shirts</div></Link>
      <Link to="/category/Men?sub_category=Jeans"><div className="card">Jeans</div></Link>
      <Link to="/category/Men?sub_category=Active Wear"><div className="card">Active Wear</div></Link>
      <Link to="/category/Men?sub_category=Ethnic"><div className="card">Ethnic</div></Link>
    </div>

    <h2>Kids</h2>
    <div className="row">
      <Link to="/category/Kids?sub_category=Boys Clothing"><div className="card">Boys</div></Link>
      <Link to="/category/Kids?sub_category=Girls Clothing"><div className="card">Girls</div></Link>
      <Link to="/category/Kids?sub_category=Baby Wear"><div className="card">Baby</div></Link>
      <Link to="/category/Kids?sub_category=Sports"><div className="card">Sports</div></Link>
    </div>
  </div>


);

export default HomePage;
