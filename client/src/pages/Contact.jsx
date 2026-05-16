// client/src/pages/Contact.jsx
import { useState } from 'react';
import api from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      await api.post('/contact', form);
      setStatus({ loading: false, success: 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!', error: '' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: '',
        error: err.response?.data?.message || 'বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
      });
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '0.5rem' }}>যোগাযোগ করুন</h1>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '2.5rem' }}>
        আপনার প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="contact-grid">
        {/* Contact Info */}
        <div
          style={{
            backgroundColor: '#f1f8e9',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #c8e6c9',
          }}
        >
          <h2 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>আমাদের ঠিকানা</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <strong style={{ color: '#388e3c' }}>📍 অফিস:</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#444' }}>
              বিসমিল্লাহ সমবায় ট্রাস্ট<br />
              প্রধান কার্যালয়, ঢাকা, বাংলাদেশ
            </p>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <strong style={{ color: '#388e3c' }}>📞 ফোন:</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#444' }}>+৮৮০ ১৭০০ ০০০০০০</p>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <strong style={{ color: '#388e3c' }}>✉️ ইমেইল:</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#444' }}>info@bismillahtrust.org</p>
          </div>

          <div>
            <strong style={{ color: '#388e3c' }}>🕒 অফিস সময়:</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#444' }}>
              শনি - বৃহস্পতি: সকাল ৯টা - বিকাল ৫টা<br />
              শুক্রবার: বন্ধ
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #c8e6c9',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>বার্তা পাঠান</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#388e3c', fontWeight: '500' }}>
              নাম *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#388e3c', fontWeight: '500' }}>
              ইমেইল *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#388e3c', fontWeight: '500' }}>
              ফোন
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#388e3c', fontWeight: '500' }}>
              বিষয় *
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#388e3c', fontWeight: '500' }}>
              বার্তা *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {status.success && (
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '1px solid #a5d6a7',
              }}
            >
              {status.success}
            </div>
          )}

          {status.error && (
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: '#ffebee',
                color: '#c62828',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '1px solid #ef9a9a',
              }}
            >
              {status.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              backgroundColor: status.loading ? '#81c784' : '#2e7d32',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: status.loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {status.loading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  border: '1px solid #c8e6c9',
  borderRadius: '6px',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: 'inherit',
};