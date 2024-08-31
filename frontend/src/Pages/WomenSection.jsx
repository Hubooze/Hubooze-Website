import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider from '../Component/ImageSlider/ImageSlider';
import Item from '../Component/Item/Item';
import './CSS/WomenSection.css';


// Assuming you have a Navbar component
import Navbar from '../Component/Navbar/Navbar';

const WomenSection = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isOpen, setIsOpen] = useState(false); 
    const [products, setProducts] = useState([]); // State to store fetched products


    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    }; 

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
      };

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://192.168.1.109:3000/api/products'); // Update with your correct endpoint
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const images = [
        'https://via.placeholder.com/800x400.png?text=Sale+Up+to+50%25+Off',
        'https://via.placeholder.com/800x400.png?text=New+Arrivals',
        'https://via.placeholder.com/800x400.png?text=Limited+Edition',
        'https://via.placeholder.com/800x400.png?text=Summer+Collection',
        'https://via.placeholder.com/800x400.png?text=Buy+One+Get+One+Free',
        'https://via.placeholder.com/800x400.png?text=Free+Shipping',
        'https://via.placeholder.com/800x400.png?text=Exclusive+Offer',
        'https://via.placeholder.com/800x400.png?text=Shop+Now',
    ];

    return (
        <div>
            <Navbar />
            <ImageSlider images={images} />
            <h1 className='womensection-heading'>New Arrivals: Sale up to 50% Off!</h1>
            <button className=" btn relative" onClick={toggleNavbar}>
            {isOpen ? (
              <span>
                <h1>Filters -</h1>
              </span>
            ) : (
              <span>
                <h1>Filters + </h1>
              </span>
            )}
          </button>
            <div className="main-content">
          
                <div className="category-container category-container-hide ">
                    <h1>Filters</h1>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'category' ? 'active' : ''}`}>
                        <h1 className='aside-options' onClick={() => toggleDropdown('category')}>
                            Category <span>{openDropdown === 'category' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'brand' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('brand')}>
                            Brand <span>{openDropdown === 'brand' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'size' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('size')}>
                            Sizes <span> {openDropdown === 'size' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">         
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'type' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('type')}>
                            Type <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'color' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('color')}>
                            Colour <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                            <label> Ethnic Wear <input type="checkbox" /></label>
                        </div>
                    </div>
                </div>
                {/* toggle filters for small screen */}
                {isOpen && (
        <div  className="main-toggle">
           <div  className="category-container-res ">
                    <h1>Filters</h1>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'category' ? 'active' : ''}`}>
                        <h1 className='aside-options' onClick={() => toggleDropdown('category')}>
                            Category <span>{openDropdown === 'category' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label><input type="checkbox" /> Ethnic Wear <span>109537</span></label>                          
                            <label><input type="checkbox" /> Western Wear <span>129081</span></label>
                            <label><input type="checkbox" /> Sports Wear <span>13665</span></label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'brand' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('brand')}>
                            Brand <span>{openDropdown === 'brand' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label><input type="checkbox" /> Zara</label>
                            <label><input type="checkbox" /> Vero Moda </label>
                            <label><input type="checkbox" /> Mast & Harbour</label>
                            <label><input type="checkbox" /> Libas</label>
                            <label><input type="checkbox" /> H&M </label>
                            <label><input type="checkbox" /> Levis </label>
                            <label><input type="checkbox" /> Roadster </label>
                            <label><input type="checkbox" /> HRX </label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'size' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('size')}>
                            Sizes <span> {openDropdown === 'size' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label><input type="checkbox" /> S </label>
                            <label><input type="checkbox" /> M</label>
                            <label><input type="checkbox" /> L</label>
                            <label><input type="checkbox" /> XL </label>
                            <label><input type="checkbox" /> One Size </label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'type' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('type')}>
                            Type <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label><input type="checkbox" />  Tops & Tshirts </label>
                            <label><input type="checkbox" />  Shirts</label>
                            <label><input type="checkbox" /> Kurta-Sets</label>
                            <label><input type="checkbox" /> Jeans & Trousers </label>
                            <label><input type="checkbox" /> Sarees </label>
                            <label><input type="checkbox" /> Sports Wear  </label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'color' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('color')}>
                            Colour <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                            <label><input type="checkbox" /> Violet </label>
                            <label><input type="checkbox" /> White</label>
                            <label><input type="checkbox" /> Black</label>
                            <label><input type="checkbox" /> Orange </label>
                            <label><input type="checkbox" /> Yellow </label>
                            <label><input type="checkbox" /> Red </label>
                            <label><input type="checkbox" /> Blue </label>
                            <label><input type="checkbox" /> Green </label>
                            <label><input type="checkbox" /> Pink </label>
                            <label><input type="checkbox" /> Purple </label>
                            <label><input type="checkbox" /> Brown </label>
                            <label><input type="checkbox" /> Beige </label>


                        </div>
                    </div>
                    <div className='btn-filters'>
                    <button className='btn-reset'>Reset All</button>
                    <button className='btn-apply'>Apply</button>
                </div>
                </div>
                
        </div>
      )}
                <div className="shopCategory-product">
                    {products.map(product => (
                        <Item
                            key={product.id}
                            id={product.HIN_No}
                            name={product.name}
                            images={product.image}
                            new_price={product.market_price}
                            old_price={product.selling_price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WomenSection;
