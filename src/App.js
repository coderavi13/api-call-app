import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ReactPlayer from "react-player";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "coderavi13",
      userList: [],
      showDetail: false,
      userObject: {}
    };
  }

  handleChange = event => {
    this.setState({
      userName: event.target.value
    });
  };

  getData = data => {
    axios
      .get("https://api.github.com/search/users", {
        params: { q: data }
      })
      .then(apiResponse => {
        console.log("ApiResponse", apiResponse.data.items);
        this.setState({
          showDetail: false,
          userList: apiResponse.data.items
        });
      })
      .catch(error => console.log("Error", error));
  };

  displayUserData = userData => {
    this.setState({
      showDetail: true,
      userObject: userData
    });
  };

  render() {
    return (
      <React.Fragment>
        <label className="label">Enter username to search on github</label>
        <input
          value={this.state.userName}
          type="text"
          onChange={this.handleChange}
        />
        <button
          className="button"
          onClick={() => this.getData(this.state.userName)}
        >
          Click to Search
        </button>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=UX2kf-XngE0"
          playing={false}
          controls
        />

        <div className="left">
          {
            <ul>
              {this.state.userList.map((user, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => this.displayUserData(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.login}
                  </li>
                );
              })}
            </ul>
          }
        </div>

        <div className="right">
          {this.state.showDetail && (
            <div>
              <label>Score :</label> <div> {this.state.userObject.score}</div>
              <label>Id :</label><div> {this.state.userObject.id}</div>
              <img src={this.state.userObject.avatar_url} />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
