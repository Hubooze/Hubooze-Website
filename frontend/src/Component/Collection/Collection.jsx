import React from "react";
import "./Collection.css";

function Collection() {
  return (
    <div>
      <section className="shop-section">
        <span className="subheading">Womens Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Top tees & Jeans</h3>
            <img src="images/Wethnics.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Kurtis & Salwar Suits</h3>
            <img src="images/WTraditional.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sarees</h3>
            <img src="images/Wwestern.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Indian Ethnic wear</h3>
            <img src="images/WSports.png" alt="card" />
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <span className="subheading">Mens Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Tshirt</h3>
            <img src="images/Methnics.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Shirts</h3>
            <img src="images/MTraditional.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Jeans trouser</h3>
            <img src="images/Mwestern.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Ethnic wear</h3>
            <img src="images/Msports.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <span className="subheading">Kids Collection</span>
        <div className="shop-images">
          <div className="shop-link">
            <h3>Boys Clothing</h3>
            <img src="images/Ethnics.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Girls Clothing</h3>
            <img src="images/Ethnics.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Sports Wear</h3>
            <img src="images/Western.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
          <div className="shop-link">
            <h3>Baby Wear</h3>
            <img src="images/Sports.jpeg" alt="card" />
            <a href="#">Shop now</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;
