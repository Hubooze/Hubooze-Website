// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext';
// import { useParams } from 'react-router-dom';
// import Breadcrum from '../Component/Breadcrum/Breadcrum';
// import ProductDisplay from '../Component/Product_display/ProductDisplay';
// import DiscriptionBox from '../Component/DiscriptionBox/DiscriptionBox';
// import RelatedProduct from '../Component/RelatedProducts/RelatedProduct';
// const Product = () => {
//   const {all_product}=useContext(ShopContext);
//   const {ProductId}=useParams();
//   const product=all_product.find((e)=>e.id===Number(ProductId))
//   return (
//     <div>
//       <Breadcrum product={product} />
//       < ProductDisplay  product={product}/>
//       <DiscriptionBox />
//       <RelatedProduct />
//     </div>
//   )
// }

// export default Product


// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// // import productData from './ProductData'; // Import your static data
// import './CSS/Product.css'; // Import CSS for styling

// const Product = () => {
//   // Retrieve the product ID from the URL parameters
//   const { ProductId } = useParams();

//   // Find the product with the matching ID from static data
//   // const product = productData.find(item => item.id === ProductId);

//   // State to manage the currently selected image
//   const [selectedImage, setSelectedImage] = useState('');

//   // Set the initial selected image if product exists
//   React.useEffect(() => {
//     if (product) {
//       setSelectedImage(product.images[0]);
//     }
//   }, [product]);

//   // Handle image click to update the main image
//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   // Ensure the product exists, otherwise return a not found message
//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   // Return the component JSX
//   return (
//     <div className="product-page">
//       <div className="product-header">
//         <div className="product-images">
//           {/* Main image */}
//           <img className="main-image" src={selectedImage} alt={`${product.name} Main`} />

//           {/* Thumbnail images */}
//           <div className="small-images">
//             {product.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`${product.name} ${index + 1}`}
//                 className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
//                 onClick={() => handleImageClick(image)}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="product-info">
//           <hr />
//           <h1>{product.name}</h1>
//           <div className='product-info-prices'> <p className="price">₹{product.new_price.toFixed(2)}</p>
//             <h3 className="old-price">₹{product.old_price.toFixed(2)}</h3></div>
//           <p className="description">{product.description}</p>
//           <hr />
//           <div className="product-info-sizes">
//             <span className="size">Sizes:</span>
//             {product.size.map((size, index) => (
//               <span key={index} className="size-item">{size}</span>
//             ))}
//           </div>
//           <hr />
//           <div className='delivery'>
//             <ul>
//               <li><span class="material-symbols-outlined">
//                 local_shipping
//               </span> <p>Fast <b>2 Days</b> Delivery</p></li>

//               <li><span class="material-symbols-outlined">
//                 event_repeat
//               </span> <p>Easy <b>90</b> Days return</p></li>
//             </ul>
//           </div>
//           <hr />
//           <div className='payment'>
//             <h4>Payment</h4>
//             <ul>
//               <li>Card</li>
//               <li>UPI</li>
//             </ul>
//           </div>
//           <hr />
//           <div className='buttons-outer' >
//         <div className='buttons'>
//           <ul>
//             <li><span class="material-symbols-outlined">
//               <span class="material-symbols-outlined">
//                 favorite
//               </span>
//             </span> </li>
//           </ul>
//           <button><h2>Buy Now</h2></button>
//           <button><h2>Add to Cart</h2></button>
//         </div>
//       </div>
//         </div>
        
//       </div>
//       {/* <div className='buttons-outer' >
//         <div className='buttons'>
//           <ul>
//             <li><span class="material-symbols-outlined">
//               <span class="material-symbols-outlined">
//                 favorite
//               </span>
//             </span> </li>
//           </ul>
//           <button><h2>Buy Now</h2></button>
//           <button><h2>Add to Cart</h2></button>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export default Product;
