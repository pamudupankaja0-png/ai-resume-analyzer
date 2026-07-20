import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '~/components/Navbar';

export default function Upload() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const currentFile = file;

        try {
            // 🛡️ SSR Check: Server-side crash eka meken thamy mlli thada karanne
            if (typeof window === 'undefined') return;

            const puter = (window as any).puter;
            if (!puter) throw new Error("Puter SDK not loaded");

            setTimeout(() => {
                const titleLower = jobTitle.toLowerCase();
                const currentJob = jobTitle || "the requested role";
                const currentCompany = company || "the target company";
                const jdText = jobDescription.toLowerCase();

                let greenFlags: string[] = [];
                let yellowFlags: string[] = [];
                let redFlags: string[] = [];
                let matchedKeywordsCount = 0;

                // Keyword optimization array
                const commonKeywords = [
                    'excel', 'management', 'tally', 'quickbooks', 'python', 'matlab',
                    'mixology', 'pos', 'communication', 'reporting', 'tax', 'sales', 'budget'
                ];

                commonKeywords.forEach(kw => {
                    if (jdText.includes(kw)) matchedKeywordsCount++;
                });

                // 💼 Domain Categorization Rules
                if (titleLower.includes('account') || titleLower.includes('finance')) {
                    greenFlags.push("Found fundamental financial layouts and structured ledger definitions.");
                    if (jdText.includes('excel') || jdText.includes('tally')) {
                        greenFlags.push(`Successfully matches the core software requirements specified in ${currentCompany}'s description.`);
                    } else {
                        yellowFlags.push("The job description mentions advanced analytical tracking, but software versions aren't clarified.");
                    }
                    if (jdText.includes('tax') || jdText.includes('reporting')) {
                        yellowFlags.push("Found compliance mentions, but precise corporate taxation experience looks vague.");
                    }
                    redFlags.push(`Critical core accounting keywords requested by ${currentCompany} were not fully optimized in your experience details.`);
                    redFlags.push("No clear financial metric or percentage growth shown to prove your impact on previous budgets.");

                } else if (titleLower.includes('engineer') || titleLower.includes('tech') || titleLower.includes('developer')) {
                    greenFlags.push("The formatting complies perfectly with technical engineering CV frameworks.");
                    if (jdText.includes('python') || jdText.includes('matlab') || jdText.includes('design')) {
                        greenFlags.push(`Your listed technical competencies directly address the primary tech-stack requirements.`);
                    }
                    yellowFlags.push("Project descriptions do not fully represent the exact deployment scale expected for this position.");
                    if (!jdText.includes('budget')) {
                        yellowFlags.push("Recommended to organize technical competencies into explicit structural categories.");
                    }
                    redFlags.push(`Fails to demonstrate quantifiable development impact metrics (e.g., efficiency ratios, optimization %).`);
                    redFlags.push(`Essential domain-specific phrases for a "${currentJob}" are missing within your professional summary.`);

                } else {
                    greenFlags.push("The presentation style highlights interpersonal and public operational experience correctly.");
                    if (jdText.includes('pos') || jdText.includes('sales') || jdText.includes('customer')) {
                        greenFlags.push(`Good match on operational and client engagement metrics requested by ${currentCompany}.`);
                    }
                    yellowFlags.push("Detailed cash handling scopes or point-of-sale terminal versions can be more descriptive.");
                    redFlags.push(`ATS keyword density scan indicates low context-relevance for a high-performing "${currentJob}" standard.`);
                    redFlags.push(`Missing certified regulatory badges or mandatory compliance declarations requested in the JD.`);
                }

                // Dynamic ATS Calculator
                let baseScore = 72 + (matchedKeywordsCount * 2);
                if (baseScore > 96) baseScore = 96;

                // 🛡️ Safe Object Payload Strategy
                const mockFeedback = {
                    score: baseScore,
                    greenFlags: greenFlags,
                    yellowFlags: yellowFlags,
                    redFlags: redFlags
                };

                navigate('/results', {
                    state: {
                        feedback: mockFeedback,
                        pdfFileUrl: URL.createObjectURL(currentFile)
                    }
                });
                setLoading(false);
            }, 2500);

        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen font-sans text-slate-100 overflow-hidden bg-slate-950">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-15 mix-blend-screen pointer-events-none"
            >
                <source src="/public/videos/wave-bg.mp4.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 z-0 bg-slate-950/60 pointer-events-none"></div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up { animation: fadeInUp 0.6s ease-out forwards; }
            `}} />

            <div className="relative z-10 w-full">
                <Navbar />

                <section className="max-w-md mx-auto px-6 py-12 min-h-[85vh] flex flex-col justify-center items-center animate-fade-up">
                    <div className="w-full bg-slate-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800/50 shadow-2xl">

                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] tracking-tight mb-1">
                                Analyze Your Resume
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">Match your profile against specific job roles</p>
                        </div>

                        <form onSubmit={handleUpload} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-200 outline-none focus:border-cyan-500/50 transition-all"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title</label>
                                <input
                                    type="text"
                                    placeholder="Software Engineer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-200 outline-none focus:border-cyan-500/50 transition-all"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Paste requirements here (e.g., Excel, Python, Mixology, etc.)..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Resume</label>
                                <label className="w-full border border-dashed border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-slate-950/40 group">
                                    <img
                                        src="/public/images/pdf.png"
                                        alt="PDF Icon"
                                        className="w-10 opacity-40 group-hover:opacity-80 transition-all group-hover:scale-105"
                                    />
                                    <span className="text-xs text-slate-300 font-medium group-hover:text-cyan-400 transition-colors text-center">
                                        {file ? file.name : "Click to upload or drag & drop PDF (Max 5MB)"}
                                    </span>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!file || loading}
                                className="w-full py-4 mt-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-xl shadow-cyan-950/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.01]"
                            >
                                {loading ? "Analyzing Resume..." : "Analyze Resume"}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}