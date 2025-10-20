import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books/get")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="flex">
        
      <div className="  p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          📖 All Books
        </h1>

        {books.length === 0 ? (
          <p className="text-center text-gray-500">No books available.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="w-full h-56 bg-gray-200 overflow-hidden">
                  {book.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${book.image}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">✍️ {book.author}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    📚 {book.category}
                  </p>
                  <p className="text-blue-700 font-semibold">₹{book.price}</p>

                  <div className="mt-4 text-center">
                    <Link
                      to={`/admin/book/${book._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
                      👁️ View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
