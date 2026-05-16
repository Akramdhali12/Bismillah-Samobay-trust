// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import {
//   FaSearch,
//   FaFilter,
//   FaEye,
//   FaClock,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSpinner,
//   FaFileAlt,
//   FaTimes,
//   FaCalendarAlt,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from 'react-icons/fa';
// import { AuthContext } from '../context/AuthContext';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// // Inject spinner keyframes once
// if (typeof document !== 'undefined' && !document.getElementById('spin-keyframes')) {
//   const style = document.createElement('style');
//   style.id = 'spin-keyframes';
//   style.innerHTML = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
//   document.head.appendChild(style);
// }

// const MyApplications = () => {
//   const { user } = useContext(AuthContext); // keep if you need it later
//   const [applications, setApplications] = useState([]);
//   const [filteredApplications, setFilteredApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [showModal, setShowModal] = useState(false);


//   const fetchApplications = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/applications/my-applications');
//       setApplications(response.data.applications || []);
//     } catch (error) {
//       console.error('Error fetching applications:', error);
//       toast.error('আবেদন লোড করতে সমস্যা হয়েছে');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchApplications();
//   }, [fetchApplications]);

//   // Filter inside useEffect to avoid stale closure
//   useEffect(() => {
//     let filtered = [...applications];

//     if (statusFilter !== 'all') {
//       filtered = filtered.filter((app) => app.status === statusFilter);
//     }

//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.programName?.toLowerCase().includes(term) ||
//           app.applicationId?.toLowerCase().includes(term) ||
//           app.fullName?.toLowerCase().includes(term)
//       );
//     }

//     setFilteredApplications(filtered);
//   }, [searchTerm, statusFilter, applications]);

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { bg: '#fff3cd', color: '#856404', icon: <FaClock />, text: 'অপেক্ষমাণ' },
//       approved: { bg: '#d4edda', color: '#155724', icon: <FaCheckCircle />, text: 'অনুমোদিত' },
//       rejected: { bg: '#f8d7da', color: '#721c24', icon: <FaTimesCircle />, text: 'প্রত্যাখ্যাত' },
//       under_review: {
//         bg: '#d1ecf1',
//         color: '#0c5460',
//         icon: <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />,
//         text: 'পর্যালোচনাধীন',
//       },
//     };

//     const config = statusConfig[status] || statusConfig.pending;

//     return (
//       <span
//         style={{
//           display: 'inline-flex',
//           alignItems: 'center',
//           gap: '6px',
//           padding: '6px 12px',
//           borderRadius: '20px',
//           backgroundColor: config.bg,
//           color: config.color,
//           fontSize: '13px',
//           fontWeight: '600',
//         }}
//       >
//         {config.icon}
//         {config.text}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('bn-BD', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const handleViewDetails = (app) => {
//     setSelectedApp(app);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedApp(null);
//     setShowModal(false);
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <FaSpinner style={{ fontSize: '40px', color: '#007bff', animation: 'spin 1s linear infinite' }} />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//       <div style={{ marginBottom: '24px' }}>
//         <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
//           আমার আবেদনসমূহ
//         </h1>
//         <p style={{ color: '#666', fontSize: '15px' }}>
//           আপনার সকল আবেদনের তালিকা এবং বর্তমান অবস্থা
//         </p>
//       </div>

//       <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
//         <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
//           <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
//           <input
//             type="text"
//             placeholder="প্রোগ্রাম, আইডি বা নাম দিয়ে খুঁজুন..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px 12px 10px 40px',
//               borderRadius: '8px',
//               border: '1px solid #ddd',
//               fontSize: '14px',
//               outline: 'none',
//             }}
//           />
//         </div>

//         <div style={{ position: 'relative', minWidth: '200px' }}>
//           <FaFilter style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px 12px 10px 40px',
//               borderRadius: '8px',
//               border: '1px solid #ddd',
//               fontSize: '14px',
//               outline: 'none',
//               backgroundColor: '#fff',
//               cursor: 'pointer',
//             }}
//           >
//             <option value="all">সকল অবস্থা</option>
//             <option value="pending">অপেক্ষমাণ</option>
//             <option value="under_review">পর্যালোচনাধীন</option>
//             <option value="approved">অনুমোদিত</option>
//             <option value="rejected">প্রত্যাখ্যাত</option>
//           </select>
//         </div>
//       </div>

