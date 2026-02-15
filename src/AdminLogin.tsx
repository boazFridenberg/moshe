import { useState } from 'react';
import { X, Lock, User } from 'lucide-react';
import Notification, { NotificationType } from './Notification';

interface AdminLoginProps {
    onClose: () => void;
    onLoginSuccess: (token: string) => void;
}

interface NotificationState {
    show: boolean;
    type: NotificationType;
    message: string;
}

function AdminLogin({ onClose, onLoginSuccess }: AdminLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<NotificationState>({ show: false, type: 'success', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ show: true, type: 'success', message: 'התחברות בוצעה בהצלחה!' });
                setTimeout(() => {
                    onLoginSuccess(data.token);
                    onClose();
                }, 1000);
            } else {
                setError(data.message || 'שם משתמש או סיסמה שגויים');
                setNotification({ show: true, type: 'error', message: 'שם משתמש או סיסמה שגויים' });
            }
        } catch (err) {
            setError('שגיאה בהתחברות לשרת');
            setNotification({ show: true, type: 'error', message: 'שגיאה בהתחברות לשרת' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {notification.show && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30">
                                <Lock className="text-emerald-400" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">כניסת מנהל</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="username" className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                                <User size={18} />
                                שם משתמש
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                placeholder="הכנס שם משתמש"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                                <Lock size={18} />
                                סיסמה
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                placeholder="הכנס סיסמה"
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-600/50 p-3 rounded-lg text-red-400 text-sm animate-fadeIn">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${isLoading
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:scale-105 shadow-lg shadow-emerald-900/20'
                                }`}
                        >
                            {isLoading ? 'מתחבר...' : 'התחבר'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;
