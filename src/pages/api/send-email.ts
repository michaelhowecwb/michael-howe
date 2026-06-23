export const prerender = false;

import type { APIRoute } from 'astro';

// Tipagem rigorosa dos dados esperados
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honey?: string;
}

// Utilitário para sanitizar inputs e prevenir injeção de HTML (XSS)
const escapeHTML = (str: string): string => {
  return str.replace(/[&<>'"]/g, (tag) => {
    const charsToReplace: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return charsToReplace[tag] || tag;
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    // Reads the request data (Only ONCE)
    const data: ContactFormData = await request.json();
    const { name, email, message, honey } = data;

    // Anti-Spam (Honeypot)
    // If the bot filled in the invisible field, we stop here and lie that it worked
    if (honey) {
      return new Response(JSON.stringify({ message: "Mensagem enviada com sucesso!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Standard validation (Humans) - Presença dos dados
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Campos faltando' }), { status: 400 });
    }

    // Validação de formato de E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: 'E-mail inválido' }), { status: 400 });
    }

    // Validação de formato de Nome (Rejeita se contiver números)
    if (/\d/.test(name)) {
      return new Response(JSON.stringify({ message: 'O nome não pode conter números' }), { status: 400 });
    }

    // Sanitização de dados antes da interpolação no HTML
    const safeName = escapeHTML(name);
    const safeMessage = escapeHTML(message);

    // Actual call to the Resend API.
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['michael.howecwb@gmail.com'],
        subject: `Novo Contato: ${safeName}`,
        reply_to: email,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h2>Novo contato do Portfólio</h2>
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <hr />
            <p><strong>Mensagem:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br />')}</p>
          </div>
        `,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: resData }), { status: res.status });
    }

    return new Response(JSON.stringify({ message: 'E-mail enviado!' }), { status: 200 });
  } catch (err) {
    // Log de erro adicionado para rastreabilidade no Vercel
    console.error('[send-email.ts] Erro interno:', err);
    return new Response(JSON.stringify({ message: 'Erro interno no servidor' }), { status: 500 });
  }
};