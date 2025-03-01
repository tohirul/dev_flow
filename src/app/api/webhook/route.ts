import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { SIGNING_SECRET } from '@/lib/config';
import { createUser, deleteUser, updateUser } from '@/server/actions/user.action';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';

import { Webhook } from 'svix';

export async function POST(req: Request) {
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env');
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400
    });
  }

  // Do something with payload
  const eventType = evt.type;
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data as UserJSON;

    const userData = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      username: username!,
      picture: image_url,
      bio: '',
      address: '',
      portfolioWebsite: '',
      reputatio: 0
    };

    const response = await createUser(userData);
    const data = await response.json();

    return NextResponse.json({ message: 'Ok', user: data });
  } else if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data as UserJSON;
    const userData = {
      clerkId: id,
      updateData: {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        username: username!,
        picture: image_url
      },
      path: `/profile/${id}`
    };
    const response = await updateUser(userData);
    const data = await response.json();
    return NextResponse.json({ message: 'Ok', user: data });
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data;

    const response = await deleteUser({ clerkId: id as string });
    const data = await response.json();
    return NextResponse.json({ message: 'Ok', user: data });
  }
}
