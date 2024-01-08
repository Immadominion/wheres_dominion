import { useDisconnect, shortenAddress, useAccount } from '@puzzlehq/sdk';
import Button from './Button';
import { useGameStore } from '@state/gameStore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const AppHeader = () => {
  const { account } = useAccount();
  const { disconnect, loading } = useDisconnect();
  const navigate = useNavigate();

  const initialText = 'Imma?';
  const [animatedText, setAnimatedText] = useState('');
  const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    let currentIndex = 0;

    const animationInterval = setInterval(() => {
      setAnimatedText((prevText) => {
        if (isForward) {
          // Forward animation
          return prevText === initialText
            ? initialText
            : initialText.substring(0, currentIndex + 1);
        } else {
          // Reverse animation
          return prevText === ''
            ? ''
            : initialText.substring(0, initialText.length - currentIndex);
        }
      });

      currentIndex++;

      if (currentIndex === initialText.length + 1) {
        currentIndex = 0;
        setIsForward((prevIsForward) => !prevIsForward);
      }
    }, 200); // Adjust the interval duration as needed

    return () => clearInterval(animationInterval);
  }, [initialText, isForward]);

  return (
    <div className='flex w-full items-stretch justify-between gap-5 p-4'>
      {account && account.address ? (
        <>
          <button
            onClick={() => {
              useGameStore.getState().clearFlowStores();
              navigate('/');
            }}
          >
            <span className='text-white font-bold text-xl leading-tight'>
              <span className='ml-1'>Where is</span> <br />
              <span className='ml-1 text-pink-500 font-extrabold text-2xl'>
                {animatedText}
              </span>
            </span>
          </button>
          <Button
            size='sm'
            color='white'
            className='w-fit'
            onClick={disconnect}
            disabled={loading}
          >
            {shortenAddress(account.address)}
          </Button>
        </>
      ) : (
        <div className='w-full self-stretch' />
      )}
    </div>
  );
};
