
import { useEffect, useState } from 'react';

const Estimator = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [estimatedTWY, setEstimatedTWY] = useState(0);
  const [ethPrice, setEthPrice] = useState(2650);

  useEffect(() => {
    const fetchETHPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await res.json();
        setEthPrice(data.ethereum.usd);
      } catch {
        console.error('Fallback to 2650');
      }
    };
    fetchETHPrice();
  }, []);

  useEffect(() => {
    if (!isNaN(parseFloat(ethAmount))) {
      const tokens = (parseFloat(ethAmount) * ethPrice) / 0.002;
      setEstimatedTWY(tokens.toFixed(0));
    } else {
      setEstimatedTWY(0);
    }
  }, [ethAmount, ethPrice]);

  return (
    <div>
      <h2>Live $TWY Estimator</h2>
      <input value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} placeholder="ETH Amount" />
      <p>Current ETH Price: ${ethPrice.toFixed(2)}</p>
      <p>Estimated $TWY: ~{estimatedTWY}</p>
    </div>
  );
};

export default Estimator;
