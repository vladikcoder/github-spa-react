import React from 'react';
import ghLogo from './img/gh-logo.png';

let splashStyle = {
  margin: '100px 0'
};

const SplashScreen = () => {
  return (
    <div style={splashStyle}>
      <img
        max-width="300px"
        width="30%"
        src={ghLogo}
        alt="github-logo"
      />
      <h1>GitHub App</h1>
      <p><i>by Polyakov Vladyslav</i></p>
    </div>
  );
};

export default SplashScreen;
