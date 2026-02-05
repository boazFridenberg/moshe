import { useState } from 'react';
import {
    Shield, CheckCircle, XCircle, AlertTriangle,
    ChevronLeft, Award, Lock
} from 'lucide-react';

// --- Assets Imports ---
// Note: Using relative paths to 'assest' folder as found in directory listing
import img3a from './assest/שקף 3 א.jpg';
import img3b from './assest/שקף 3 ב.jpg';
import img3c from './assest/שקף 3 ג.jpg'; // Assuming 'ג' maps to 3rd item
import img3d from './assest/שקף 3 ד.jpg'; // Assuming 'ד' maps to 4th item
import img4a from './assest/שקף 4 א.jpg';
import img5a from './assest/שקף 5 א.jpg';
import img5b from './assest/שקף 5 ב.jpg';
import img5c from './assest/שקף 5 ג.jpg';
import img5d from './assest/שקף 5 ד.jpg';
import img5e from './assest/שקף 5 ה.jpg';

// --- Types ---
type SlideType = 'intro' | 'info' | 'game' | 'summary' | 'score';

interface GameQuestion {
    id: number;
    text: string;
    image?: string;
    isAllowed: boolean;
    explanation: string;
}

interface SlideData {
    id: number;
    type: SlideType;
    title?: string;
    content?: string | string[]; // For bullet points
    image?: string;
    questions?: GameQuestion[];
    extraText?: string; // For warnings/notes
}

