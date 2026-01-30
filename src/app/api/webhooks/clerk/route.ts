import db from '@/db';
import { UserTable } from '@/db/schema';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    switch (eventType) {
      case 'user.created':
        {
          const email = evt.data.email_addresses.find(
            (e) => e.id === evt.data.primary_email_address_id,
          )?.email_address;

          if (!email) {
            return new Response('No Email Address', { status: 400 });
          }
          await db
            .insert(UserTable)
            .values({
              clerkUserId: id,
              email,
              name: `${evt.data.first_name} ${evt.data.last_name}`,
              imageUrl: evt.data.image_url,
            })
            .onConflictDoNothing({ target: UserTable.email });
        }
        break;

      case 'user.deleted':
        {
          if (id != null) {
            await db.delete(UserTable).where(eq(UserTable.clerkUserId, id));
          }
        }
        break;
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
