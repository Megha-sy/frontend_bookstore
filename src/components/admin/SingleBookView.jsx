import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SingleBookView() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://bookstore-backend-2-hy2f.onrender.com/api/books/get/${id}`)
      .then((res) => setBook(res.data.data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  if (!book)
    return (
      <p className="text-center mt-20 text-gray-600 text-lg">
        Loading book details...
      </p>
    );

  return (
    <div className="flex">
         <button
          onClick={() => navigate("/admin")}
          className="absolute top-8 left-20 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg shadow-md transition text-sm md:text-base"
        >
          ⬅ Back
        </button>
      <div className="ml-84 p-7 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen relative">
        {/* Back Button — fixed at top left */}
       

        {/* Book Card */}
        <div className="mt-10 flex justify-center items-center">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center transform transition hover:scale-[1.01]">
            <img
              src={`https://bookstore-backend-2-hy2f.onrender.com/uploads/${book.image}`}
              alt={book.title}
              className="w-80 h-[32rem] object-cover rounded-2xl shadow-lg"
            />

            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                {book.title}
              </h2>
              <p className="text-lg text-gray-700 mb-3">
                ✍️ <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p className="text-lg text-gray-700 mb-3">
                📚 <span className="font-semibold">Category:</span>{" "}
                {book.category}
              </p>
              <p className="text-lg text-gray-700 mb-3">
                🌐 <span className="font-semibold">Language:</span>{" "}
                {book.language}
              </p>
              <p className="text-2xl text-blue-700 font-bold mt-5">
                💰 ₹{book.price}
              </p>
              <p className="text-sm text-gray-500 mt-6">
                Added on: {new Date(book.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
