import React from "react";
import { Link } from "react-router-dom";

import LikeSetter from "./LikeSetter";
import "./RepoDetails.css";

const RepoDetails = props => {
  let { reponame } = props.match.params;
  let currentRepo = props.reposList.find(repo => repo.name === reponame);

  let getDate = isoDate => {
    let date = new Date(isoDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="RepoDetails">
      <div className="RepoDetails-header">
        <h2>Repository details </h2><LikeSetter repoName={currentRepo.name} />
      </div>

      <p>
        <b>Name: </b>
        <a href={currentRepo.html_url}>{currentRepo.name}</a>
      </p>
      <p>
        <b>Clone url: </b>
        {currentRepo.clone_url}
      </p>
      <p>
        <b>Created at: </b>
        {getDate(currentRepo.created_at)}
      </p>
      <p>
        <b>Owner: </b>
        <a href={currentRepo.owner.html_url}>{currentRepo.owner.login}</a>
      </p>
      <p>
        <b>Language:</b> {currentRepo.language || "unknown"}
      </p>
      <Link to="/">Back</Link>
    </div>
  );
};

export default RepoDetails;
