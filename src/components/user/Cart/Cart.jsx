import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books/cart");
        setCartItems(res.data.data || []); // ✅ backend returns 'data'
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/cart/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map((item) =>
        axios.delete(`http://localhost:5000/api/books/cart/${item._id}`)
      ));
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) } : item
      )
    );
  };

 const totalPrice = cartItems.reduce(
  (acc, item) => acc + (item.book?.price || 0) * (item.quantity || 1),
  0
);


  const handleBuyNow = () => {
    alert(`🛒 Order placed!\nTotal: ₹${totalPrice}`);
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item) => (
        <div className="cart-item" key={item._id}>
         <img src={item.book?.image ? `http://localhost:5000/uploads/${item.book.image}` : ""}alt={item.book?.title}/>

          <div className="cart-item-content">
           <h3>{item.book?.title}</h3>
            <p><strong>Author:</strong> {item.book?.author}</p>
            <p><strong>Category:</strong> {item.book?.category}</p>
            <p><strong>Language:</strong> {item.book?.language}</p>
            <p><strong>Price:</strong> ₹{item.book?.price}</p>

            <div className="count">
              <button onClick={() => increment(item._id)} className="increment">+</button>
              <p>{item.quantity || 1}</p>
              <button onClick={() => decrement(item._id)} className="decrement">-</button>
            </div>

            <button onClick={() => removeFromCart(item._id)} className="remove-btn">
              Remove
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <h3>Total: ₹{totalPrice}</h3>
          <div className="buttons">
            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
            <button onClick={handleBuyNow} className="buy-btn">Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