// --- Data ---
const SLIDES: SlideData[] = [
    // Slide 1: Intro
    {
        id: 1,
        type: 'intro',
        title: 'מזל טוב!',
        content: [
            'אתה משתחרר מהצבא ויש כמה דברים שצריך לדבר עליהם.',
            'בלומדה זו נעבור על דגשי ביטחון מידע לאזרחות!',
            'שימו לב! - ביטחון מידע = אחריות לחיים'
        ],
        extraText: 'לאחר הגשת הלומדה יש לגשת לקב"ם היחידה על מנת להסדיר את ההרשאות הרלוונטיות למילואים במערכות אישורי הכניסה!'
    },
    // Slide 2: Social Networks Intro
    {
        id: 2,
        type: 'info',
        title: 'הזדהות ברשתות החברתיות',
        content: 'בעידן הדיגיטלי, המידע שלך חשוף לכולם. בוא נראה אם אתם יודעים מה מותר ומה אסור לשתף.'
    },
    // Slide 3: Social Networks Game
    {
        id: 3,
        type: 'game',
        title: 'מותר או אסור?',
        questions: [
            {
                id: 1,
                text: 'תמונה שלי מהחמ"ל',
                image: img3a,
                isAllowed: false,
                explanation: 'אסור! חמ"ל הוא מתקן סגור ומסווג. אסור לצלם בתוכו.'
            },
            {
                id: 2,
                text: 'צילום ידיעה בטרייסבוק שעלתה בתחילת השירות על חיסול מבוקש (המבוקש כבר מת)',
                image: img3b,
                isAllowed: false,
                explanation: 'אסור! גם אם המבוקש מת, שיתוף ידיעות מבצעיות בהקשר לשירותך עלול לחשוף מידע נוסף.'
            },
            {
                id: 3,
                text: 'שיוך ל8200 בלינקדין',
                image: img3c,
                isAllowed: false,
                explanation: 'אסור! אין לציין את המספר 8200 ברשתות חברתיות.'
            },
            {
                id: 4,
                text: 'שיוך לאמ"ן בלינקדין',
                image: img3d,
                isAllowed: false,
                explanation: 'אסור! ציון שיוך לאגף המודיעין באופן ישיר הוא בעייתי.'
            }
        ]
    },
    // Slide 4: CV Writing Intro
    {
        id: 4,
        type: 'info',
        title: 'כתיבת קורות חיים',
        image: img4a,
        content: 'חשיפה של אנשינו ברשתות האויב תחת הפרסום "מבוקש" בעקבות כך שפרסם כי שירת ביחידה בתפקידים כאלו ואחרים.'
    },
    // Slide 5: CV Writing Game
    {
        id: 5,
        type: 'game',
        title: 'מותר או אסור לכתוב בקו"ח?',
        questions: [
            {
                id: 1,
                text: 'שירות כאלחוטן במרכז 7143 של 8200',
                image: img5a,
                isAllowed: false,
                explanation: 'אסור - שם תפקיד שאינו קיים גם בחברה האזרחית בנוסף לשיוך למרכז.'
            },
            {
                id: 2,
                text: 'שירות צבאי מלא בחיל המודיעין',
                image: img5b,
                isAllowed: true,
                explanation: 'מותר - ציון משך השירות ושיוך זרועי מערך מקצועי.'
            },
            {
                id: 3,
                text: 'שירות צבאי בתור מפתח תוכנה',
                image: img5c,
                isAllowed: true,
                explanation: 'מותר - ציון שם מקצוע ברמת בלמ"ס.'
            },
            {
                id: 4,
                text: 'עיסוק בשו"ס "השמש כחולה" (שם השו"ס לשם הדוגמא בלבד) במהלך שירותי הצבאי',
                image: img5d,
                isAllowed: false,
                explanation: 'אסור! חשיפת מידע מסווג ועיסוק בפרוייקטים מסווגים לא מאושר בכתיבת קורות החיים.'
            },
            {
                id: 5,
                text: 'במידה ונוצר שיח ישיר בינך לבין המעסיק, האם ניתן לציין את שם היחידה על פי הכינויי הבלמ"סי שלה? (יחידת 8200)',
                image: img5e,
                isAllowed: true,
                explanation: 'כן, בשיח ישיר בלבד.'
            }
        ]
    },
    // Slide 6: Warning
    {
        id: 6,
        type: 'info',
        title: 'דגשים נוספים',
        content: [
            'שימו לב - אין לשוחח על שו"סים אליהם נחשפת במהלך שירותך.',
            'בנוסף, חתימתך על שו"ס נמצאת בתוקף עד לסיום שירותך, לאחר שחרורך אינך רשאי "להתעדכן" מחבריך או מכל גורם אחר אודות המשכי התהליכים!',
            'שים לב כי עדכון שכזה הינו עבירה על חוקי המדינה ופגיעה בביטחונה!'
        ]
    },
    // Slide 7: CV Summary
    {
        id: 7,
        type: 'summary',
        title: 'סיכום: הזדהות בקו"ח',
        content: [
            '1. מאושר לציין עצם שירות בצה"ל, תקופת שירות צבאי, לרבות דרגה.',
            '2. מאושר לציין שם תפקיד כשיוך זרועי מערך מקצועי (מודיעין, חיל האוויר, חיל הים וכד\').',
            '3. מאושר לציין שם מקצוע ברמת בלמ"ס (לוחם, נהג, מנהל רשת, מודיעין, טכנולוגיה, אמל"ח, פיתוח וכד\').',
            '4. בקו"ח המופצים באופן נרחב אין לציין שם יחידה אשר נקבעה כיחידה תחת מגבלות חשיפה.',
            '5. במידה ונוצר קשר ישיר בין החייל המשוחרר לבין המעסיק ניתן לציין את שם היחידה על פי כינוי החשיפה הבלמ"סי שלה.'
        ]
    },
    // Slide 8: Forbidden Summary
    {
        id: 8,
        type: 'summary',
        title: 'איסור העלאת מידע ערכי או מסווג',
        content: [
            '1. חל איסור לציין או להעלות כל מידע מסווג או ערכי.',
            '2. חל איסור לציין מידע אודות פרוייקטים צבאיים, לרבות עצם קיום, אלא באישור קב"ם.',
            '3. מותר לציין מקצוע צבאי ברמת בלמ"ס בהתאם למקצוע אזרחי מקביל.',
            '4. יודגש - גם במידה ונוצרה פניה ישירה למול החייל המשוחרר אין למסור מידע מסווג.',
            '5. בכל מקרה פרטני ניתן להתייעץ עם קב"ם המרכז.',
            'אם יש ספק - אין ספק!'
        ]
    },
    // Slide 9: Media Warning
    {
        id: 9,
        type: 'info',
        title: 'חשיפה לתקשורת',
        content: 'כל חשיפה של שירותך בתפקיד מסווג ביחידה דורש אישור וחתימת קב"ם גם לאחר שחרורך, אם זה בתוכנית ריאליטי, ראיונות לתקשורת, שיח עם עיתונאים וכו\''
    },
    // Slide 10: Final Score
    {
        id: 10,
        type: 'score',
        title: 'סיכום והערכה',
        content: []
    }
];

