export const prerender = false; // Ensure that this only runs on the server

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Reads the request data (Only ONCE)
    const data = await request.json();
    const { name, email, message, honey } = data; // Extrai o honey aqui

    // Anti-Spam (Honeypot)
    // If the bot filled in the invisible field, we stop here and lie that it worked
    if (honey) {
      return new Response(JSON.stringify({ message: "Mensagem enviada com sucesso!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Standard validation (Humans)
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Campos faltando' }), { status: 400 });
    }

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
        subject: `Novo Contato: ${name}`,
        reply_to: email,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h2>Novo contato do Portfólio</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <hr />
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
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
    return new Response(JSON.stringify({ message: 'Erro interno no servidor' }), { status: 500 });
  }
};