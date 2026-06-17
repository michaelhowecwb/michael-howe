import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
    const { url, request, cookies, redirect } = context;

    // --- 1. OVERRIDE MANUAL (Testes e Link de Forçamento) ---
    // Inspeciona se a requisição atual possui "?lang=en" ou "?lang=pt"
    const queryLang = url.searchParams.get("lang");
    if (queryLang === "en" || queryLang === "pt") {
        // Grava/Sobrescreve a preferência do usuário no Cookie
        cookies.set("language_preference", queryLang, { path: "/" });
        
        // Remove o parâmetro sujo da URL (ex: limpa de "/?lang=en" para "/")
        url.searchParams.delete("lang");
        const cleanUrl = url.pathname + url.search;
        
        // Redireciona para o caminho correto baseado na escolha
        if (queryLang === "pt" && !url.pathname.startsWith("/pt")) {
            return redirect("/pt/", 302);
        }
        if (queryLang === "en" && url.pathname.startsWith("/pt")) {
            return redirect("/", 302);
        }
        
        // Se a rota já está correta, apenas aplica a limpeza da URL
        return redirect(cleanUrl === "" ? "/" : cleanUrl, 302);
    }

    // --- 2. LÓGICA PADRÃO DE ROTEAMENTO (SPA / RAIZ) ---
    // Intercepta apenas o tráfego da rota raiz
    if (url.pathname === "/") {
        const manualPreference = cookies.get("language_preference")?.value;

        // Se o usuário quer português de forma manual ou automática
        if (manualPreference === "pt" || manualPreference === "auto-pt") {
            return redirect("/pt/", 302);
        }

        // Se o usuário quer inglês explicitamente, libera a renderização da raiz
        if (manualPreference === "en") {
            return next();
        }

        // Se não há cookie, inspeciona o idioma nativo do navegador via Headers HTTP
        const acceptLanguage = request.headers.get("accept-language") || "";
        
        if (acceptLanguage.toLowerCase().startsWith("pt")) {
            // Define o cookie e redireciona
            cookies.set("language_preference", "auto-pt", { path: "/" });
            return redirect("/pt/", 302);
        }
    }

    // Libera a requisição se nenhuma regra de redirecionamento for ativada
    return next();
});