import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist books
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("https://bookstore-backend-2-hy2f.onrender.com/api/books/wishlist");
        setWishlist(res.data.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  // Remove from wishlist
  const removeFromWishlist = async (wishId) => {
    try {
      await axios.delete(`https://bookstore-backend-2-hy2f.onrender.com/api/books/wishlist/${wishId}`);
      setWishlist((prev) => prev.filter((item) => item._id !== wishId));
      alert("Removed from wishlist!");
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return (
    <div className="wishlist-page">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="empty-msg">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const book = item.book; // populated book
            return (
              <div key={item._id} className="wishlist-card">
                {book?.image ? (
                  <img
                    src={`https://bookstore-backend-2-hy2f.onrender.com/uploads/${book.image}`}
                    alt={book.title}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <h3>{book?.title}</h3>
                <p className="author">by {book?.author}</p>
                <p className="price">₹{book?.price}</p>

                <button
                  className="remove-btn1"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove ❌
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
