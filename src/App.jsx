import "./App.css";
// import Footer from "./Reusblecomponents/Footer/Footer";
// import Header from "./Reusblecomponents/Header/Header";
import AppRoutes from "./routes"; // your route file

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 w-full">
      {/* Common Header */}
      {/* <Header /> */}

      {/* Main Content */}
      <main className="flex-1 w-full px-4 py-6">
        <AppRoutes />
      </main>

      {/* Common Footer */}
      {/* <Footer /> */}
    </div>
  );
}
