import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      'আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।'
    );

    setForm({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">যোগাযোগ করুন</h2>

        <div style={styles.grid}>
          {/* Contact Info */}
          <div className="card">
            <h3 style={styles.heading}>আমাদের তথ্য</h3>

            <p style={styles.info}>
              <FaMapMarkerAlt style={styles.icon} />
              ঢাকা, বাংলাদেশ
            </p>

            <p style={styles.info}>
              <FaPhone style={styles.icon} />
              +৮৮০ ১৭xx-xxxxxx
            </p>

            <p style={styles.info}>
              <FaEnvelope style={styles.icon} />
              info@bismillahtrust.org
            </p>

            <p style={styles.description}>
              যেকোনো প্রশ্ন বা সহায়তার প্রয়োজনে আমাদের সাথে নির্দ্বিধায়
              যোগাযোগ করুন।
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
              <label>আপনার নাম</label>

              <input
                type="text"
                placeholder="আপনার নাম লিখুন"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>ইমেইল</label>

              <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>বার্তা</label>

              <textarea
                rows="5"
                placeholder="আপনার বার্তা লিখুন"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={styles.button}
            >
              বার্তা পাঠান
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24,
    marginTop: 30,
  },

  heading: {
    color: 'var(--primary)',
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 700,
  },

  info: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    color: 'var(--text)',
    fontSize: 16,
  },

  icon: {
    color: 'var(--primary)',
    fontSize: 18,
  },

  description: {
    marginTop: 20,
    color: 'var(--text-muted)',
    fontSize: 14,
    lineHeight: 1.7,
  },

  button: {
    width: '100%',
    marginTop: 10,
  },
};