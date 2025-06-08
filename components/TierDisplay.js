
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PresaleAbi from '../abis/Presale.json';

const TierDisplay = () => {
  const [tier, setTier] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchTier = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);

      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS, PresaleAbi, provider);
      try {
        const tierLevel = await contract.getTier(userAddress);
        setTier(Number(tierLevel));
      } catch (error) {
        console.error("Tier read failed:", error);
        setTier(0);
      }
    };
    fetchTier();
  }, []);

  return (
    <div>
      <h2>Tier Status</h2>
      {address && (
        <p>
          {tier === 1 ? "🟢 Tier 1 — $0.002" : tier === 2 ? "🟡 Tier 2 — $0.004" : "🔴 Not Whitelisted"}
        </p>
      )}
    </div>
  );
};

export default TierDisplay;
