import { useNavigate } from 'react-router';
import Navbar from '~/components/Navbar';

export default function Home() {
    const navigate = useNavigate();

    return (
        <main className="relative min-h-screen font-sans text-slate-100 overflow-hidden bg-slate-950">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-15 mix-blend-screen pointer-events-none"
            >
                <source src="/public/videos/wave-bg.mp4.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-slate-950/60 pointer-events-none"></div>

            <div className="relative z-10 w-full">
                <Navbar />

                <section className="max-w-4xl mx-auto px-6 py-32 min-h-[80vh] flex flex-col justify-center items-center text-center">

                    {/* 🎨 මෙතන උඩ පේළියටත් (Optimize Your Resume) යට තිබ්බ සුපිරි Gradient එකම දැම්මා මල්ලි */}
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 flex flex-col gap-2">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            Optimize Your Resume
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            For AI-Driven ATS
                        </span>
                    </h1>

                    <p className="text-sm md:text-base text-slate-400 max-w-xl mb-10 font-medium leading-relaxed">
                        Scan your resume against core job requirements and unlock expert feedback instantly.
                    </p>

                    <button
                        onClick={() => navigate('/upload')}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-cyan-950/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02] cursor-pointer"
                    >
                        Get Started Now
                    </button>
                </section>
            </div>
        </main>
    );
}