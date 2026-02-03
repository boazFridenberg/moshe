import React, { useState, useEffect, useRef } from 'react';
import {
    Shield, Smartphone, FileText, Lock, CheckCircle,
    AlertTriangle, ArrowLeft, Share2, Award, UserCheck,
    Terminal, XCircle, Scan, Eye, EyeOff, Wifi
} from 'lucide-react';

// --- Types & Interfaces ---
interface Question {
    id: number;
    text: string;
    isAllowed?: boolean; // For social media
    status?: 'approve' | 'reject'; // For CV
    explanation: string;
}

// --- Main App Component ---
const InfoSecAppPro = () => {
    const [appState, setAppState] = useState<'boot' | 'intro' | 'social' | 'cv' | 'summary' | 'end'>('boot');
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [clearanceLevel, setClearanceLevel] = useState(1);

    // Boot Sequence State
    const [bootLines, setBootLines] = useState<string[]>([]);

    // Game Logic State
    const [feedback, setFeedback] = useState<{ show: boolean, isCorrect: boolean, text: string } | null>(null);
    const [cvRedacted, setCvRedacted] = useState(false); // Visual effect for CV redaction

    // --- Content Data ---
    const socialQuestions: Question[] = [
        { id: 1, text: "תמונה שלי מהחמ\"ל עם הכיתוב 'משמרת אחרונה!'", isAllowed: false, explanation: "עבירת ב\"מ חמורה! צילום במתקן סגור חושף ציוד, מסכים ומיקום." },
        { id: 2, text: "שיתוף כתבה מ-Ynet על מבצע שהשתתפתי בו (לאחר פרסום רשמי)", isAllowed: true, explanation: "מותר, כל עוד הכתבה פורסמה במקור גלוי ואינך מוסיף פרטים מסווגים שלא כתובים בה." },
        { id: 3, text: "עדכון בלינקדאין: 'בוגר יחידת 8200'", isAllowed: false, explanation: "אסור לציין מספר יחידה. יש להשתמש בכינוי הבלמ\"סי בשיח ישיר בלבד, ולא בפרופיל פומבי." },
        { id: 4, text: "סטורי באינסטגרם עם תג יחידה על המדים", isAllowed: false, explanation: "אסור. סמלי יחידות מסווגות חושפים שיוך ארגוני." }
    ];

    const cvQuestions: Question[] = [
        { id: 1, text: "ראש צוות במרכז הסייבר, יחידה 8200", status: 'reject', explanation: "חשיפת מספר יחידה ומבנה ארגוני (מרכז)." },
        { id: 2, text: "ניסיון בפיתוח מערכות Full Stack בסביבת ענן", status: 'approve', explanation: "מצוין. תיאור מקצועי טכנולוגי שאינו חושף סודות." },
        { id: 3, text: "אחראי על הפעלת שו\"ס 'רואה נסתר'", status: 'reject', explanation: "עצור! אסור להזכיר שמות של פרויקטים מסווגים (שו\"ס)." },
        { id: 4, text: "שירות צבאי מלא בחיל המודיעין", status: 'approve', explanation: "תקין. שיוך זרועי כללי מותר." }
    ];

    // --- Effects ---

    // Boot Sequence Effect
    useEffect(() => {
        if (appState === 'boot') {
            const lines = [
                "INITIALIZING SECURE PROTOCOLS...",
                "CONNECTING TO IDF_NETWORK_V4...",
                "VERIFYING USER IDENTITY...",
                "ACCESS GRANTED.",
                "LOADING MODULE: CITIZENSHIP_TRANSITION..."
            ];

            let delay = 0;
            lines.forEach((line, index) => {
                delay += Math.random() * 500 + 400;
                setTimeout(() => {
                    setBootLines(prev => [...prev, line]);
                    if (index === lines.length - 1) {
                        setTimeout(() => setAppState('intro'), 1000);
                    }
                }, delay);
            });
        }
    }, [appState]);

    // Clearance Level Calculation
    useEffect(() => {
        if (score > 50) setClearanceLevel(3);
        else if (score > 20) setClearanceLevel(2);
        else setClearanceLevel(1);
    }, [score]);


    // --- Helper Functions ---

    const playSound = (type: 'success' | 'error' | 'click') => {
        // In a real app, we would play Audio objects here.
        // Visual feedback is handled via state.
    };

    const handleSocialAnswer = (answer: boolean) => {
        const q = socialQuestions[currentStep];
        const isCorrect = q.isAllowed === answer;

        processAnswer(isCorrect, q.explanation);
    };

    const handleCVAnswer = (action: 'approve' | 'reject') => {
        const q = cvQuestions[currentStep];
        const isCorrect = q.status === action;

        if (action === 'reject') {
            setCvRedacted(true); // Trigger visual effect
        }

        setTimeout(() => {
            processAnswer(isCorrect, q.explanation);
        }, action === 'reject' ? 800 : 0);
    };

    const processAnswer = (isCorrect: boolean, text: string) => {
        if (isCorrect) {
            setScore(prev => prev + 15);
            playSound('success');
        } else {
            playSound('error');
        }
        setFeedback({ show: true, isCorrect, text });
    };

    const nextStep = () => {
        setFeedback(null);
        setCvRedacted(false);

        const isSocialPhase = appState === 'social';
        const currentList = isSocialPhase ? socialQuestions : cvQuestions;

        if (currentStep < currentList.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Move to next module
            setCurrentStep(0);
            if (appState === 'social') setAppState('cv');
            else if (appState === 'cv') setAppState('summary');
        }
    };

    const startGame = () => setAppState('social');

    // --- Sub-Components ---

    const CyberButton = ({ onClick, children, variant = 'primary', className = '' }: any) => {
        const variants = {
            primary: "bg-emerald-500/10 border-emerald-500 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
            danger: "bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
            neutral: "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600"
        };

        return (
            <button
                onClick={() => { playSound('click'); onClick(); }}
                className={`px-6 py-3 border rounded-lg font-mono tracking-wider font-bold transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm ${variants[variant as keyof typeof variants]} ${className}`}
            >
                {children}
            </button>
        );
    };

    const ModalFeedback = () => {
        if (!feedback) return null;
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
                <div className={`relative max-w-md w-full bg-slate-900 border-2 ${feedback.isCorrect ? 'border-emerald-500' : 'border-red-500'} rounded-xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden`}>
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>

                    <div className="relative z-10 text-center">
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${feedback.isCorrect ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}`}>
                            {feedback.isCorrect ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                        </div>

                        <h3 className={`text-2xl font-bold mb-2 ${feedback.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                            {feedback.isCorrect ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                        </h3>

                        <p className="text-slate-300 mb-6 font-mono leading-relaxed border-t border-slate-700 pt-4 mt-4">
                            {feedback.text}
                        </p>

                        <CyberButton onClick={nextStep} variant={feedback.isCorrect ? 'primary' : 'danger'} className="w-full">
                            המשך בפעולה <ArrowLeft size={18} />
                        </CyberButton>
                    </div>
                </div>
            </div>
        );
    };

    // --- Render Functions ---

    const renderBoot = () => (
        <div className="flex flex-col items-start justify-end h-full p-8 font-mono text-emerald-500 text-lg">
            {bootLines.map((line, i) => (
                <div key={i} className="mb-2 animate-slide-right">
                    <span className="mr-2 text-slate-500">{`>`}</span>
                    {line}
                </div>
            ))}
            <div className="animate-pulse mt-2">_</div>
        </div>
    );

    const renderIntro = () => (
        <div className="text-center space-y-8 animate-fade-in relative z-10">
            <div className="inline-block relative">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full"></div>
                <Shield size={80} className="text-emerald-400 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,155,0.8)]" />
            </div>

            <div>
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 tracking-tight">
                    אחריות לחיים
                </h1>
                <div className="text-sm font-mono text-cyan-600 tracking-[0.3em] uppercase">מודול הכנה לאזרחות</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl max-w-2xl mx-auto backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-emerald-500"></div>

                <p className="text-xl text-slate-300 mb-4">
                    לוחם/ת, השחרור מתקרב.
                </p>
                <p className="text-slate-400">
                    בעולם הדיגיטלי של היום, <span className="text-white font-bold">המידע שלך הוא הנשק שלהם</span>.
                    בלומדה זו נעבור סימולציה שתכין אותך להתמודדות עם רשתות חברתיות וכתיבת קורות חיים בצורה בטוחה.
                </p>
            </div>

            <CyberButton onClick={startGame} className="w-64 mx-auto text-lg h-14">
                התחל סימולציה
            </CyberButton>
        </div>
    );

    const renderSocial = () => {
        const question = socialQuestions[currentStep];
        return (
            <div className="animate-slide-up max-w-md mx-auto relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Smartphone className="text-cyan-400" /> רשתות חברתיות
                    </h2>
                    <span className="font-mono text-slate-500 text-sm">{currentStep + 1}/{socialQuestions.length}</span>
                </div>

                {/* Phone Frame Simulator */}
                <div className="bg-white text-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-8 border-slate-800 relative overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>

                    {/* Status Bar */}
                    <div className="flex justify-between px-2 pt-2 mb-4 text-xs font-bold text-slate-400">
                        <span>14:00</span>
                        <div className="flex gap-1"><Wifi size={12} /> <span>5G</span></div>
                    </div>

                    {/* App Header */}
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                        <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full p-[2px]">
                            <div className="w-full h-full bg-white rounded-full border-2 border-white"></div>
                        </div>
                        <span className="font-bold text-sm">InstaFeed</span>
                    </div>

                    {/* Post Content */}
                    <div className="aspect-square bg-slate-100 mb-3 rounded-lg flex items-center justify-center relative overflow-hidden group">
                        {/* Fake Image Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center p-8 text-center">
                            <span className="font-serif italic text-slate-500 text-lg">"{question.text}"</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-3">
                        <div className="hover:text-red-500 cursor-pointer transition-colors"><div className="w-6 h-6 border-2 border-current rounded-full"></div></div>
                        <div className="w-6 h-6 border-2 border-slate-300 rounded-full"></div>
                        <Share2 className="w-6 h-6 text-slate-300" />
                    </div>

                    <div className="text-xs font-bold mb-4">5,342 likes</div>

                    <div className="space-y-3 mt-6">
                        <button
                            onClick={() => handleSocialAnswer(true)}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-95 text-sm"
                        >
                            Post to Feed
                        </button>
                        <button
                            onClick={() => handleSocialAnswer(false)}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-lg font-bold transition-colors text-sm"
                        >
                            Delete Draft
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderCV = () => {
        const question = cvQuestions[currentStep];
        return (
            <div className="animate-slide-up max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-cyan-400" /> סורק קורות חיים
                    </h2>
                    <span className="font-mono text-slate-500 text-sm">{currentStep + 1}/{cvQuestions.length}</span>
                </div>

                {/* Document Editor Interface */}
                <div className="bg-slate-800 rounded-t-xl border-b border-slate-700 p-2 flex gap-2 items-center">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-xs text-slate-400 font-mono">CONFIDENTIAL_RESUME.DOCX</div>
                </div>

                <div className="bg-slate-100 text-slate-900 p-8 min-h-[300px] shadow-2xl relative font-serif">
                    {/* Header */}
                    <div className="border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold uppercase">Israel Israeli</h1>
                            <p className="text-sm text-slate-600">Software Developer</p>
                        </div>
                        <div className="text-xs font-mono text-slate-400">ID: 987654321</div>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-4">
                        <div className="h-2 bg-slate-200 w-full rounded"></div>
                        <div className="h-2 bg-slate-200 w-5/6 rounded"></div>

                        {/* The Interactive Line */}
                        <div className="mt-8 mb-8 p-4 border-2 border-dashed border-cyan-500 bg-cyan-50 rounded relative group transition-all duration-300">
                            <div className="absolute -top-3 right-4 bg-cyan-500 text-white text-xs px-2 py-0.5 rounded font-sans font-bold">לבדיקה</div>

                            <p className={`text-lg font-medium transition-all duration-500 ${cvRedacted ? 'bg-black text-black select-none' : ''}`}>
                                {question.text}
                            </p>

                            {/* Scanning Animation Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 opacity-50 animate-[scan_2s_ease-in-out_infinite]"></div>
                        </div>

                        <div className="h-2 bg-slate-200 w-4/5 rounded"></div>
                        <div className="h-2 bg-slate-200 w-full rounded"></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-slate-900 p-6 rounded-b-xl border border-slate-700 border-t-0 flex justify-center gap-6">
                    <CyberButton onClick={() => handleCVAnswer('approve')} variant="primary" className="w-1/3">
                        <CheckCircle size={18} /> אשר סעיף
                    </CyberButton>

                    <CyberButton onClick={() => handleCVAnswer('reject')} variant="danger" className="w-1/3">
                        <EyeOff size={18} /> צנזר (Redact)
                    </CyberButton>
                </div>
            </div>
        );
    };

    const renderSummary = () => (
        <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                סיכום נהלים ודגשים
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Allowed Card */}
                <div className="bg-slate-800/40 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-colors backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 text-emerald-400">
                        <CheckCircle className="w-6 h-6" />
                        <h3 className="text-xl font-bold">אור ירוק (מותר)</h3>
                    </div>
                    <ul className="space-y-3">
                        {['עצם השירות בצה"ל, תקופה ודרגה.', 'שם תפקיד כללי/מקצועי (מפתח, נהג, לוחם).', 'ציון שם יחידה בכינוי בלמ"סי (בשיח ישיר בלבד).'].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-emerald-500 mt-1">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Forbidden Card */}
                <div className="bg-slate-800/40 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-colors backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 text-red-400">
                        <XCircle className="w-6 h-6" />
                        <h3 className="text-xl font-bold">אור אדום (אסור)</h3>
                    </div>
                    <ul className="space-y-3">
                        {['חשיפת שו"סים, פרויקטים או אמל"ח.', 'תמונות מתוך מתקנים או עם ציוד רגיש.', 'ציון מספר יחידה בקו"ח או ברשתות.'].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                <span className="text-red-500 mt-1">✕</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <CyberButton onClick={() => setAppState('end')} variant="primary" className="w-64">
                    הנפק אישור סיום
                </CyberButton>
            </div>
        </div>
    );

    const renderEnd = () => (
        <div className="text-center animate-zoom-in relative py-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent pointer-events-none"></div>

            <div className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-30 rounded-full animate-pulse"></div>
                <div className="bg-slate-900 border-4 border-emerald-500 p-8 rounded-full relative z-10">
                    <Award size={64} className="text-emerald-400" />
                </div>
            </div>

            <h1 className="text-4xl font-black text-white mb-2">המשימה הושלמה</h1>
            <p className="text-xl text-slate-400 mb-8">רמת הביטחון שלך היא:</p>

            <div className="bg-slate-800 inline-flex items-center gap-4 px-8 py-4 rounded-xl border border-slate-600 mb-10 shadow-lg">
                <div className={`text-4xl font-mono font-bold ${clearanceLevel === 3 ? 'text-purple-400' : 'text-emerald-400'}`}>
                    {score}
                </div>
                <div className="text-left text-xs text-slate-500 font-mono uppercase">
                    <div>Security</div>
                    <div>Points</div>
                </div>
                <div className="h-8 w-px bg-slate-600 mx-2"></div>
                <div className="text-right">
                    <div className="text-xs text-slate-400">סיווג נוכחי</div>
                    <div className={`font-bold ${clearanceLevel === 3 ? 'text-purple-400' : 'text-emerald-400'}`}>
                        {clearanceLevel === 3 ? 'TOP SECRET' : clearanceLevel === 2 ? 'SECRET' : 'UNCLASSIFIED'}
                    </div>
                </div>
            </div>

            <div className="max-w-xl mx-auto bg-yellow-900/20 border border-yellow-600/50 p-4 rounded-lg flex gap-3 text-right">
                <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                <div className="text-sm text-yellow-200/80">
                    זכור: השחרור מצה"ל לא משחרר מאחריות. יש לגשת לקב"ם היחידה להסדרת הרשאות סופית.
                </div>
            </div>

            <div className="mt-12 text-slate-600 text-xs font-mono">
                SESSION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} <br />
                LOGOUT COMPLETED.
            </div>
        </div>
    );

    // --- Main Render ---

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden" dir="rtl">

            {/* Background Grid & Scanlines */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/90"></div>
                {/* Ambient Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 py-6 min-h-screen flex flex-col">
                {/* Top Header Bar */}
                {appState !== 'boot' && (
                    <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4 animate-slide-down">
                        <div className="flex items-center gap-3">
                            <Shield className="text-emerald-500 animate-pulse" size={24} />
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">Security Clearance</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(lvl => (
                                        <div key={lvl} className={`h-1.5 w-6 rounded-full transition-colors ${clearanceLevel >= lvl ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-800'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-right font-mono">
                            <div className="text-xs text-slate-500 uppercase">Current Score</div>
                            <div className="text-xl font-bold text-white">{score.toString().padStart(4, '0')}</div>
                        </div>
                    </div>
                )}

                {/* Dynamic Content Area */}
                <div className="flex-grow flex flex-col justify-center">
                    {appState === 'boot' && renderBoot()}
                    {appState === 'intro' && renderIntro()}
                    {appState === 'social' && renderSocial()}
                    {appState === 'cv' && renderCV()}
                    {appState === 'summary' && renderSummary()}
                    {appState === 'end' && renderEnd()}
                </div>

                {/* Modal Logic */}
                <ModalFeedback />

                {/* Footer */}
                {appState !== 'boot' && (
                    <div className="mt-8 text-center text-xs text-slate-600 font-mono border-t border-slate-900 pt-4">
                        UNCLASSIFIED // IDF INFORMATION SECURITY DEPARTMENT // VER 2.0
                    </div>
                )}
            </div>

            {/* CSS Utility Styles for Animations */}
            <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0.5; }
          50% { top: 100%; opacity: 0.2; }
          100% { top: 0; opacity: 0.5; }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-right { animation: slide-right 0.3s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.5s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.5s ease-out forwards; }
        @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

export default InfoSecAppPro;