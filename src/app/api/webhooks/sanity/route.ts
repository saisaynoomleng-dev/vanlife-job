import { env } from '@/lib/env/server';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { VanTable } from '@/db/schema';
import db from '@/db';
import { eq } from 'drizzle-orm';

type WebhookPayload = {
  _id: string;
  name: string;
  pricePerDay: number;
  type: string;
  mainImage: string;
};

export default async function POST(req: NextRequest) {
  const operation = req.headers.get('sanity-operation');

  try {
    if (!env.SANITY_WEBHOOK_SECRET) {
      return new Response('Missing Webhook secret', {
        status: 500,
      });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      env.SANITY_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return new Response(JSON.stringify({ message: 'invalid signature' }), {
        status: 401,
      });
    }

    if (!body?._id || !body.type) {
      return new Response(JSON.stringify({ message: 'Bad Request' }), {
        status: 400,
      });
    }

    switch (operation) {
      case 'create':
        {
          await db
            .insert(VanTable)
            .values({
              name: body.name,
              pricePerDayInCents: Math.round(body.pricePerDay * 100),
              sanityId: body._id,
              type: body.type as any,
            })
            .onConflictDoNothing({ target: VanTable.sanityId });
        }
        break;

      case 'update':
        {
          await db
            .update(VanTable)
            .set({
              name: body.name,
              pricePerDayInCents: Math.round(body.pricePerDay * 100),
              type: body.type as any,
            })
            .where(eq(VanTable.sanityId, body._id));
        }
        break;

      case 'delete':
        {
          await db.delete(VanTable).where(eq(VanTable.sanityId, body._id));
        }
        break;

      default: {
        return new Response(
          JSON.stringify({ message: 'Unknown Sanity Operation' }),
          { status: 400 },
        );
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message ?? 'Server error', { status: 500 });
  }
}
