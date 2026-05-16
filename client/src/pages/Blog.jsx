// client/src/pages/Blog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        setBlogs(data.blogs || data.data || []);
      } catch (err) {
        setError('ব্লগ লোড করতে সমস্যা হয়েছে।');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '3rem' }}>লোড হচ্ছে...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '3rem', color: '#c62828' }}>{error}</p>;

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '2.5rem' }}>আমাদের ব্লগ</h1>
      {blogs.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>এখনো কোনো ব্লগ পোস্ট নেই।</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #c8e6c9',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              {blog.image && (
                <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              )}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>{blog.title}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {new Date(blog.createdAt).toLocaleDateString('bn-BD')}
                </p>
                <p style={{ color: '#444', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  {blog.content.substring(0, 120)}...
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  style={{ color: '#2e7d32', fontWeight: '600', textDecoration: 'none' }}
                >
                  বিস্তারিত পড়ুন →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}