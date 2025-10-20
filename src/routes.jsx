import { Routes, Route } from "react-router-dom";


import AddBook from "./components/admin/AddBook";
import UpdateBook from "./components/admin/UpdateBook";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Home from "./Pages/user/Home/Home";
import Cartpage from "./Pages/user/Cart/Cartpage";
import Signuppage from "./Pages/user/Signup/Signuppage";
import ManageBooks from "./Pages/admin/ManageBooks";
import Loginpage from "./Pages/user/Loginpage/Loginpage";
import About from "./Pages/user/About/About";
import Bookspage from "./Pages/user/Books/Bookspage";
import AdminSidebar from "./components/admin/AdminSidebar";
import BookList from "./components/admin/BookList";
import SingleBookView from "./components/admin/SingleBookView";
import Wishlistpage from "./Pages/user/wishlist/Wishlistpage";

export default function AppRoutes() {
  return (
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/book/:id" element={<ManageBooks/>} />
        <Route path="/Cartpage" element={<Cartpage />} />
        <Route path="/wishlist" element={<Wishlistpage />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Bookspage" element={<Bookspage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage" element={<ManageBooks />} />
        <Route path="/admin/sidebar" element={<AdminSidebar />} />
        <Route path="/admin/add" element={<AddBook />} />
        <Route path="/admin/put/:id" element={<UpdateBook />} />
        <Route path="/admin/list" element={<BookList />} />
        <Route path="/admin/book/:id" element={<SingleBookView/>} />
      </Routes>
  );
}