//       {filteredApplications.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
//           <FaFileAlt style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }} />
//           <h3 style={{ color: '#666', marginBottom: '8px' }}>কোন আবেদন পাওয়া যায়নি</h3>
//           <p style={{ color: '#999', fontSize: '14px' }}>
//             আপনি এখনো কোন আবেদন জমা দেননি অথবা ফিল্টারের সাথে মিল নেই
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: 'grid', gap: '16px' }}>
//           {filteredApplications.map((app) => (
//             <div
//               key={app._id || app.applicationId}
//               style={{
//                 backgroundColor: '#fff',
//                 borderRadius: '12px',
//                 padding: '20px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//                 border: '1px solid #eee',
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
//                 <div style={{ flex: '1', minWidth: '250px' }}>
//                   <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
//                     {app.programName || 'প্রোগ্রাম নাম'}
//                   </h3>
//                   <p style={{ fontSize: '13px', color: '#666', margin: '2px 0' }}>
//                     আবেদন আইডি: <strong>{app.applicationId}</strong>
//                   </p>
//                   <p style={{ fontSize: '13px', color: '#666', margin: '2px 0' }}>
//                     জমা দেওয়ার তারিখ: {formatDate(app.createdAt)}
//                   </p>
//                 </div>
//                 <div>{getStatusBadge(app.status)}</div>
//               </div>

//               <div style={{ display: 'flex', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
//                 <button
//                   onClick={() => handleViewDetails(app)}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     padding: '8px 16px',
//                     backgroundColor: '#007bff',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                   }}
//                 >
//                   <FaEye /> বিস্তারিত দেখুন
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && selectedApp && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000,
//             padding: '20px',
//           }}
//           onClick={closeModal}
//         >
//           <div
//             style={{
//               backgroundColor: '#fff',
//               borderRadius: '12px',
//               maxWidth: '700px',
//               width: '100%',
//               maxHeight: '90vh',
//               overflow: 'auto',
//               padding: '24px',
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
//               <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#333', margin: 0 }}>
//                 আবেদনের বিস্তারিত
//               </h2>
//               <button
//                 onClick={closeModal}
//                 style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666', padding: '4px' }}
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             <div style={{ marginBottom: '20px' }}>
//               <div style={{ marginBottom: '12px' }}>{getStatusBadge(selectedApp.status)}</div>

//               <div style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
//                 <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
//                   প্রোগ্রাম তথ্য
//                 </h3>
//                 <p style={{ margin: '4px 0', fontSize: '14px' }}>
//                   <strong>আবেদন আইডি:</strong> {selectedApp.applicationId}
//                 </p>
//                 <p style={{ margin: '4px 0', fontSize: '14px' }}>
//                   <strong>প্রোগ্রাম:</strong> {selectedApp.programName}
//                 </p>
//                 <p style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <FaCalendarAlt style={{ color: '#007bff' }} />
//                   <strong>জমা দেওয়ার তারিখ:</strong> {formatDate(selectedApp.createdAt)}
//                 </p>
//                 {selectedApp.updatedAt && (
//                   <p style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                     <FaCalendarAlt style={{ color: '#007bff' }} />
//                     <strong>সর্বশেষ আপডেট:</strong> {formatDate(selectedApp.updatedAt)}
//                   </p>
//                 )}
//               </div>

//               <div style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
//                 <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
//                   ব্যক্তিগত তথ্য
//                 </h3>
//                 <p style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <FaUser style={{ color: '#007bff' }} />
//                   <strong>নাম:</strong> {selectedApp.fullName || 'N/A'}
//                 </p>
//                 <p style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <FaPhone style={{ color: '#007bff' }} />
//                   <strong>ফোন:</strong> {selectedApp.phone || 'N/A'}
//                 </p>
//                 <p style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <FaEnvelope style={{ color: '#007bff' }} />
//                   <strong>ইমেইল:</strong> {selectedApp.email || 'N/A'}
//                 </p>
//                 {selectedApp.address && (
//                   <p style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                     <FaMapMarkerAlt style={{ color: '#007bff' }} />
//                     <strong>ঠিকানা:</strong> {selectedApp.address}
//                   </p>
//                 )}
//               </div>

//               {selectedApp.adminNote && (
//                 <div style={{ backgroundColor: '#fff3cd', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid #ffeaa7' }}>
//                   <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#856404', marginBottom: '8px' }}>
//                     অ্যাডমিনের মন্তব্য
//                   </h3>
//                   <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>{selectedApp.adminNote}</p>
//                 </div>
//               )}

//               {selectedApp.rejectionReason && (
//                 <div style={{ backgroundColor: '#f8d7da', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid #f5c6cb' }}>
//                   <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#721c24', marginBottom: '8px' }}>
//                     প্রত্যাখ্যানের কারণ
//                   </h3>
//                   <p style={{ margin: 0, fontSize: '14px', color: '#721c24' }}>{selectedApp.rejectionReason}</p>
//                 </div>
//               )}
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
//               <button
//                 onClick={closeModal}
//                 style={{
//                   padding: '10px 20px',
//                   backgroundColor: '#6c757d',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                 }}
//               >
//                 বন্ধ করুন
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;