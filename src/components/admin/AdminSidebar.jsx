import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="fixed w-64 bg-gray-800 text-white h-screen p-6 m-0">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/manage" className="hover:bg-gray-700 p-2 rounded">Manage Books</Link>
        <Link to="/admin/add" className="hover:bg-gray-700 p-2 rounded">Add Book</Link>
      </nav>
    </div>
  );
}
