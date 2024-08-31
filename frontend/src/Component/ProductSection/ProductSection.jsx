import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider from '../ImageSlider/ImageSlider';
import Item from '../Item/Item';
import Navbar from '../Navbar/Navbar';
import './ProductSection.css'; // Rename the CSS file to be generic

const ProductSection = ({ section }) => {
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
        if (section) {
            axios.get(`http://192.168.1.109:3000/api/products/category/${section}`)
                .then(response => {
                    const data = response.data;
                    // Check if the response data is an array
                    if (Array.isArray(data)) {
                        setProducts(data);
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
    }, [section]);

    if (!section) {
        return <div>Error: No section provided</div>;
    }

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
            <h1 className='section-heading'>{`New Arrivals in ${section.charAt(0).toUpperCase() + section.slice(1)}: Sale up to 50% Off!`}</h1>
            <button className="btn relative" onClick={toggleNavbar}>
                {isOpen ? (
                    <span><h1>Filters -</h1></span>
                ) : (
                    <span><h1>Filters + </h1></span>
                )}
            </button>
            <div className="main-content">
                <div className={`category-container ${isOpen ? "category-container-res" : "category-container-hide"}`}>
                    <h1>Filters</h1>
                    <hr />
                    {['category', 'brand', 'size', 'type', 'color'].map((filterType) => (
                        <div key={filterType} className={`dropdown ${openDropdown === filterType ? 'active' : ''}`}>
                            <h1 className='aside-options' onClick={() => toggleDropdown(filterType)}>
                                {filterType.charAt(0).toUpperCase() + filterType.slice(1)} <span>{openDropdown === filterType ? '−' : '+'}</span>
                            </h1>
                            <div className="dropdown-content">
                                {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
                                    <label key={index}><input type="checkbox" /> {`${option} ${filterType}`} <span>12345</span></label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {isOpen && (
                    <div className="main-toggle">
                        <div className="btn-filters">
                            <button className='btn-reset'>Reset All</button>
                            <button className='btn-apply'>Apply</button>
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

export default ProductSection;
