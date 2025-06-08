
import { ethers } from 'ethers';
import PresaleAbi from '../abis/Presale.json';

const ClaimButton = () => {
  const claimTokens = async () => {
    if (!window.ethereum) return alert("Install MetaMask.");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS, PresaleAbi, signer);
    try {
      const tx = await contract.claim();
      await tx.wait();
      alert("Tokens claimed!");
    } catch (e) {
      alert("Claim failed. Only eligible wallets can claim.");
    }
  };

  return (
    <div>
      <h2>Claim $TWY</h2>
      <button onClick={claimTokens}>Claim Tokens</button>
    </div>
  );
};

export default ClaimButton;
