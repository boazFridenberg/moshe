import { useState, useEffect } from 'react';
import { LogOut, Users, CreditCard, Clock, Search } from 'lucide-react';

interface User {
    _id: string;
    name: string;
    idNumber: string;
    timestamp: string;
}

interface AdminDashboardProps {
    token: string;
    onLogout: () => void;
}

function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                setError('שגיאה בטעינת נתוני משתמשים');
            }
        } catch (err) {
            setError('שגיאה בהתחברות לשרת');
        } finally {
            setIsLoading(false);
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString('he-IL');
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(query) ||
            user.idNumber.includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8" dir="rtl">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
                <div className="absolute top-0 right-0 p-10 opacity-20">
                    <div className="w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-10 opacity-20">
                    <div className="w-64 h-64 bg-cyan-700 rounded-full blur-[120px]"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                            <Users className="text-emerald-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                לוח בקרה - מנהל
                            </h1>
                            <p className="text-slate-400">ניהול משתמשים שהשלימו את הלומדה</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 px-6 py-3 rounded-lg transition-all font-bold"
                    >
                        <LogOut size={20} />
                        התנתק
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="text-emerald-400" size={24} />
                            <h3 className="text-slate-400 font-medium">סך הכל משתמשים</h3>
                        </div>
                        <p className="text-4xl font-black text-white">{users.length}</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 shadow-lg mb-6">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="חיפוש לפי שם או תעודת זהות..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pr-12 pl-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-slate-400 text-xl">טוען נתונים...</div>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/20 border border-red-600/50 p-6 rounded-lg text-red-400 text-center">
                        {error}
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="bg-slate-900/50 backdrop-blur-sm p-12 rounded-xl border border-slate-700 text-center">
                        <Users className="mx-auto mb-4 text-slate-600" size={64} />
                        <p className="text-slate-400 text-xl">
                            {searchQuery ? 'לא נמצאו תוצאות' : 'אין משתמשים רשומים'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800/50 border-b border-slate-700">
                                    <tr>
                                        <th className="text-right px-6 py-4 text-emerald-400 font-bold">#</th>
                                        <th className="text-right px-6 py-4 text-emerald-400 font-bold flex items-center gap-2">
                                            <Users size={18} />
                                            שם מלא
                                        </th>
                                        <th className="text-right px-6 py-4 text-emerald-400 font-bold">
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={18} />
                                                תעודת זהות
                                            </div>
                                        </th>
                                        <th className="text-right px-6 py-4 text-emerald-400 font-bold">
                                            <div className="flex items-center gap-2">
                                                <Clock size={18} />
                                                זמן הגשה
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-slate-400 font-mono">{index + 1}</td>
                                            <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                                            <td className="px-6 py-4 text-slate-300 font-mono">{user.idNumber}</td>
                                            <td className="px-6 py-4 text-slate-400 text-sm">{formatTimestamp(user.timestamp)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
