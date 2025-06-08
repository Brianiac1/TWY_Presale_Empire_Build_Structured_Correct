
import { useEffect, useState } from 'react';

const Countdown = ({ endDate, label }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = new Date(endDate) - now;
      if (distance <= 0) {
        setTimeLeft("⏱ Ended");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      <h3>{label}</h3>
      <p>{timeLeft}</p>
    </div>
  );
};

export default Countdown;
