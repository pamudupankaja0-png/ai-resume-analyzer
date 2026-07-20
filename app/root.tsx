import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react";
import { usePuterStore } from "./lib/puter";
import "./app.css";

export default function App() {
    const init = usePuterStore((state) => state.init);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />

            {/* 1️⃣ Puter Script එක */}
            <script src="https://js.puter.com/v2/"></script>

            {/* 2️⃣ 🚀 මෙන්න මෙතනට තමයි PDF.js CDN එක දාන්න ඕනේ! */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
        </head>
        <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}