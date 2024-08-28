import React from "react";
import Wethnics from '../Assets/images/Wethnics.jpeg'
import Wtraditional from '../Assets/images/WTraditional.jpeg'
import Wwestern from '../Assets/images/Wwestern.jpeg'
import Wsports from '../Assets/images/WSports.png'
import Methnics from '../Assets/images/Methnics.jpeg'
import Mtraditional from '../Assets/images/MTraditional.jpeg'
import Mwestern from '../Assets/images/Mwestern.jpeg'
import Msports from '../Assets/images/Msports.jpeg'
import Ethnics from '../Assets/images/Ethnics.jpeg'
import Western from '../Assets/images/Western.jpeg'
import Sports from '../Assets/images/Sports.jpeg'
// import Wethnics from '../Assets/images/Wethnics.jpeg'
import "./Collection.css";

function Collection() {
  return (
    <div>
      <section className="shop-section">
        <span className="subheading">Womens Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>T-Shirts & Jeans</h3>
            <img src={Wwestern} alt="card" />
            {/* <img src="images/Wethnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Kurta Sets</h3>
            <img src={Wtraditional} alt="card" />
            {/* <img src="images/WTraditional.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sarees</h3>
            <img src={Wethnics} alt="card" />
            {/* <img src="images/Wwestern.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sports</h3>
            <img src={Wsports} alt="card" />
            {/* <img src="images/WSports.png" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <span className="subheading">Mens Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Tshirt</h3>
            <img src={Mwestern} alt="card" />
            {/* <img src="images/Methnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Shirts</h3>
            <img src={Mtraditional} alt="card" />
            {/* <img src="images/MTraditional.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Jeans trouser</h3>
            <img src={Methnics} alt="card" />
            {/* <img src="images/Mwestern.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Ethnic wear</h3>
            <img src={Msports} alt="card" />
            {/* <img src="images/Msports.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <span className="subheading">Kids Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Boys Clothing</h3>
            <img src={Ethnics} alt="card" />
            {/* <img src="images/Ethnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Girls Clothing</h3>
            <img src={Ethnics} alt="card" />
            {/* <img src="images/Ethnics.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sports Wear</h3>
            <img src={Western} alt="card" />
            {/* <img src="images/Western.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Baby Wear</h3>
            <img src={Sports} alt="card" />
            {/* <img src="images/Sports.jpeg" alt="card" /> */}
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;
