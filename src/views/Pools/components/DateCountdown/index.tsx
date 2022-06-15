import React from 'react';
import styled from "styled-components"

import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};




const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
      <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <p>{value}</p>
        <span className='duration'>{type}</span>
      </div>
    );
  };
  

  const WrapperExpired = styled.div`
.expired-notice {
  text-align: center;
  padding: 2rem;
  border: 1px solid #ebebeb;
  border-radius: 0.25rem;
  margin: 0.5rem;
}

.expired-notice > span {
  font-size: 2.5rem;
  font-weight: bold;
  color: red;
}

.expired-notice > p {
  font-size: 1.5rem;
}


  `
const ExpiredNotice = () => {
  return (
      <WrapperExpired>      
    <div className="expired-notice">
      <span>Waiting Time is Over!</span>
      <p>You can now unstake your hydro</p>
    </div>
      </WrapperExpired>
  );
};

const WrapperCounter = styled.div`
.show-counter {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.show-counter .countdown-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding: 0.5rem;
  text-decoration: none;
  color:${({theme})=> theme.colors.btnColor};
  border-radius:20px;
  background:${({theme})=> theme.colors.btnBackground};
}

.show-counter .countdown {
  line-height: 1.25rem;
  padding: 0 0.75rem 0 0.75rem;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.show-counter .countdown.danger {
  color: green;
}

.show-counter .countdown > p {
  margin: 0;
}

.show-counter .countdown > span {
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1rem;
}

.duration {
  margin-top:0.2rem;
  font-weight:500;
  /* color:green; */
}
`
const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
      <WrapperCounter>
    <div className="show-counter"> 
    <span  className="countdown-link">
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </span>
    </div>
    </WrapperCounter>
  );
};


const StyledShowCounter = styled(ShowCounter)`

`
const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <StyledShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
