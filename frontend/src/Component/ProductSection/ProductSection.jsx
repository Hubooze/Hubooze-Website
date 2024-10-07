import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider from '../ImageSlider/ImageSlider';
import Item from '../Item/Item';
import './ProductSection.css'; // Rename the CSS file to be generic

const ProductSection = ({ category }) => {
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
        if (category) {
            axios.get(`http://192.168.1.109:3000/api/products/category/${category}`)
                .then(response => {
                    console.log('API Response:', response.data); // Log the response to check it
                    const data = response.data;
                    // Check if the response data is an array
                    if (data.success && Array.isArray(data.products)) {
                        data.products.forEach(product => {
                            console.log('Product:', product); // Check individual product fields
                            console.log('Product ID:', product._id); // Check if _id exists
                            console.log('Product Image:', product.image); // Check if image exists
                        });
                      
                        setProducts(data.products);
                    } else {
                        console.error('Unexpected API response:', data);
                        setProducts([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    setProducts([]);  // Set products to an empty array on error
                });
        }
    }, [category]);

    if (!category) {
        return <div>Error: No section provided</div>;
    }

    const images = [
        'https://via.placeholder.com/800x400.png?text=Free+Shipping',
        'https://via.placeholder.com/800x400.png?text=Exclusive+Offer',
        'https://via.placeholder.com/800x400.png?text=Shop+Now',
    ];

    return (
        <div>
            <ImageSlider images={images} />
            <h1 className='heading'>New Arrivals: Sale up to 50% Off!</h1>
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
                            <label> Ethnic <input type="checkbox" /></label>
                            <label> Western  <input type="checkbox" /></label>
                            <label> Sports  <input type="checkbox" /></label>
            
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
                            <label> S <input type="checkbox" /></label>
                            <label> M <input type="checkbox" /></label>
                            <label> L <input type="checkbox" /></label>
                            <label> XL <input type="checkbox" /></label>
                            <label> Onesize <input type="checkbox" /></label>
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
                
                <div className="shopCategory-product product-grid">
                    {products.map(product => (
                        <Item
                            key={product._id}
                            productId={product._id} // Ensure you're passing this
                            name={product.name}
                            image={product.image}
                            market_price={product.market_price}
                            selling_price={product.selling_price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductSection;
