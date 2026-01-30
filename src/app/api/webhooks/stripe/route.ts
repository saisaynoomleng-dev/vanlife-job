import db from '@/db';
import { BookingTable } from '@/db/schema';
import { env } from '@/lib/env/server';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const signature = (await headers()).get('stripe-signature');
    const body = await req.text();

    if (!signature) {
      return new Response(JSON.stringify({ message: 'Invalid Signature' }), {
        status: 400,
      });
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_SECRET_KEY,
    );
  } catch (error: any) {
    const errorMessage = error.message;
    if (error) console.error(error);

    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  const permittedEvents = ['checkout.session.completed'];

  if (permittedEvents.includes(event.type)) {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      //   switch (event.type) {
      //     case 'checkout.session.completed': {
      //         await db.update(BookingTable).set({stripeSessionId: session.id, stripePaymentIntentId: session.payment_intent as string})
      //     }
      //   break
    } catch (err: any) {
      console.error(err);
      return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
  }
}
