
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import BuyButton from '../components/BuyButton';
import Estimator from '../components/Estimator';
import TierDisplay from '../components/TierDisplay';

export default function Home() {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
    } else {
      alert('Please install MetaMask');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <Head>
        <title>TWY Empire Presale</title>
      </Head>
      <img src="/TWY_Official_Token_Image.png" alt="TWY Logo" width="150" />
      <h1>TWY Presale Portal</h1>
      {address ? <p>Connected: {address}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
      <TierDisplay />
      <Estimator />
      <BuyButton />
    </div>
  );
}
