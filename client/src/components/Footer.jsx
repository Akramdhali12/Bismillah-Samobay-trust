import { Link } from 'react-router-dom';
import { FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.grid}>
        <div>
          <h3 style={styles.heading}>বিসমিল্লাহ সমবায় ট্রাস্ট</h3>
          <p style={styles.text}>
            নিম্ন-আয়ের পরিবার, শিক্ষার্থী এবং দুর্যোগে ক্ষতিগ্রস্তদের আর্থিক সহায়তা প্রদানে প্রতিশ্রুতিবদ্ধ।
          </p>
        </div>

        <div>
          <h4 style={styles.heading}>দ্রুত লিংক</h4>
          <ul style={styles.list}>
            <li><Link to="/about">আমাদের সম্পর্কে</Link></li>
            <li><Link to="/programs">প্রোগ্রাম</Link></li>
            <li><Link to="/donate">সাহায্যপ্রাপ্ত তালিকা</Link></li>
            <li><Link to="/contact">যোগাযোগ</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={styles.heading}>যোগাযোগ</h4>
          <p style={styles.text}><FaMapMarkerAlt /> ঢাকা, বাংলাদেশ</p>
          <p style={styles.text}><FaPhone /> +৮৮০ ১৭xx-xxxxxx</p>
          <p style={styles.text}><FaEnvelope /> info@bismillahtrust.org</p>
          <p style={styles.text}><FaFacebook /> facebook.com/bismillahtrust</p>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} বিসমিল্লাহ সমবায় ট্রাস্ট। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}

const styles = {
  footer: { background: 'var(--primary-bg)', marginTop: 40, paddingTop: 40 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 30,
  },
  heading: { color: 'var(--primary)', marginBottom: 12 },
  text: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 },
  bottom: { textAlign: 'center', padding: 16, marginTop: 30, borderTop: '1px solid #c8e6c9', fontSize: 13, color: 'var(--text-muted)' },
};