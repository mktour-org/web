import { DashboardContext } from '@/app/tournament/[id]/dashboard-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FC, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const TournamentTable: FC = () => {
  const { players } = useContext(DashboardContext);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const tableResultTitles = ['Wins', 'Draws', 'Losses'];

  const TableResultHeads = () => {
    const shortenTitle = (title: string) =>
      isMobile ? title.slice(0, 1) : title;
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
          {players.map((player, i) => (
            <TableRow key={player.player_id}>
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
  );
};

export default TournamentTable;
