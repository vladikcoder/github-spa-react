import React from 'react';
import './LoadingDots.css';

const LoadingCircle = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingCircle;
