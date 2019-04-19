import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import LikeSetter from './LikeSetter';
import LoadingCircle from './LoadingCircle';
import LikesContext from './LikesContext';

import refreshLogo from './img/refresh.png';
import sadCatLogo from './img/octocat-sad.png';
import './ReposListViewer.css';

class ReposListViewer extends Component {
  state = {
    query: '',
    likeStats: this.props.likeStats,
    listStatus: 'loading'
  };

  static contextType = LikesContext;

  componentDidMount() {
    let {reposList} = this.props;

    if (reposList.length) {
      this.setState({listStatus: 'ok'});
    }
  }

  componentDidUpdate() {
    let {reposList} = this.props;

    this.setState(prevState => {
      if (reposList.length && prevState.listStatus !== 'ok') {
        return {listStatus: 'ok'};
      }
    });
  }

  refreshHandler = () => {
    this.setState({query: ''});
    this.context.getReposHandler();
  };

  inputHandler = (event) => {
    let {value} = event.target;

    this.setState({query: value});
  };

  queryHandler = async event => {
    let {query} = this.state;

    if (event.key !== 'Enter') {
      return;
    }

    if (query === '') {
      this.context.getReposHandler();
      return;
    }

    let {getByQueryHandler} = this.context;

    getByQueryHandler(query).then(responseLength => {
      if (!responseLength) {
        console.log('bad');
        this.setState({listStatus: 'bad-query'});
      }
    });

  };

  render() {
    let {reposList} = this.props;
    let {query, listStatus} = this.state;

    return (
      <div className="ListViewer">
        <h2>Repositories explorer App</h2>

        <div className="ListViewer-topbar">
          <img
            onClick={this.refreshHandler}
            src={refreshLogo}
            width="20px"
            alt="refresh-btn"
          />
          <input
            onChange={this.inputHandler}
            onKeyUp={this.queryHandler}
            value={query}
            placeholder=" Filter by name ..."
          />
        </div>

        <div className="ListViewer-container">
          {listStatus === 'ok' && (
            <ol className="ListViewer-ol">
              {reposList.map((repo) => (
                <li key={repo.full_name}>
                  <Link to={`/details/${repo.full_name}`}>
                    <p>{repo.name}</p>
                  </Link>{' '}
                  <LikeSetter repoName={repo.full_name}/>
                </li>
              ))}
            </ol>
          )}

          {listStatus === 'bad-query' && (
            <div className="ListViewer-bad-query">
              <img
                width="50%"
                src={sadCatLogo}
                alt="bad-query-logo"
              />
              <p>No such matches by your query :(</p>
            </div>
          )}

          {listStatus === 'loading' && (
            <div className="ListViewer-loading">
              <LoadingCircle/>
            </div>
          )}

        </div>
      </div>
    );
  }
}

export default ReposListViewer;
