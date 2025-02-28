import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }

  try {
    resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: '62c8d652-0861-449e-aaea-ec6144292072',
    });
    
    return new Response(JSON.stringify({ message: 'Subscribed successfully' }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}