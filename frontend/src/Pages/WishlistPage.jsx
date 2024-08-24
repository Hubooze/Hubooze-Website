import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme, useMediaQuery } from '@mui/material/styles';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (!hasMore) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://192.168.1.109:3000/api/wishlist/getwishlist?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist([...wishlist, ...response.data.wishlist.products]);
      setHasMore(response.data.wishlist.products.length === 10);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://192.168.1.109:3000/api/wishlist/removefromwishlist', {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId }
      });
      setWishlist(wishlist.filter(item => item.productId._id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div>
      <h1>Your Wishlist</h1>
      <ul>
        {wishlist.map(item => (
          <li key={item.productId._id}>
            <h2>{item.productId.name}</h2>
            <p>Added on: {new Date(item.addedAt).toLocaleDateString()}</p>
            <button onClick={() => removeFromWishlist(item.productId._id)}>Remove</button>
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default WishlistPage;
