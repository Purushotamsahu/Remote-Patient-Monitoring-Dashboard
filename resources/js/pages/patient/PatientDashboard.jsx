import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestMetric, fetchRecentMetrics, selectRecent } from '../../redux/slices/metricsSlice';
import { fetchAlerts, selectLiveAlerts } from '../../redux/slices/alertSlice';
import { usePatientChannel } from '../../hooks/useRealtimeChannels';
import MetricCard from '../../components/ui/MetricCard';
import LiveChart from '../../components/ui/LiveChart';
import AlertBadge from '../../components/ui/AlertBadge';
import { selectUser } from '../../redux/slices/authSlice';

const CHART_FIELDS = [
    { key: 'heart_rate',  label: 'Heart Rate',  color: '#ef4444' },
    { key: 'spo2',        label: 'SpO₂ %',      color: '#3b82f6' },
    { key: 'temperature', label: 'Temp °F',     color: '#f59e0b' },
];

export default function PatientDashboard() {
    const dispatch   = useDispatch();
    const user       = useSelector(selectUser);
    const recent     = useSelector(selectRecent);
    const { items: alerts } = useSelector((s) => s.alerts);
    const liveAlerts = useSelector(selectLiveAlerts);
    const patientId  = user?.patient_profile?._id;
    const latest     = useSelector((s) => s.metrics.latestByPatient[patientId]);

    usePatientChannel(patientId);

    useEffect(() => {
        if (patientId) {
            dispatch(fetchLatestMetric(patientId));
            dispatch(fetchRecentMetrics(patientId));
            dispatch(fetchAlerts({ patient_id: patientId }));
        }
    }, [patientId, dispatch]);

    const allAlerts = [...liveAlerts, ...alerts].slice(0, 5);

    return (
        <div className="space-y-8 p-6 max-w-7xl">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="page-title">Hello, {user?.name?.split(' ')[0]} 👋</h1>
                    <p className="page-subtitle">Here's your latest health overview.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Live Vitals</span>
                </div>
            </div>

            {/* Primary vitals */}
            <div>
                <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Current Vitals</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    <MetricCard title="Heart Rate"  value={latest?.heart_rate}  unit="bpm"   icon="❤️" color="red"    />
                    <MetricCard title="SpO₂"        value={latest?.spo2}        unit="%"     icon="💧" color="blue"   />
                    <MetricCard title="Temperature" value={latest?.temperature} unit="°F"    icon="🌡️" color="yellow" />
                    <MetricCard title="Blood Sugar" value={latest?.sugar_level} unit="mg/dL" icon="🩸" color="purple" />
                </div>
            </div>

            {/* Blood pressure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <MetricCard title="Systolic BP"  value={latest?.blood_pressure_systolic}  unit="mmHg" icon="📈" color="cyan"  />
                <MetricCard title="Diastolic BP" value={latest?.blood_pressure_diastolic} unit="mmHg" icon="📉" color="green" />
            </div>

            {/* Trend chart */}
            <LiveChart data={recent} fields={CHART_FIELDS} title="Vitals Trend (Live)" />

            {/* Active alerts */}
            {allAlerts.length > 0 && (
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="font-bold text-slate-900 dark:text-white">Active Alerts</h2>
                        <span className="ml-auto text-xs bg-red-100 dark:bg-red-900/30 text-red-600 font-bold px-2 py-0.5 rounded-full">
                            {allAlerts.length}
                        </span>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                        {allAlerts.map((a, i) => (
                            <div key={a._id ?? i} className="px-6 py-4 flex items-start gap-3">
                                <AlertBadge severity={a.severity} />
                                <p className="text-sm text-slate-700 dark:text-slate-300 flex-1 leading-relaxed">{a.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
import { usePatientChannel }              from '../../hooks/useRealtimeChannels';
import MetricCard  from '../../components/ui/MetricCard';
import LiveChart   from '../../components/ui/LiveChart';
import AlertBadge  from '../../components/ui/AlertBadge';
import { selectUser }  from '../../redux/slices/authSlice';

const CHART_FIELDS = [
    { key: 'heart_rate',  label: 'Heart Rate',  color: '#EF4444' },
    { key: 'spo2',        label: 'SpO₂ %',      color: '#2563EB' },
    { key: 'temperature', label: 'Temp °F',     color: '#F59E0B' },
];

export default function PatientDashboard() {
    const dispatch = useDispatch();
    const user     = useSelector(selectUser);
    const recent   = useSelector(selectRecent);
    const { items: alerts } = useSelector((s) => s.alerts);
    const liveAlerts = useSelector(selectLiveAlerts);

    // The patient's own patientId is in the patient_profile embedded in the me response
    const patientId = user?.patient_profile?._id;
    const latest    = useSelector((s) => s.metrics.latestByPatient[patientId]);

    usePatientChannel(patientId);

    useEffect(() => {
        if (patientId) {
            dispatch(fetchLatestMetric(patientId));
            dispatch(fetchRecentMetrics(patientId));
            dispatch(fetchAlerts({ patient_id: patientId }));
        }
    }, [patientId, dispatch]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Hello, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-500 text-sm mt-1">Here's your latest health overview.</p>
            </div>

            {/* Live Vitals */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Heart Rate"  value={latest?.heart_rate}  unit="bpm"   icon="❤️" color="red"    />
                <MetricCard title="SpO₂"        value={latest?.spo2}        unit="%"     icon="💧" color="blue"   />
                <MetricCard title="Temperature" value={latest?.temperature} unit="°F"    icon="🌡️" color="yellow" />
                <MetricCard title="Blood Sugar" value={latest?.sugar_level} unit="mg/dL" icon="🩸" color="purple" />
            </div>

            {/* Blood Pressure row */}
            <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Systolic BP"  value={latest?.blood_pressure_systolic}  unit="mmHg" icon="📈" color="cyan" />
                <MetricCard title="Diastolic BP" value={latest?.blood_pressure_diastolic} unit="mmHg" icon="📉" color="green" />
            </div>

            {/* Chart */}
            <LiveChart data={recent} fields={CHART_FIELDS} title="Vitals Trend (Live)" />

            {/* Active Alerts */}
            {(alerts.length > 0 || liveAlerts.length > 0) && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="font-semibold text-slate-700 dark:text-slate-200">Active Alerts</h2>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {[...liveAlerts, ...alerts].slice(0, 5).map((a, i) => (
                            <div key={a._id ?? i} className="px-5 py-3 flex items-start gap-2">
                                <AlertBadge severity={a.severity} />
                                <p className="text-sm text-slate-600 dark:text-slate-300">{a.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
