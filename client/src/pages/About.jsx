export default function About() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">আমাদের সম্পর্কে</h2>

        <div style={{ maxWidth: 850, margin: '0 auto' }}>
          <p style={{ marginBottom: 16, fontSize: 16, color: 'var(--text-muted)' }}>
            <strong>বিসমিল্লাহ সমবায় ট্রাস্ট</strong> একটি অলাভজনক সংস্থা, যা সমাজের পিছিয়ে পড়া মানুষদের জীবন বদলে দিতে নিরলসভাবে কাজ করে যাচ্ছে। আমরা বিশ্বাস করি, মানবতার সেবা সবচেয়ে বড় ইবাদত।
          </p>

          <div style={styles.grid}>
            <div className="card">
              <h3 style={styles.heading}>আমাদের লক্ষ্য</h3>
              <p style={styles.text}>
                দরিদ্র, অসহায় ও দুর্যোগে ক্ষতিগ্রস্ত মানুষদের আর্থিক ও সামাজিক সহায়তা প্রদান করে তাদের আত্মনির্ভরশীল করে গড়ে তোলা।
              </p>
            </div>

            <div className="card">
              <h3 style={styles.heading}>আমাদের দৃষ্টিভঙ্গি</h3>
              <p style={styles.text}>
                একটি বৈষম্যহীন, সহানুভূতিশীল সমাজ গড়ে তোলা, যেখানে প্রতিটি মানুষ সম্মানের সাথে বেঁচে থাকতে পারে।
              </p>
            </div>

            <div className="card">
              <h3 style={styles.heading}>আমাদের মূল্যবোধ</h3>
              <p style={styles.text}>
                স্বচ্ছতা, জবাবদিহিতা, মানবিকতা এবং নিষ্ঠা—এই চারটি স্তম্ভের উপর গড়ে উঠেছে আমাদের প্রতিটি কার্যক্রম।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
    marginTop: 30,
  },
  heading: { color: 'var(--primary)', marginBottom: 10 },
  text: { color: 'var(--text-muted)', fontSize: 15 },
};