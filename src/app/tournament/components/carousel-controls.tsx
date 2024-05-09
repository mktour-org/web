import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

const CarouselControls: FC<any> = ({ props }) => {
  const { roundInView, games, setRoundInView, api, currentRound } = props;

  const handleClick = (direction: string) => {
    const lastIndex = games.length - 1;
    let newRoundInView;
    if (direction === '<') {
      newRoundInView = roundInView === 0 ? lastIndex : roundInView - 1;
    } else if (direction === '>') {
      newRoundInView = roundInView === lastIndex ? 0 : roundInView + 1;
    }
    setRoundInView(newRoundInView);
  };

  return (
    <div className="flex w-full px-4">
      <Button
        disabled={roundInView === 0}
        onClick={() => handleClick('<')}
        variant="ghost"
        size="sm"
        className="m-2"
      >
        <ChevronLeft />
      </Button>
      <div className="flex w-full flex-col items-center justify-center">
        <Button
          variant="ghost"
          size={'sm'}
          onClick={() => api?.scrollTo(currentRound)}
        >
          <span
            className={
              roundInView === currentRound ? 'underline underline-offset-4' : ''
            }
          >
            Round {roundInView + 1}
          </span>
        </Button>
      </div>
      <Button
        disabled={roundInView === games.length - 1}
        onClick={() => handleClick('>')}
        variant="ghost"
        size="sm"
        className="m-2"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default CarouselControls;
