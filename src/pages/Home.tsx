import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import TotalWinnings from '@components/TotalWinnings';
import TheirTurn from '@components/TheirTurn';
import YourTurn from '@components/YourTurn';
import { useGameStore } from '@state/gameStore';
import { useNewGameStore } from './NewGame/store';
import { useAccount } from '@puzzlehq/sdk';

import rightImageSrc from '../assets/puzzle_tilt_right.png';

function Home() {
  const [yourTurn, theirTurn, totalBalance] = useGameStore((state) => [
    state.yourTurn,
    state.theirTurn,
    state.totalBalance,
  ]);
  const [initialize] = useNewGameStore((state) => [state.initialize]);
  const { account } = useAccount();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-4 px-1 flex-grow'>
        <TotalWinnings amount={totalBalance} />
        <Button
          color='yellow'
          onClick={() => {
            if (!account) return;
            initialize(account?.address);
            navigate('/new-game');
          }}
          disabled={!account}
        >
          NEW GAME
        </Button>
        {yourTurn.length > 0 && <YourTurn games={yourTurn} />}
        {theirTurn.length > 0 && <TheirTurn games={theirTurn} />}
        {yourTurn.length === 0 && theirTurn.length === 0 && (
          <p className='self-center font-semibold'>
            No ongoing games, start one with a friend!
          </p>
        )}
      </div>
      <div className='mt-8 px-4 pb-4 text-center relative'>
        {/* Adjusted styles to move the image down */}
        <img
          src={rightImageSrc}
          alt='Left Dominion'
          className='absolute left-1/2 transform -translate-x-1/2 -bottom-[0rem] h-[30rem] w-[40%] object-contain md:-translate-y-10-x-10'
        />
        <Button color='blue' size='sm'>
          Past Games
        </Button>
      </div>
    </div>
  );
}

export default Home;
