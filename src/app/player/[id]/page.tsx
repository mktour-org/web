import { getUser } from '@/lib/auth/utils';
import usePlayerQuery from '@/lib/db/hooks/usePlayerQuery';
import useStatusQuery from '@/lib/db/hooks/useStatusQuery';
import { StatusInClub } from '@/lib/db/schema/tournaments';
import { notFound } from 'next/navigation';

export default async function TournamentPage({ params }: PlayerPageProps) {
  const user = await getUser();
  const { player, club } = await usePlayerQuery(params.id);
  if (!player || !club) notFound();
  let status: StatusInClub | undefined | 'owner' = await useStatusQuery({
    user,
    club,
  }); // if defined, this player can be edited by page viewer
  const isOwner = player.user_id === user.id; // the viewer of the page is this player
  if (user)
    return (
      <div className="w-full">
        <pre>{JSON.stringify({ player, club }, null, 2)}</pre>
        <div>
          {status ? (
            <p>you can edit this player because he is from {club.name}</p>
          ) : (
            <p>you cannot edit this player, you are not admin of {club.name}</p>
          )}
        </div>
        <div>
          {isOwner ? <p>this player is you!!</p> : <p>it is NOT you</p>}
        </div>
      </div>
    );
}

export interface PlayerPageProps {
  params: { id: string };
}
