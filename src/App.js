import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import SplashScreen from "./SplashScreen";
import ReposListViewer from "./ReposListViewer";
import RepoDetails from "./RepoDetails";
import LikesContext from "./LikesContext";

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
      this.setState({ isSplash: false });
    }, 3000);

  }

  async getReposList() {
    let response = await fetch("https://api.github.com/users/vladikcoder/repos");
    let reposList = await response.json();

    this.setState({ reposList });
  }

  async getLikesFromServer() {
    let response =  await fetch('http://localhost:5000/api/likestats');
    let likeStats = await response.json();

    this.setState({ likeStats });
  }

  async updateLikesOnServer() {
    let {likeStats} = this.state;

    await fetch('http://localhost:5000/api/like', {
      method: 'POST',
      body: JSON.stringify(likeStats)
    });
  };

  render() {
    let { isSplash, reposList, likeStats } = this.state;

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
        })
      },

      updateServerHandler: async (likeStats) => {
        await fetch('http://localhost:5000/api/like', {
          method: 'POST',
          body: JSON.stringify(likeStats)
        });
      }

    };

    return (
      <LikesContext.Provider value={contextValue}>
        <div className="App">
          {isSplash ? (
            <SplashScreen />
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
                path="/details/:reponame"
                render={props => <RepoDetails {...props} reposList={reposList} />}
              />
            </Switch>
          )}
        </div>
      </LikesContext.Provider>
    );
  }
}

export default App;
