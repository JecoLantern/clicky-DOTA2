import React, { Component } from 'react';
import IMGCard from "./components/IMGCard";
import Wrapper from "./components/Wrapper";
import heroes from "./heroes.json";
import NAVBar from "./components/NAVBar/Navbar";
import Scores from "./components/Scores/Scores";
import './App.css';

function shuffler(heroes) {
  for (let i = heroes.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [heroes[i], heroes[j]] = [heroes[j], heroes[i]];
  }
  return heroes;
}

class App extends Component {
  state = {
    heroes: heroes,
    clicked: [],
    score: 0,
    topScore: 0,
    rightWrong: ""
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.initiateReset();
    }
  };

  handleIncrement() {
    let newTopScore;
    newTopScore = this.state.score + 1;
    this.setState({ score: this.state.score + 1, rightWrong: "" })

    if (newTopScore > this.state.topScore) {
      this.setState({ topScore: newTopScore });
    }

    if (newTopScore > this.state.topScore) {
      this.setState({ rightWrong: "You hold the Highest Score!" });
    }

    this.initiateShuffler();
  }

  initiateReset() {
    this.initiateShuffler();
    this.setState({ 
      score: 0,
      topScore: this.state.topScore,
      rightWrong: "Try Again!",
      clicked: []
    })
  }

  initiateShuffler() {
    let newShuffler = shuffler(heroes);
    this.setState({ heroes: newShuffler })
  }

  render() {
    return (
      <div>
        <NAVBar />
        <Scores 
          score={this.state.score}
          rightWrong={this.state.rightWrong}
          topScore={this.state.topScore}
        />
        <Wrapper>
          {this.state.heroes.map(heroes => (
            <IMGCard
              id={heroes.id}
              key={heroes.id}
              image={heroes.image}
              handleClick={this.handleClick}
              handleIncrement={this.handleIncrement}
              initiateReset={this.initiateReset}
              initiateShuffler={this.initiateShuffler}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
