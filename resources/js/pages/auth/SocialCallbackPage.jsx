import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials, fetchMe } from '../../redux/slices/authSlice';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function SocialCallbackPage() {
    const [params]   = useSearchParams();
    const dispatch   = useDispatch();
    const navigate   = useNavigate();

    useEffect(() => {
        const token = params.get('token');
        const role  = params.get('role');
        const error = params.get('error');

        if (error || !token) {
            toast.error('Google sign-in failed. Please try again.');
            navigate('/login', { replace: true });
            return;
        }

        // Set auth header then fetch full user profile
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('mediflow_token', token);

        dispatch(setCredentials({ token, user: null }));

        dispatch(fetchMe())
            .unwrap()
            .then((user) => {
                toast.success(`Welcome, ${user.name?.split(' ')[0]}!`);
                navigate(`/${user.role ?? role}`, { replace: true });
            })
            .catch(() => {
                toast.error('Authentication failed. Please try again.');
                navigate('/login', { replace: true });
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Signing you in with Google…</p>
            </div>
        </div>
    );
}
