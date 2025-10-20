import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books/get/")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/books/delete/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (<>
        <AdminSidebar/>

    <div className="ml-64 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-10">
    
      <div className=" flex justify-between items-center mb-10">
        <h2 className="ml-94 text-4xl font-extrabold text-gray-800 tracking-tight">
          📚 Manage Your Books
        </h2>
        
      </div>

      {/* Book Cards */}
      {books.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No books available yet.
        </p>
      ) : (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* Book Image */}
              <div className="relative w-full h-60 overflow-hidden">
                {book.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200">
                    No Image
                  </div>
                )}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white text-sm px-3 py-1 rounded-tr-lg">
                  {book.language}
                </div>
              </div>

              {/* Book Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  ✍️ {book.author}
                </p>
                <p className="text-sm text-gray-500">
                  📖 <span className="font-medium">{book.category}</span>
                </p>
                <p className="text-blue-700 font-semibold mt-2 text-lg">
                  ₹{book.price}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/admin/put/${book._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md text-sm transition transform hover:scale-105"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition transform hover:scale-105"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
