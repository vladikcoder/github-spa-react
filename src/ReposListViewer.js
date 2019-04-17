import React, { Component } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

import LikeSetter from "./LikeSetter";
import "./ReposListViewer.css";

class ReposListViewer extends Component {
  state = {
    query: "",
    likeStats: this.props.likeStats
  };

  filterBy(array, byField, query) {
    let reg = new RegExp(query, "i");

    return array.filter(repo => reg.test(repo[byField]));
  }

  inputHandler = event => {
    let { value } = event.target;
    let debouncedQuery = debounce(() => this.setState({ query: value }), 800);
    debouncedQuery();
  };

  render() {
    let { reposList } = this.props;
    let { query } = this.state;
    reposList = this.filterBy(reposList, "name", query);

    return (
      <div className="ListViewer">
        <h2>
          <a href="https://github.com/vladikcoder">Vladikcoder</a>'s GitHub
          repositories
        </h2>
        <input onChange={this.inputHandler} placeholder=" Filter by name ..." />

        <div className="ListViewer-container">
          {reposList.map((repo) => (
            <div key={repo.name} className="ListViewer-item">
              <Link to={`/details/${repo.name}`}>
                <p>{repo.name}</p>
              </Link>{" "}
              <LikeSetter repoName={repo.name} />
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ReposListViewer;
