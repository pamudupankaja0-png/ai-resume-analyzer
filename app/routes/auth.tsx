import React from "react";
import { usePuterStore } from "../lib/puter"; // නිවැරදිම store path එක

export default function Auth() {
    // Store එකෙන් isLoading සහ auth යන දෙකම ලබා ගැනීම
    const { isLoading, auth } = usePuterStore();

    // Puter එක check කරලා ඉවර වෙනකම් loading screen එකක් පෙන්වීම
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-600">
                <p>Checking session...</p>
            </div>
        );
    }

    return (
        <main
            className="bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center font-sans"
            style={{ backgroundImage: `url('/images/bg-auth.svg')` }}
        >
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 max-w-sm w-full text-center">

                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-bold text-slate-900">Welcome</h1>
                        <h2 className="text-slate-500 font-medium">Log In to Continue Your Job Journey</h2>
                    </div>

                    <div>
                        {/* පරිශීලකයා ලොග් වී ඇත්නම් 'Log Out' බොත්තම ද, නැත්නම් 'Log In' බොත්තම ද පෙන්වීම */}
                        {auth && auth.isAuthenticated ? (
                            <button
                                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-200 cursor-pointer"
                                onClick={auth.signOut}
                            >
                                Log Out
                            </button>
                        ) : (
                            <button
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200 cursor-pointer"
                                onClick={auth?.signIn}
                            >
                                Log In
                            </button>
                        )}
                    </div>

                </section>
            </div>
        </main>
    );
}