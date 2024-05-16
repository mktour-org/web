'use client';

import { DashboardContext } from '@/app/tournament/[id]/dashboard-context';
import { onClickRemovePlayer } from '@/app/tournament/components/helpers/on-click-handlers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTournamentStore } from '@/lib/hooks/use-tournament-store';
import { FC, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const TournamentTable: FC = () => {
  const tournament = useTournamentStore();
  const { sendJsonMessage } = useContext(DashboardContext)
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const tableResultTitles = ['wins', 'draws', 'losses'];

  const TableResultHeads = () => {
    const shortenTitle = (title: string) =>
      // FIXME:
      // isMobile ? title.slice(0, 1) : title;
      title.slice(0, 1);
    return (
      <>
        {tableResultTitles.map((title) => (
          <TableHead key={title} className="p-1">
            {shortenTitle(title)}
          </TableHead>
        ))}
      </>
    );
  };

  const TableResultCell: FC<{ stat: number | null }> = ({ stat }) => (
    <TableCell className="p-1 font-medium">{stat}</TableCell>
  );

  return (
    <div>
      <div className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-2">#</TableHead>
              <TableHead className="pl-0">Name</TableHead>
              <TableResultHeads />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournament.players?.map((player, i) => (
              <TableRow key={player.id} onClick={() => onClickRemovePlayer(player.id, tournament, sendJsonMessage)}>
                <TableCell className="font-small p-2">{i + 1}</TableCell>
                <TableCell className="font-small max-w-[150px] truncate pl-0">
                  {player.nickname}
                </TableCell>
                <TableResultCell stat={player.wins} />
                <TableResultCell stat={player.draws} />
                <TableResultCell stat={player.losses} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TournamentTable;
