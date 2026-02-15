import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning';

interface NotificationProps {
    type: NotificationType;
    message: string;
    onClose: () => void;
}

function Notification({ type, message, onClose }: NotificationProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            bg: 'bg-emerald-900/90',
            border: 'border-emerald-500/50',
            iconColor: 'text-emerald-400'
        },
        error: {
            icon: XCircle,
            bg: 'bg-red-900/90',
            border: 'border-red-500/50',
            iconColor: 'text-red-400'
        },
        warning: {
            icon: AlertTriangle,
            bg: 'bg-yellow-900/90',
            border: 'border-yellow-500/50',
            iconColor: 'text-yellow-400'
        }
    };

    const { icon: Icon, bg, border, iconColor } = config[type];

    return (
        <div
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
        >
            <div className={`${bg} ${border} border backdrop-blur-sm rounded-xl shadow-2xl p-4 min-w-[320px] max-w-md`}>
                <div className="flex items-center gap-3">
                    <Icon className={iconColor} size={24} />
                    <p className="text-white font-medium flex-1">{message}</p>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(onClose, 300);
                        }}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
