import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import SplashScreen from './SplashScreen';
import ReposListViewer from './ReposListViewer';
import RepoDetails from './RepoDetails';
import LikesContext from './LikesContext';

class App extends Component {
  state = {
    isSplash: true,
    reposList: [],
    likeStats: {}
  };

  componentDidMount() {
    this.getReposList();
    this.getLikesFromServer();
    setTimeout(() => {
      this.setState({isSplash: false});
    }, 3000);
    this.getReposList = this.getReposList.bind(this);
    this.getReposByQuery = this.getReposByQuery.bind(this);
  }

  async getReposList() {
    let sinceRandom = Math.floor(Math.random() * 182000000);
    let response = await fetch(`https://api.github.com/repositories?since=${sinceRandom}`);
    let reposList = await response.json();
    reposList = reposList.slice(0, 20);

    this.setState({reposList});
  }

  async getReposByQuery(query) {
    let response = await fetch(`https://api.github.com/search/repositories?q=${query}+in:name&per_page=20`);
    let reposList = await response.json();
    reposList = reposList.items;

    this.setState({reposList});

    return reposList.length;
  }

  async getLikesFromServer() {
    let response = await fetch('http://localhost:5000/api/likestats');
    let likeStats = await response.json();

    this.setState({likeStats});
  }

  async updateLikesOnServer() {
    let {likeStats} = this.state;

    await fetch('http://localhost:5000/api/like', {
      method: 'POST',
      body: JSON.stringify(likeStats)
    });
  };

  render() {
    let {isSplash, reposList, likeStats} = this.state;

    let contextValue = {
      likeStats,

      updateHandler: (event, updSign, repoName, updateServerHandler) => {
        this.setState(prevState => {
          let newLikeStats = {...prevState.likeStats};

          if (updSign) {
            newLikeStats[repoName] = (+newLikeStats[repoName] || 0) + 1;
          } else {
            newLikeStats[repoName] = (+newLikeStats[repoName] || 0) - 1;
          }

          updateServerHandler(newLikeStats);

          return {
            ...prevState,
            likeStats: newLikeStats
          };
        });
      },

      updateServerHandler: async (likeStats) => {
        await fetch('http://localhost:5000/api/like', {
          method: 'POST',
          body: JSON.stringify(likeStats)
        });
      },

      getReposHandler: this.getReposList,
      getByQueryHandler: this.getReposByQuery

    };

    return (
      <LikesContext.Provider value={contextValue}>
        <div className="App">
          {isSplash ? (
            <SplashScreen/>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <ReposListViewer
                    {...props}
                    reposList={reposList}
                  />
                )}
              />

              <Route
                path="/details/:owner/:repository"
                render={props => <RepoDetails {...props} reposList={reposList}/>}
              />
            </Switch>
          )}
        </div>
      </LikesContext.Provider>
    );
  }
}

export default App;
