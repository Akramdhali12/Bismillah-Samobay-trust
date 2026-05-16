import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Blog from './pages/Blog';
// import BlogDetail from './pages/BlogDetail';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Apply from './pages/Apply';
// import MyApplications from './pages/MyApplications';

// import AdminDashboard from './pages/admin/AdminDashboard';
// import ManageApplications from './pages/admin/ManageApplications';
// import ManageRecipients from './pages/admin/ManageRecipients';
// import ManageBlogs from './pages/admin/ManageBlogs';
// import CreateAdmin from './pages/admin/CreateAdmin';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/blog/:id" element={<BlogDetail />} /> */}
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 

          <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
          {/* <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} /> */}

          {/* <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/applications" element={<AdminRoute><ManageApplications /></AdminRoute>} />
          <Route path="/admin/recipients" element={<AdminRoute><ManageRecipients /></AdminRoute>} />
          <Route path="/admin/blogs" element={<AdminRoute><ManageBlogs /></AdminRoute>} />
          <Route path="/admin/create-admin" element={<AdminRoute><CreateAdmin /></AdminRoute>} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}