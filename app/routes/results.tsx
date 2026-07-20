import { useLocation, useNavigate } from 'react-router';
import Navbar from '~/components/Navbar';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const feedback = location.state?.feedback || null;
    const pdfFileUrl = location.state?.pdfFileUrl || null;

    if (!feedback) {
        return (
            <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans">
                <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 text-center max-w-sm mx-auto shadow-2xl">
                    <h3 className="text-xl font-bold text-slate-200 mb-2">No Analysis Data Found</h3>
                    <p className="text-xs text-slate-400 mb-6">Please upload and analyze a resume first to see your detailed report.</p>
                    <button
                        onClick={() => navigate('/upload')}
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:scale-105 transition-all cursor-pointer"
                    >
                        Go to Upload
                    </button>
                </div>
            </main>
        );
    }

    // 🧮 Score Wheel Calculations
    const score = feedback.score || 0;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <main className="relative min-h-screen font-sans text-slate-100 overflow-x-hidden bg-slate-950">
            <div className="relative z-10 w-full">
                <Navbar />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Side: Score & Flags Report */}
                    <div className="lg:col-span-5 flex flex-col gap-6 bg-slate-900/30 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800/50 shadow-2xl h-full">
                        <div className="text-center lg:text-left border-b border-slate-800/60 pb-5">
                            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent tracking-tight mb-1">
                                Analysis Report
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">ATS alignment scorecard and insights</p>
                        </div>

                        {/* 🎡 NEW: Gorgeous SVG Score Wheel Display */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/40 shadow-inner">
                            <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    {/* Track Circle */}
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r={radius}
                                        className="stroke-slate-800"
                                        strokeWidth="8"
                                        fill="transparent"
                                    />
                                    {/* Animated Progress Circle */}
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r={radius}
                                        className="stroke-cyan-400 transition-all duration-1000 ease-out"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.4))' }}
                                    />
                                </svg>
                                {/* Center Score Text */}
                                <div className="absolute text-2xl font-black text-white">
                                    {score}<span className="text-xs text-cyan-400/80">%</span>
                                </div>
                            </div>

                            <div className="text-center sm:text-left">
                                <h4 className="text-sm font-bold text-slate-200">Overall ATS Score</h4>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Based on customized alignment vectors, required tech-stack filters, and target keyword density weights.
                                </p>
                            </div>
                        </div>

                        {/* 🟢 Green Flags */}
                        <div className="flex flex-col gap-2.5">
                            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Green Flags
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {feedback.greenFlags?.map((flag: string, index: number) => (
                                    <li key={index} className="text-xs text-slate-300 bg-emerald-950/10 border border-emerald-900/20 p-3 rounded-xl list-none">
                                        {flag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 🟡 Yellow Flags */}
                        <div className="flex flex-col gap-2.5">
                            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Yellow Flags
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {feedback.yellowFlags?.map((flag: string, index: number) => (
                                    <li key={index} className="text-xs text-slate-300 bg-amber-950/10 border border-amber-900/20 p-3 rounded-xl list-none">
                                        {flag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 🔴 Red Flags */}
                        <div className="flex flex-col gap-2.5">
                            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Critical Red Flags
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {feedback.redFlags?.map((flag: string, index: number) => (
                                    <li key={index} className="text-xs text-slate-300 bg-rose-950/10 border border-rose-900/20 p-3 rounded-xl list-none">
                                        {flag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 🔄 NEW: Analyze Another Resume Action Button */}
                        <div className="pt-2 mt-auto border-t border-slate-800/60">
                            <button
                                onClick={() => navigate('/upload')}
                                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all border border-slate-700/60 hover:border-slate-600 cursor-pointer text-center"
                            >
                                🔄 Analyze Another Resume
                            </button>
                        </div>
                    </div>

                    {/* Right Side: PDF Preview Container */}
                    <div className="lg:col-span-7 flex flex-col bg-slate-900/30 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl border border-slate-800/50 shadow-2xl w-full">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-slate-200">Resume Preview</h3>
                            <p className="text-xs text-slate-400">Reviewing your uploaded file details</p>
                        </div>

                        <div className="w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative min-h-[65vh] lg:min-h-[850px] shadow-inner">
                            {pdfFileUrl ? (
                                <iframe
                                    src={pdfFileUrl}
                                    className="absolute inset-0 w-full h-full border-none"
                                    title="Resume PDF Preview"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                                    No live PDF preview available
                                </div>
                            )}
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}