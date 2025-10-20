import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import BookList from "../../components/admin/BookList";

export default function AdminDashboard() {
  return (
    <div className=" flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">📚 Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link
            to="/admin/add"
            className="px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add Book
          </Link>
          <Link
            to="/admin/manage"
            className="px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Manage Books
          </Link> */}
        {/* </nav>
      </aside> */}
      <AdminSidebar/>

      {/* Main Content */}
      <main className="ml-60 flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Hero / Banner */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <img
              src="assets\admin\adminbanner.jpg"
              alt="Admin Dashboard Banner"
              className="w-full h-90 object-cover"
            />
          </div>

          {/* Manage Books Section */}
          <BookList/>
        </div>
      </main>
    </div>
  );
}