function App() {
    const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
    const [gameAnswers, setGameAnswers] = useState<Record<string, boolean>>({});

    const currentSlide = SLIDES[currentSlideIdx];
    const isLastSlide = currentSlideIdx === SLIDES.length - 1;

    const nextSlide = () => {
        if (!isLastSlide) {
            setCurrentSlideIdx(prev => prev + 1);
        }
    };

    const handleGameAnswer = (questionId: number, answer: boolean, correctAnswer: boolean) => {
        // Prevent re-answering if already answered
        const key = `${currentSlide.id}-${questionId}`;
        if (gameAnswers[key] !== undefined) return;

        setGameAnswers(prev => ({
            ...prev,
            [key]: answer === correctAnswer
        }));
    };

    // --- Render Components ---

    const renderIntroOrInfo = () => (
        <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn max-w-2xl mx-auto">
            <div className="bg-emerald-500/10 p-6 rounded-full border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                {currentSlide.id === 1 ? (
                    <Award size={64} className="text-emerald-400" />
                ) : (
                    <Shield size={64} className="text-emerald-400" />
                )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {currentSlide.title}
            </h1>

            {currentSlide.image && (
                <div className="relative group max-w-md mx-auto overflow-hidden rounded-xl border-2 border-slate-700 shadow-2xl">
                    <img src={currentSlide.image} alt="Slide visual" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
                </div>
            )}

            <div className="space-y-4 text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                {Array.isArray(currentSlide.content) ? (
                    currentSlide.content.map((line, i) => <p key={i}>{line}</p>)
                ) : (
                    <p>{currentSlide.content}</p>
                )}
            </div>

            {currentSlide.extraText && (
                <div className="bg-yellow-900/20 border border-yellow-600/50 p-4 rounded-lg flex gap-3 text-right max-w-xl mx-auto mt-8">
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-yellow-200/90 font-mono">
                        {currentSlide.extraText}
                    </p>
                </div>
            )}
        </div>
    );

    const renderSummary = () => (
        <div className="max-w-4xl mx-auto animate-fadeIn w-full">
            <h2 className="text-3xl font-bold text-center mb-8 text-emerald-400 flex items-center justify-center gap-3">
                <Lock className="w-8 h-8" />
                {currentSlide.title}
            </h2>

            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-2xl">
                <ul className="space-y-4">
                    {Array.isArray(currentSlide.content) && currentSlide.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-200 text-lg leading-relaxed">
                            <span className="text-emerald-500 mt-1.5 shrink-0"><CheckCircle size={20} /></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const renderGame = () => (
        <div className="w-full max-w-5xl mx-auto animate-fadeIn">
            <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {currentSlide.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSlide.questions?.map((q) => {
                    // Check if answered in persistent state OR currently showing explanation (though persistent covers it)
                    const key = `${currentSlide.id}-${q.id}`;
                    const isAnswered = gameAnswers[key] !== undefined;
                    const isCorrect = gameAnswers[key];

                    return (
                        <div key={q.id} className="bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all flex flex-col">
                            {q.image ? (
                                <div className="h-48 bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                    <img src={q.image} alt="Question" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="h-32 bg-slate-900 flex items-center justify-center p-4 border-b border-slate-700">
                                    <span className="text-slate-500 font-mono text-sm">[תמונה לא זמינה]</span>
                                </div>
                            )}

                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <p className="text-lg font-medium mb-4 text-slate-200">{q.text}</p>

                                {!isAnswered ? (
                                    <div className="flex gap-3 mt-auto">
                                        <button
                                            onClick={() => handleGameAnswer(q.id, true, q.isAllowed)}
                                            className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-2 rounded-lg transition-colors font-bold"
                                        >
                                            מותר
                                        </button>
                                        <button
                                            onClick={() => handleGameAnswer(q.id, false, q.isAllowed)}
                                            className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 py-2 rounded-lg transition-colors font-bold"
                                        >
                                            אסור
                                        </button>
                                    </div>
                                ) : (
                                    <div className={`mt-auto p-4 rounded-lg border ${isCorrect ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'} animate-fadeIn`}>
                                        <div className="flex items-center gap-2 font-bold mb-1">
                                            {isCorrect ? (
                                                <><CheckCircle size={18} className="text-emerald-500" /> <span className="text-emerald-400">תשובה נכונה!</span></>
                                            ) : (
                                                <><XCircle size={18} className="text-red-500" /> <span className="text-red-400">טעות!</span></>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-300">{q.explanation}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderScore = () => {
        const totalQuestions = SLIDES.reduce((acc, slide) => acc + (slide.questions?.length || 0), 0);
        const correctAnswers = Object.values(gameAnswers).filter(Boolean).length;
        const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

        let gradeText = "";
        let gradeColor = "";

        if (score >= 80) {
            gradeText = "מצוין! אתה מוכן לאזרחות.";
            gradeColor = "text-emerald-400";
        } else if (score >= 56) {
            gradeText = "טוב מאוד, אך יש מקום לשיפור.";
            gradeColor = "text-yellow-400";
        } else {
            gradeText = "שים לב! עליך לחזור על החומר.";
            gradeColor = "text-red-400";
        }

        return (
            <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn max-w-2xl mx-auto">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                    <Award size={100} className="text-emerald-400 relative z-10" />
                </div>

                <h1 className="text-5xl font-black text-white mb-2">סיכום והערכה</h1>

                <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 shadow-2xl w-full">
                    <div className="text-sm text-slate-400 mb-2 uppercase tracking-widest">הציון שלך</div>
                    <div className={`text-8xl font-black mb-4 ${gradeColor} drop-shadow-lg`}>
                        {score}
                    </div>
                    <div className="text-2xl font-bold text-slate-200 mb-8">{gradeText}</div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-6">
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                            <div className="text-slate-500 text-sm mb-1">תשובות נכונות</div>
                            <div className="text-2xl font-bold text-white">{correctAnswers}</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                            <div className="text-slate-500 text-sm mb-1">סך הכל שאלות</div>
                            <div className="text-2xl font-bold text-white">{totalQuestions}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-600/50 p-4 rounded-lg flex gap-3 text-right max-w-xl mx-auto mt-4 w-full">
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-yellow-200/90 font-bold">זכור: השחרור מצה"ל לא משחרר מאחריות.</p>
                        <p className="text-sm text-yellow-200/80">על כל מקרה חריג יש לדווח לקב"ם האחראי על יחידתך!</p>
                    </div>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-bold transition-all"
                >
                    התחל מחדש
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col overflow-hidden" dir="rtl">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
                <div className="absolute top-0 right-0 p-10 opacity-20">
                    <div className="w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-10 opacity-20">
                    <div className="w-64 h-64 bg-cyan-700 rounded-full blur-[120px]"></div>
                </div>
                {/* Grid Line */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            {/* Progress Bar */}
            <div className="relative z-10 w-full max-w-3xl mx-auto mb-8 bg-slate-900/50 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 ease-out"
                    style={{ width: `${((currentSlideIdx + 1) / SLIDES.length) * 100}%` }}
                ></div>
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 flex-grow flex flex-col justify-center items-center w-full max-w-6xl mx-auto min-h-[60vh]">

                {currentSlide.type === 'intro' && renderIntroOrInfo()}
                {currentSlide.type === 'info' && renderIntroOrInfo()}
                {currentSlide.type === 'summary' && renderSummary()}
                {currentSlide.type === 'game' && renderGame()}
                {currentSlide.type === 'score' && renderScore()}

            </main>

            {/* Footer Navigation */}
            <footer className="relative z-10 mt-8 flex justify-center items-center max-w-4xl mx-auto w-full border-t border-slate-800/50 pt-6">

                {/* Hidden/Removed Previous Button */}
                {/* Placeholders for layout balance if needed, but centering single button is fine too */}

                <span className="font-mono text-slate-500 text-sm absolute left-0">
                    SLIDE {currentSlideIdx + 1} / {SLIDES.length}
                </span>

                {currentSlide.type !== 'score' && (() => {
                    const allQuestionsAnswered = currentSlide.type !== 'game' ||
                        (currentSlide.questions?.every(q => gameAnswers[`${currentSlide.id}-${q.id}`] !== undefined) ?? true);

                    return (
                        <button
                            onClick={nextSlide}
                            disabled={isLastSlide || !allQuestionsAnswered}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-all ${isLastSlide
                                ? 'opacity-0 cursor-default'
                                : !allQuestionsAnswered
                                    ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400 border border-slate-600'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 active:scale-95'
                                }`}
                        >
                            {allQuestionsAnswered ? 'הבא' : 'השלם את השאלות'} <ChevronLeft size={24} />
                        </button>
                    );
                })()}
            </footer>

            {/* Global Styles for Animations */}
            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
        </div>
    );
}

export default App;