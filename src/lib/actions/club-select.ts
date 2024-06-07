'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/auth';
import { eq } from 'drizzle-orm';

const handleClubSelect = async (clubId: string, userId: string) => {
  try {
    await db
      .update(users)
      .set({ selected_club: clubId })
      .where(eq(users.id, userId));
  } catch (e) {
    console.error('Error updating selected club:', e);
  }
};

export default handleClubSelect;