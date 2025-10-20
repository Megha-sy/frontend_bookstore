import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    language: "English",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    axios
      .get(`https://bookstore-backend-2-hy2f.onrender.com/api/books/get/${id}`)
      .then((res) => {
        if (res.data?.data) {
          const data = res.data.data;
          setForm({
            ...data,
            image: null,
            imagePreview: data.image
              ? `https://bookstore-backend-2-hy2f.onrender.com/uploads/${data.image}`
              : "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (key === "image" && form.image) formData.append("image", form.image);
      else if (key !== "imagePreview") formData.append(key, form[key]);
    }

    try {
      await axios.put(`https://bookstore-backend-2-hy2f.onrender.com/api/books/put/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Book updated successfully!");
      navigate("/admin/manage");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update book.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-100 flex items-center justify-center p-6">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/admin/manage")}
        className="absolute top-6 left-6 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md shadow-md transition transform hover:scale-105"
      >
        ⬅ Back
      </button>

      <div className="w-full max-w-5xl">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          ✏️ Update Book Details
        </h1>

        {/* Large Card Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-8 items-center"
          encType="multipart/form-data"
        >
          {/* Image */}
          <div className="flex-shrink-0 w-80 h-96 bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
            {form.imagePreview ? (
              <img
                src={form.imagePreview}
                alt={form.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          {/* Fields */}
          <div className="flex-1 w-full space-y-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
              required
            />
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
              required
            />
            <div className="flex gap-4">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
                required
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
                required
              >
                <option value="">Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biographies & Autobiographies">
                  Biographies & Autobiographies
                </option>
                <option value="Self-Help">Self-Help</option>
                <option value="Academic & Educational">Academic & Educational</option>
                <option value="Children's Books">Children's Books</option>
                <option value="Cookbooks">Cookbooks</option>
              </select>
            </div>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
            >
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
            </select>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
