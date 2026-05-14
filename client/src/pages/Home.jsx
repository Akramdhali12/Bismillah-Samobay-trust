import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaGraduationCap, FaHouseDamage, FaUsers } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.heroTitle}>মানবতার সেবায় আপনাদের পাশে</h1>
          <p style={styles.heroSub}>
            নিম্ন-আয়ের পরিবার, অসহায় শিক্ষার্থী এবং দুর্যোগে ক্ষতিগ্রস্ত মানুষের পাশে দাঁড়াতে আমরা প্রতিশ্রুতিবদ্ধ।
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn-primary">আবেদন করুন</Link>
            <Link to="/about" className="btn-outline">আরও জানুন</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">আমাদের সেবাসমূহ</h2>
          <div style={styles.grid}>
            {services.map((s, i) => (
              <div key={i} className="card" style={styles.serviceCard}>
                <div style={styles.iconBox}>{s.icon}</div>
                <h3 style={{ color: 'var(--primary)', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: 12 }}>আপনিও হোন এই মানবিক উদ্যোগের অংশ</h2>
          <p style={{ color: '#e8f5e9', marginBottom: 20 }}>একসাথে আমরা অনেক জীবনে আলো ছড়াতে পারি।</p>
          <Link to="/contact" className="btn-primary" style={{ background: 'var(--white)', color: 'var(--primary)' }}>
            যোগাযোগ করুন
          </Link>
        </div>
      </section>
    </>
  );
}

const services = [
  { icon: <FaHandHoldingHeart />, title: 'অনুদান', desc: 'নিম্ন-আয়ের পরিবারের জন্য আর্থিক অনুদান প্রদান।' },
  { icon: <FaGraduationCap />, title: 'শিক্ষা সহায়তা', desc: 'অসচ্ছল মেধাবী শিক্ষার্থীদের জন্য শিক্ষাবৃত্তি।' },
  { icon: <FaHouseDamage />, title: 'জরুরি সাহায্য', desc: 'দুর্যোগে ক্ষতিগ্রস্তদের তাৎক্ষণিক সহায়তা।' },
  { icon: <FaUsers />, title: 'ঋণ মুক্তি', desc: 'অসহায় মানুষদের ঋণমুক্তিতে সহায়তা।' },
];

const styles = {
  hero: {
    background: 'linear-gradient(135deg, var(--primary-bg) 0%, #c8e6c9 100%)',
    padding: '80px 20px',
    textAlign: 'center',
  },
  heroTitle: { fontSize: 38, color: 'var(--primary)', marginBottom: 16 },
  heroSub: { fontSize: 17, color: 'var(--text-muted)', marginBottom: 28, maxWidth: 720, margin: '0 auto 28px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
  },
  serviceCard: { textAlign: 'center' },
  iconBox: {
    fontSize: 36,
    color: 'var(--primary)',
    background: 'var(--primary-bg)',
    width: 70,
    height: 70,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px',
  },
  cta: { background: 'var(--primary)', padding: '50px 20px' },
};