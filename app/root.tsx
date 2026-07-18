import React, { useEffect } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { usePuterStore } from "./lib/puter";
import "./app.css"; // 👈 Tailwind styles සඳහා අනිවාර්යයි!

export const links = () => [
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    const { init } = usePuterStore();

    useEffect(() => {
        init(); // App එක load වෙද්දීම Puter සක්‍රීය වේ
    }, [init]);

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* 👈 Puter official script එක head එක ඇතුළතින් load කිරීම */}
            <script src="https://js.puter.com/v2/"></script>
            <Meta />
            <Links />
        </head>
        <body>
        {children}
        <ScrollRestoration />
        <Scripts /> {/* 👈 JavaScript ක්‍රියාත්මක වීමට අනිවාර්යයි */}
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}