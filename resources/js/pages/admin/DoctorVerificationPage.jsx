import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const verificationStatusColors = {
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
    verified: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
};

export default function DoctorVerificationPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('verified');
    const [verificationNotes, setVerificationNotes] = useState('');
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        loadPendingDoctors();
    }, []);

    const loadPendingDoctors = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/pending-doctors');
            setDoctors(res.data.data ?? []);
        } catch (err) {
            toast.error('Failed to load pending doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!selectedDoctor) return;
        setVerifying(true);
        try {
            await api.post('/admin/verify-doctor', {
                doctor_id: selectedDoctor._id,
                status: verificationStatus,
                notes: verificationNotes || undefined,
            });
            toast.success(`Doctor ${verificationStatus} successfully!`);
            setShowModal(false);
            setSelectedDoctor(null);
            setVerificationStatus('verified');
            setVerificationNotes('');
            loadPendingDoctors();
        } catch (err) {
            toast.error(err.response?.data?.message ?? 'Verification failed');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="space-y-6 p-6 max-w-7xl">
            {/* Header */}
            <div>
                <h1 className="page-title">Doctor Verification</h1>
                <p className="page-subtitle">Review and verify pending doctor accounts.</p>
            </div>

            {/* Pending Doctors List */}
            <div className="card overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : doctors.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>No pending doctor verifications</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Medical License</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Specialization</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Applied</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {doctors.map(doctor => (
                                    <tr key={doctor._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{doctor.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{doctor.email}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">{doctor.medical_license}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{doctor.specialization}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                            {new Date(doctor.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <button
                                                onClick={() => {
                                                    setSelectedDoctor(doctor);
                                                    setShowModal(true);
                                                }}
                                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Verification Modal */}
            {showModal && selectedDoctor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-6">
                        {/* Doctor Info */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verify Doctor Account</h2>

                            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Name</p>
                                    <p className="font-semibold text-slate-900 dark:text-white mt-1">{selectedDoctor.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                                    <p className="font-semibold text-slate-900 dark:text-white mt-1">{selectedDoctor.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Medical License</p>
                                    <p className="font-semibold text-slate-900 dark:text-white mt-1 font-mono">{selectedDoctor.medical_license}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Specialization</p>
                                    <p className="font-semibold text-slate-900 dark:text-white mt-1">{selectedDoctor.specialization}</p>
                                </div>
                                {selectedDoctor.qualifications && (
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Qualifications</p>
                                        <p className="text-sm text-slate-900 dark:text-white mt-1">{selectedDoctor.qualifications}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Verification Decision */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Decision</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['verified', 'rejected'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setVerificationStatus(status)}
                                            className={`py-2 rounded-lg font-medium text-sm transition-all ${
                                                verificationStatus === status
                                                    ? status === 'verified'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-red-600 text-white'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            {status === 'verified' ? '✅ Verify' : '❌ Reject'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                    {verificationStatus === 'rejected' ? 'Rejection Reason (Required)' : 'Notes (Optional)'}
                                </label>
                                <textarea
                                    value={verificationNotes}
                                    onChange={(e) => setVerificationNotes(e.target.value)}
                                    placeholder={verificationStatus === 'rejected' ? 'Why are you rejecting this doctor?' : 'Add any notes...'}
                                    className="input-base w-full resize-none"
                                    rows={3}
                                    required={verificationStatus === 'rejected'}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 btn btn-secondary"
                                disabled={verifying}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerify}
                                disabled={verifying || (verificationStatus === 'rejected' && !verificationNotes)}
                                className={`flex-1 btn ${verificationStatus === 'verified' ? 'btn-primary' : 'bg-red-600 hover:bg-red-700 text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {verifying ? 'Processing...' : `${verificationStatus === 'verified' ? 'Verify' : 'Reject'} Doctor`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
