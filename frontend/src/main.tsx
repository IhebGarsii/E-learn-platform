import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="745484482146-nb1euo7dj38rge6cb5c4mre2u3k0vsqc.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
