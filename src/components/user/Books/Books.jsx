import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Books.css';

function Books() {
  const [booksData, setBooksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filterRef = useRef(null);
  const bookRefs = useRef({});
  const location = useLocation();
  const selectedBookId = location.state?.selectedBookId || null;

  const categories = [
    "All", "Fiction", "Non-Fiction", "Biographies & Autobiographies",
    "Self-Help", "Academic & Educational", "Children's Books", "Cookbooks"
  ];
  const languages = ["All", "English", "Malayalam"];
  const ratings = [5, 4, 3, 2, 1];
  const priceRanges = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under ₹200", min: 0, max: 200 },
    { label: "₹200 - ₹300", min: 201, max: 300 },
    { label: "₹300 - ₹400", min: 301, max: 400 },
    { label: "₹400 - ₹500", min: 401, max: 500 },
    { label: "Above ₹500", min: 501, max: Infinity }
  ];

  // Fetch books, cart, wishlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://bookstore-backend-2-hy2f.onrender.com/api/books/get");
        setBooksData(res.data.data || []);

        const cartRes = await axios.get("https://bookstore-backend-2-hy2f.onrender.com/api/books/cart");
         setCartItems(cartRes.data.data || []);
      const wishRes = await axios.get("https://bookstore-backend-2-hy2f.onrender.com/api/books/wishlist");
      setWishlist(wishRes.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Click outside filter closes it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to selected book if passed in state
  useEffect(() => {
    if (selectedBookId && bookRefs.current[selectedBookId]) {
      bookRefs.current[selectedBookId].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedBookId]);

 const addToCart = async (book) => {
  try {
    const res = await axios.post("https://bookstore-backend-2-hy2f.onrender.com/api/books/cart", {
      bookId: book._id,
    });

    if (res.data.success) {
      setCartItems((prev) => [...prev, res.data.data]);
      alert(`${book.title} added to cart!`);// ✅ add new book to state
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};


 const toggleWishlist = async (book) => {
  const inWishlist = wishlist.some(item => item.book?._id === book._id);

  try {
    if (inWishlist) {
      // Remove from wishlist
      const itemToRemove = wishlist.find(item => item.book._id === book._id);
      await axios.delete(`https://bookstore-backend-2-hy2f.onrender.com/api/books/wishlist/${itemToRemove._id}`);
      setWishlist(prev => prev.filter(item => item.book._id !== book._id));
      alert(`${book.title} removed from wishlist`);
    } else {
      // Add to wishlist
      const res = await axios.post("https://bookstore-backend-2-hy2f.onrender.com/api/books/wishlist", { bookId: book._id });
      if (res.data.success) {
        setWishlist(prev => [...prev, res.data.data]);
        alert(`${book.title} added to wishlist`);
      }
    }
  } catch (err) {
    console.error("Error toggling wishlist:", err);
  }
};


  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "All" || book.language === selectedLanguage;
    const priceRange = priceRanges.find(range => range.label === selectedPriceRange) || priceRanges[0];
    const matchesPrice = book.price >= priceRange.min && book.price <= priceRange.max;
    const matchesRating = selectedRating === 0 || book.rating >= selectedRating;
    return matchesSearch && matchesCategory && matchesLanguage && matchesPrice && matchesRating;
  });

  return (
    <div className="books-page">
      <h2 className="books-heading">Explore Our Bookstore</h2>

      {/* SEARCH + FILTER */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search books by title..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="filter-container" ref={filterRef}>
          <button className="filter-icon" onClick={() => setShowFilterMenu(!showFilterMenu)}>☰</button>
          {showFilterMenu && (
            <div className="filter-popup">
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select value={selectedPriceRange} onChange={e => setSelectedPriceRange(e.target.value)}>
                {priceRanges.map(range => <option key={range.label} value={range.label}>{range.label}</option>)}
              </select>

              <select value={selectedRating} onChange={e => setSelectedRating(Number(e.target.value))}>
                <option value={0}>All Ratings</option>
                {ratings.map(rate => <option key={rate} value={rate}>{rate}★ & up</option>)}
              </select>
            </div>
          )}
        </div>

        <div className="language-toggle">
          {languages.map(lang => (
            <button
              key={lang}
              className={`toggle-btn ${selectedLanguage === lang ? "active" : ""}`}
              onClick={() => setSelectedLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* BOOKS GRID */}
      <div className="books-grid">
        {filteredBooks.length > 0 ? filteredBooks.map(book => {
         const inCart = cartItems.some(item => item.book?._id === book._id);
          const inWishlist = wishlist.some(item => item.book?._id === book._id);

          return (
        <div key={book._id} ref={el => bookRefs.current[book._id] = el} className="book-card">
              <div className="wishlist-icon" onClick={() => toggleWishlist(book)}>
                {inWishlist ? "❤️" : "🤍"}
              </div>
              {book.image ? <img src={`https://bookstore-backend-2-hy2f.onrender.com/uploads/${book.image}`} alt={book.title} /> : <div className="no-image">No Image</div>}
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="price">₹{book.price}</p>
              <p className="language">{book.language}</p>
              <div className="rating">
                {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
              </div>
              <button className="edit-btn" onClick={() => addToCart(book)} disabled={inCart}>
                {inCart ? "Added" : "Add to Cart"}
              </button>
            </div>
          );
        }) : <p className="no-results">No books found</p>}
      </div>
    </div>
  );
}

export default Books;
