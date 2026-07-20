import { Link, useNavigate } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-slate-800/50 backdrop-blur-md bg-slate-950/20 relative z-50">
            {/* 🏠 Logo එක ක්ලික් කළාම Home Page එකට යනවා */}
            <div
                onClick={() => navigate('/')}
                className="text-2xl font-black tracking-wider text-white cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
                RESUMIND
            </div>

            {/* 🔗 පිටු අතර මාරු වීමට Links ටික */}
            <div className="flex items-center gap-6">
                <Link
                    to="/"
                    className="text-sm font-medium text-slate-400 hover:text-white transition-all"
                >
                    Home
                </Link>

                <Link
                    to="/upload"
                    className="text-sm font-medium text-slate-400 hover:text-white transition-all"
                >
                    Analyze
                </Link>

                {/* 📤 Upload Resume Button එක */}
                <button
                    onClick={() => navigate('/upload')}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-cyan-950/50 uppercase tracking-wider"
                >
                    Upload Resume
                </button>
            </div>
        </nav>
    );
}