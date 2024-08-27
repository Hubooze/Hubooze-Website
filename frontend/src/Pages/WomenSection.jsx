import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider from '../Component/ImageSlider/ImageSlider';
import Item from '../Component/Item/Item';
// import img1 from "../Component/Assets/p1_product_i1.png";
// import img2 from "../Component/Assets/p1_product_i2.png";
// import img3 from "../Component/Assets/p1_product_i3.png";
// import img4 from "../Component/Assets/p1_product_i4.png";
// import img from "../Component/Assets/p1_product.png";
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

    // const sampleItem = [
    //     {
    //         id: 'item1',
    //         name: 'Item 1',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 19.99,
    //         old_price: 29.99,
    //     },
    //     {
    //         id: 'item2',
    //         name: 'Item 2',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 24.99,
    //         old_price: 34.99,
    //     },
    //     {
    //         id: 'item1',
    //         name: 'Item 1',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 19.99,
    //         old_price: 29.99,
    //     },
    //     {
    //         id: 'item2',
    //         name: 'Item 2',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 24.99,
    //         old_price: 34.99,
    //     },
    //     {
    //         id: 'item1',
    //         name: 'Item 1',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 19.99,
    //         old_price: 29.99,
    //     },
    //     {
    //         id: 'item2',
    //         name: 'Item 2',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 24.99,
    //         old_price: 34.99,
    //     },
    //     {
    //         id: 'item1',
    //         name: 'Item 1',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 19.99,
    //         old_price: 29.99,
    //     },
    //     {
    //         id: 'item2',
    //         name: 'Item 2',
    //         images: [img, img1, img2, img3, img4],
    //         new_price: 24.99,
    //         old_price: 34.99,
    //     },
    //     // Add more items as needed
    // ];

    return (
        <div>
            {/* <Navbar /> */}
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
                            {/* <label><input type="checkbox" /> Swim & Beachwear <span>1485</span></label>
                            <label><input type="checkbox" /> Inner & Nightwear <span>39856</span></label> */}
                            <label><input type="checkbox" /> Western wear <span>129081</span></label>
                            {/* <label><input type="checkbox" /> Formal Wear <span>1417</span></label> */}
                            <label><input type="checkbox" /> Sports Wear <span>13665</span></label>
                            {/* <label><input type="checkbox" /> Maternity Wear <span>1505</span></label> */}
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'brand' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('brand')}>
                            Brand <span>{openDropdown === 'brand' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        <label><input type="checkbox" />  Option 1</label>
                            <label><input type="checkbox" />  Option 2 </label>
                            <label><input type="checkbox" />  Option 3</label>
                            <label><input type="checkbox" /> Option 4</label>
                            <label><input type="checkbox" /> Option 5 </label>
                            <label><input type="checkbox" /> Option 6 </label>
                            <label><input type="checkbox" /> Option 7 </label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'size' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('size')}>
                            Sizes <span> {openDropdown === 'size' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        <label><input type="checkbox" />  Option 2 </label>
                            <label><input type="checkbox" />  Option 3</label>
                            <label><input type="checkbox" /> Option 4</label>
                            <label><input type="checkbox" /> Option 5 </label>
                            <label><input type="checkbox" /> Option 6 </label>
                            <label><input type="checkbox" /> Option 7 </label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'type' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('type')}>
                            Type <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        <label><input type="checkbox" />  Option 2 </label>
                            <label><input type="checkbox" />  Option 3</label>
                            <label><input type="checkbox" /> Option 4</label>
                            <label><input type="checkbox" /> Option 5 </label>
                            <label><input type="checkbox" /> Option 6 </label>
                            <label><input type="checkbox" /> Option 7 </label>
                        </div>
                    </div>
                    <hr />
                    <div className={`dropdown ${openDropdown === 'color' ? 'active' : ''}`}>
                        <h1 onClick={() => toggleDropdown('color')}>
                            Colour <span>{openDropdown === 'type' ? '−' : '+'}</span>
                        </h1>
                        <div className="dropdown-content">
                        <label><input type="checkbox" />  Option 2 </label>
                            <label><input type="checkbox" />  Option 3</label>
                            <label><input type="checkbox" /> Option 4</label>
                            <label><input type="checkbox" /> Option 5 </label>
                            <label><input type="checkbox" /> Option 6 </label>
                            <label><input type="checkbox" /> Option 7 </label>
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
