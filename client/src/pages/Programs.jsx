import { FaHandHoldingUsd, FaBookReader, FaFirstAid, FaPeopleCarry } from 'react-icons/fa';

const programs = [
  {
    icon: <FaHandHoldingUsd />,
    title: 'অনুদান কর্মসূচি',
    desc: 'নিম্ন-আয়ের পরিবারগুলোর মৌলিক চাহিদা পূরণে নিয়মিত আর্থিক অনুদান প্রদান করা হয়।',
  },
  {
    icon: <FaBookReader />,
    title: 'শিক্ষা বৃত্তি',
    desc: 'মেধাবী কিন্তু অসচ্ছল শিক্ষার্থীদের জন্য শিক্ষাবৃত্তি, বই এবং শিক্ষা উপকরণ সরবরাহ।',
  },
  {
    icon: <FaFirstAid />,
    title: 'জরুরি সহায়তা',
    desc: 'বন্যা, ঘূর্ণিঝড়, ভূমিকম্পসহ যেকোনো দুর্যোগে ক্ষতিগ্রস্তদের তাৎক্ষণিক সহায়তা।',
  },
  {
    icon: <FaPeopleCarry />,
    title: 'ঋণ মুক্তি কর্মসূচি',
    desc: 'উচ্চ সুদের ঋণে জর্জরিত পরিবারগুলোকে ঋণমুক্ত করতে আর্থিক সহায়তা প্রদান।',
  },
];

export default function Programs() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">আমাদের প্রোগ্রামসমূহ</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto 40px' }}>
          আমরা বিভিন্ন ধরনের কর্মসূচির মাধ্যমে সমাজের অসহায় মানুষদের পাশে দাঁড়াই।
        </p>

        <div style={styles.grid}>
          {programs.map((p, i) => (
            <div key={i} className="card" style={styles.card}>
              <div style={styles.iconBox}>{p.icon}</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 24,
  },
  card: { textAlign: 'center', padding: 30 },
  iconBox: {
    fontSize: 40,
    color: 'var(--primary)',
    background: 'var(--primary-bg)',
    width: 80,
    height: 80,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
};