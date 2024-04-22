import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <p style={{fontWeight:"bold"}}>Thời gian hiện tại: {time.toLocaleTimeString()}</p>
    </div>
  );
};

export default Clock;
