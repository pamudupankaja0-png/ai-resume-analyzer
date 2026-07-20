import { create } from 'zustand';

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

export const usePuterStore = create<PuterState>((set) => {
    // 👈 1. මුලින්ම init function එක define කරගන්නවා
    const initFn = () => {
        if (typeof window !== 'undefined' && window.puter) {
            const isSignedIn = window.puter.auth.isSignedIn();

            set({
                isLoading: false,
                auth: {
                    isAuthenticated: isSignedIn,
                    signIn: () => window.puter.auth.signIn(),
                    signOut: () => {
                        window.puter.auth.signOut();
                        window.location.reload();
                    }
                }
            });
        } else {
            set({ isLoading: false });
        }
    };

    // 👈 2. Store එක හැදෙනකොටම බ්‍රවුසර් එක ඇතුළේ මේ initFn එක ඉබේම run වෙන්න සලස්වනවා
    if (typeof window !== 'undefined') {
        // Puter script එක load වෙන්න පොඩි වෙලාවක් යන නිසා interval එකක් දාලා check කරනවා
        const checkPuter = setInterval(() => {
            if (window.puter) {
                initFn();
                clearInterval(checkPuter);
            }
        }, 100);

        // තත්පර 4ක් ගිහිල්ලත් ලෝඩ් වුණේ නැත්නම් ලෝඩින් එක නවත්වනවා
        setTimeout(() => clearInterval(checkPuter), 4000);
    }

    return {
        isLoading: true,
        auth: null,
        init: initFn
    };
});