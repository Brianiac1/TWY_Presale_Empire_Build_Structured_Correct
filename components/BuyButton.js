
import { useState } from 'react';
import { ethers } from 'ethers';
import PresaleAbi from '../abis/Presale.json';

const BuyButton = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [usdcAmount, setUsdcAmount] = useState('');

  const presaleAddress = process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS;
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const buyWithETH = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const presale = new ethers.Contract(presaleAddress, PresaleAbi, signer);
    const value = ethers.parseEther(ethAmount);
    const balance = await signer.getBalance();

    if (balance < value) return alert("Not enough ETH.");
    const tx = await presale.buyWithETH({ value });
    await tx.wait();
    alert("Purchased with ETH!");
  };

  const buyWithUSDC = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const presale = new ethers.Contract(presaleAddress, PresaleAbi, signer);
    const usdc = new ethers.Contract(usdcAddress, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);
    const amountIn = ethers.parseUnits(usdcAmount, 6);
    const tx1 = await usdc.approve(presaleAddress, amountIn);
    await tx1.wait();
    const tx2 = await presale.buyWithUSDC(amountIn);
    await tx2.wait();
    alert("Purchased with USDC!");
  };

  return (
    <div>
      <h2>Buy with ETH</h2>
      <input value={ethAmount} onChange={e => setEthAmount(e.target.value)} placeholder="ETH Amount" />
      <button onClick={buyWithETH}>Buy with ETH</button>
      <h2>Buy with USDC</h2>
      <input value={usdcAmount} onChange={e => setUsdcAmount(e.target.value)} placeholder="USDC Amount" />
      <button onClick={buyWithUSDC}>Buy with USDC</button>
    </div>
  );
};

export default BuyButton;
