import { create } from 'zustand';

// 👈 TypeScript වලට window එක ඇතුළේ 'puter' පවතින බව හඳුන්වා දීම (Fixes TS2339)
declare global {
    interface Window {
        puter: any;
    }
}

interface PuterState {
    isLoading: boolean;
    auth: any;
    init: () => void;
}

export const usePuterStore = create<PuterState>((set) => ({
    isLoading: true,
    auth: null,
    init: () => {
        // සේවාදායකය (Server) නොව බ්‍රවුසරය (Browser) තුළ පමණක් ක්‍රියාත්මක වීම සහ puter පවතිනවාදැයි බැලීම
        if (typeof window !== 'undefined' && window.puter) {
            const isSignedIn = window.puter.auth.isSignedIn();

            set({
                isLoading: false,
                auth: {
                    isAuthenticated: isSignedIn,
                    // වීඩියෝ එකේ ආකාරයටම පිටුව වෙනස් වී login වීමට සකස් කිරීම
                    signIn: () => window.puter.auth.signIn(),
                    signOut: () => {
                        window.puter.auth.signOut();
                        window.location.reload();
                    }
                }
            });
        } else {
            // යම් හෙයකින් script එක load වීමට ප්‍රමාද වුවහොත් loading අත්හිටුවීම
            set({ isLoading: false });
        }
    },
}));