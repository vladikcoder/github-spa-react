import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import LikeSetter from './LikeSetter';
import LoadingDots from './LoadingDots';
import './RepoDetails.css';

class RepoDetails extends Component {
  state = {
    cloneUrl: '',
    createdAt: '',
    language: '',
    currentRepo: this.getCurrentRepo()
  };

  componentDidMount() {
    this.setExtraDetails();
  }

  getCurrentRepo() {
    let {owner, repository} = this.props.match.params;
    let currentRepo = this.props.reposList.find(repo => repo.full_name === `${owner}/${repository}`);

    return currentRepo;
  }

  async setExtraDetails() {
    let {url} = this.state.currentRepo;
    let request = await fetch(url);
    let extraDetails = await request.json();

    this.setState({
      cloneUrl: extraDetails.clone_url,
      createdAt: extraDetails.created_at,
      language: extraDetails.language,
    });
  }

  getDate = isoDate => {
    let date = new Date(isoDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  render() {
    let {cloneUrl, createdAt, language, currentRepo} = this.state;

    return (
      <div className="RepoDetails">


        <div className="RepoDetails-header">
          <h2>Repository details </h2><LikeSetter repoName={currentRepo.full_name}/>
        </div>


        <div className="RepoDetails-infoblock">
          <p className="RepoDetails-infoblock-header">Name</p>
          <p className="RepoDetails-infoblock-content">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={currentRepo.html_url}
            >
              {currentRepo.name}
            </a>
          </p>
        </div>

        <div className="RepoDetails-infoblock">
          <p className="RepoDetails-infoblock-header">Description</p>
          <p className="RepoDetails-infoblock-content">
            {currentRepo.description || 'none'}
          </p>
        </div>

        <div className="RepoDetails-infoblock">
          <p className="RepoDetails-infoblock-header">Clone url</p>
          <p className="RepoDetails-infoblock-content">
            {cloneUrl ? cloneUrl : <LoadingDots/>}
          </p>
        </div>

        <div className="RepoDetails-infoblock">
          <p className="RepoDetails-infoblock-header">Created at</p>
          <p className="RepoDetails-infoblock-content">
            {createdAt ? this.getDate(createdAt) : <LoadingDots/>}
          </p>
        </div>

        <div className="RepoDetails-infoblock">
          <p className="RepoDetails-infoblock-header">Owner</p>
          <p className="RepoDetails-infoblock-content">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={currentRepo.owner.html_url}
            >
              {currentRepo.owner.login}
            </a>
          </p>
        </div>

        <div className="RepoDetails-infoblock">
          <p className="RepoDetails-infoblock-header">Language</p>
          <p className="RepoDetails-infoblock-content">
            {language ? (
              language
            ) : (language === null ? (
                'Unknown'
              ) : (
                <LoadingDots/>
              )
            )}
          </p>
        </div>

        <Link className="RepoDetails-back-btn" to="/">← Back</Link>
      </div>
    );
  }
};

export default RepoDetails;
