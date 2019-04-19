import React from 'react';
import LikesContext from './LikesContext';
import './LikeSetter.css';

const LikeSetter = ({repoName}) => {
  return (
    <LikesContext.Consumer>
      {value => {
        let {likeStats, updateHandler, updateServerHandler} = value;

        return (

          <span className="LikeSetter">
              <b className="LikeSetter-up" onClick={(event) => {
                updateHandler(event, true, repoName, updateServerHandler);
              }}>
                +
              </b>

            {` ${likeStats[repoName] || 0} `}

            <b className="LikeSetter-down" onClick={(event) => {
              updateHandler(event, false, repoName, updateServerHandler);
            }}>
                -
              </b>
            </span>

        );
      }}
    </LikesContext.Consumer>
  );
};

export default LikeSetter;