import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),     // මුල් පිටුව (/)
    route("upload", "routes/upload.tsx"),
    route("results", "routes/results.tsx"),
] satisfies RouteConfig;