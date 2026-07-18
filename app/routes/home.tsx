import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import { resumes } from "../../constants";
import { usePuterStore } from "../lib/puter";
import { useLocation, useNavigate } from "react-router";

export default function Home() {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // loading ඉවර වෙලා, පරිශීලකයා ලොග් වී නැත්නම් පමණක් Auth පිටුවට යැවීම
        if (!isLoading && (!auth || !auth.isAuthenticated)) {
            navigate(`/auth?next=${location.pathname}`);
        }
    }, [isLoading, auth, auth?.isAuthenticated, navigate, location.pathname]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-600">
                <p>Loading your session...</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-no-repeat bg-cover bg-center text-slate-900 font-sans relative"
            style={{ backgroundImage: `url('/images/bg-main.svg')` }}
        >
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center relative z-10">
                <div className="text-center max-w-3xl mb-16 select-none">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block py-1">
                            Track Your Applications
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block py-1 mt-2">
                            & Resume Ratings
                        </span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-xl mx-auto mt-6">
                        Review your submissions and check AI-powered feedback.
                    </p>
                </div>

                {resumes.length > 0 && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-start mt-4">
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume as any} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}