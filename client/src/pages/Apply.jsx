// client/src/pages/Apply.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';


const Apply = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    nidNumber: '',
    needType: '',
    amount: '',
    description: '',
    familyMembers: '',
    monthlyIncome: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const needTypes = [
    { value: 'medical', label: 'চিকিৎসা সহায়তা' },
    { value: 'education', label: 'শিক্ষা সহায়তা' },
    { value: 'food', label: 'খাদ্য সহায়তা' },
    { value: 'housing', label: 'বাসস্থান সহায়তা' },
    { value: 'business', label: 'ব্যবসায়িক সহায়তা' },
    { value: 'emergency', label: 'জরুরি সহায়তা' },
    { value: 'other', label: 'অন্যান্য' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('আবেদন করতে হলে প্রথমে লগইন করুন।');
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.nidNumber ||
      !formData.needType ||
      !formData.amount ||
      !formData.description
    ) {
      setError('অনুগ্রহ করে সকল আবশ্যক তথ্য পূরণ করুন।');
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError('অনুগ্রহ করে সঠিক পরিমাণ লিখুন।');
      return;
    }

    try {
      setLoading(true);
      await api.post('/applications', {
        ...formData,
        amount: Number(formData.amount),
        familyMembers: Number(formData.familyMembers) || 0,
        monthlyIncome: Number(formData.monthlyIncome) || 0,
      });

      setSuccess('আপনার আবেদন সফলভাবে জমা হয়েছে। শীঘ্রই আপনাকে জানানো হবে।');

      setTimeout(() => {
        navigate('/my-applications');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
      );
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '40px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const subtitleStyle = {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '30px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: loading ? '#9ca3af' : '#1e3a8a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '10px',
  };

  const alertStyle = (type) => ({
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    background: type === 'error' ? '#fee2e2' : '#d1fae5',
    color: type === 'error' ? '#991b1b' : '#065f46',
    border: `1px solid ${type === 'error' ? '#fca5a5' : '#6ee7b7'}`,
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>সহায়তার আবেদন</h1>
        <p style={subtitleStyle}>
          নিচের ফর্মটি পূরণ করে আপনার আবেদন জমা দিন। সকল তথ্য সঠিকভাবে প্রদান করুন।
        </p>

        {error && <div style={alertStyle('error')}>{error}</div>}
        {success && <div style={alertStyle('success')}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={rowStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>পূর্ণ নাম *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>মোবাইল নম্বর *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>ঠিকানা *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={inputStyle}
              placeholder="গ্রাম, পোস্ট, উপজেলা, জেলা"
              required
            />
          </div>

          <div style={rowStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>জাতীয় পরিচয়পত্র নম্বর *</label>
              <input
                type="text"
                name="nidNumber"
                value={formData.nidNumber}
                onChange={handleChange}
                style={inputStyle}
                placeholder="NID নম্বর লিখুন"
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>সহায়তার ধরন *</label>
              <select
                name="needType"
                value={formData.needType}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">-- নির্বাচন করুন --</option>
                {needTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>প্রয়োজনীয় পরিমাণ (টাকা) *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                style={inputStyle}
                placeholder="যেমন: 5000"
                min="1"
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>পরিবারের সদস্য সংখ্যা</label>
              <input
                type="number"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                style={inputStyle}
                placeholder="যেমন: 4"
                min="0"
              />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>মাসিক আয় (টাকা)</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              style={inputStyle}
              placeholder="যেমন: 10000"
              min="0"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>বিস্তারিত বিবরণ *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={textareaStyle}
              placeholder="আপনার সমস্যা ও সহায়তার প্রয়োজনীয়তা বিস্তারিতভাবে লিখুন..."
              required
            />
          </div>

          <div
            style={{
              padding: '16px',
              background: '#fef3c7',
              border: '1px solid #fcd34d',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#92400e',
            }}
          >
            <strong>দ্রষ্টব্য:</strong> আবেদন জমা দেওয়ার পর আমাদের প্রতিনিধি যাচাই
            করে আপনার সাথে যোগাযোগ করবে। মিথ্যা তথ্য প্রদান করলে আবেদন বাতিল হবে।
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'জমা হচ্ছে...' : 'আবেদন জমা দিন'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;