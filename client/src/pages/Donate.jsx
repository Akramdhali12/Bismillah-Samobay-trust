// client/src/pages/Donate.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Donate() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const { data } = await api.get('/recipients');
        setRecipients(data.recipients);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipients();
  }, []);

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '0.5rem' }}>দান করুন</h1>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '2.5rem' }}>
        আপনার সহযোগিতায় বদলে যেতে পারে অনেকের জীবন। নিচে আমাদের অনুমোদিত সাহায্যপ্রাপ্ত ব্যক্তিদের তালিকা দেওয়া হলো।
      </p>

      <div
        style={{
          backgroundColor: '#f1f8e9',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2.5rem',
          border: '1px solid #c8e6c9',
        }}
      >
        <h3 style={{ color: '#2e7d32', marginBottom: '0.75rem' }}>দান পাঠানোর মাধ্যম</h3>
        <p style={{ color: '#444', margin: '0.25rem 0' }}>📱 বিকাশ: ০১৭০০-০০০০০০ (পার্সোনাল)</p>
        <p style={{ color: '#444', margin: '0.25rem 0' }}>📱 নগদ: ০১৭০০-০০০০০০</p>
        <p style={{ color: '#444', margin: '0.25rem 0' }}>🏦 ব্যাংক: ইসলামী ব্যাংক, A/C: 0000000000</p>
      </div>

      <h2 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>অনুমোদিত সাহায্যপ্রাপ্তদের তালিকা</h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>লোড হচ্ছে...</p>
      ) : recipients.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>এই মুহূর্তে কোনো অনুমোদিত আবেদন নেই।</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {recipients.map((r) => (
            <div
              key={r._id}
              style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                border: '1px solid #c8e6c9',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>{r.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                <strong>প্রয়োজন:</strong> {r.needType}
              </p>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                <strong>পরিমাণ:</strong> ৳{r.amountNeeded}
              </p>
              <p style={{ color: '#444', fontSize: '0.9rem', marginTop: '0.75rem' }}>{r.description}</p>
              {r.contact && (
                <p style={{ color: '#388e3c', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                  <strong>যোগাযোগ:</strong> {r.contact}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}