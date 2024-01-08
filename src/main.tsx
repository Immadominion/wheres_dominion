/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PuzzleWalletProvider } from '@puzzlehq/sdk';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='h-screen w-screen'>
    <PuzzleWalletProvider
      dAppName="Where's Dominion?"
      dAppDescription='Inspired by Matt'
      dAppUrl='https://twitter.com/ImmaDominion'
      dAppIconURL='https://twitter.com/ImmaDominion/photo'
    >
      <App />
    </PuzzleWalletProvider>
  </div>
);
