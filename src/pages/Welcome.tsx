import { useConnect, useAccount } from '@puzzlehq/sdk';
import leftImageSrc from '../assets/alex_mic_right_tilt.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '@components/Button.js';

export const Welcome = () => {
  const navigate = useNavigate();
  const { account } = useAccount();
  const { loading, connect } = useConnect();

  useEffect(() => {
    if (account) {
      navigate('/');
    }
  }, [account, navigate]);

  return (
    <div className="flex w-full items-stretch justify-between">
      <div className='flex h-full w-full items-stretch justify-between'>
        <div className='relative flex h-full w-full flex-col items-center justify-center'>
          {/* <img
            src={leftImageSrc}
            alt='Dominion'
            className='fixed right-0 top-0 h-full max-h-[18rem] max-w-[50%] object-contain'
          /> */}
          <h1 className='text-24xl z-10 max-w-full overflow-visible whitespace-nowrap text-center font-extrabold leading-[40.56px] tracking-tight text-primary-white'>
            WHERE'S
            <br />
            DOMINION?
          </h1>
          <p className='z-10 mb-8 mt-8 max-w-[400px] text-center text-base font-bold tracking-tight text-primary-white'>
            A thrilling game showcasing the power of Aleo and the Puzzle
            multiparty privacy stack through a wager between friends!
            Join the FUN!!!
          </p>
          <Button
            className='max-w-[250px]'
            onClick={connect}
            color='yellow'
            disabled={loading}
          >
            {loading ? 'Loading...' : loading ? 'Connecting...' : 'Play!'}
          </Button>
          <img
            src={leftImageSrc}
            alt='Left Dominion'
            className='fixed left-50 top-3/4 h-full max-h-[50%]  max-w-[50%] -translate-y-40 object-contain'
          />
        </div>
      </div>
    </div>
  );
};
