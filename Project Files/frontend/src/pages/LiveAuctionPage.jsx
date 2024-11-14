import React, { Component } from 'react';

class LiveAuctionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: props.initialPrice,
      bidPrice: props.initialPrice,
      timer: 60
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer > 0 ? prevState.timer - 1 : 0
      }), () => {
        if (this.state.timer === 0) {
          clearInterval(this.timerInterval);
          console.log('Auction ended. Final price:', this.state.currentPrice);
        }
      });
    }, 1000);
  };

  resetTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ timer: 60 });
    this.startTimer();
  };

  handleIncrement = (fraction) => {
    const incrementValue = this.state.currentPrice * fraction;
    this.setState({ bidPrice: this.state.currentPrice + incrementValue });
  };

  placeBid = () => {
    if (this.state.bidPrice > this.state.currentPrice) {
      this.setState({ currentPrice: this.state.bidPrice });
      this.resetTimer();
    }
  };

  render() {
    return (
      <div className="auction-page">
        <h2>Live Auction</h2>
        <img src={this.props.productImage} alt="Product" className="product-image" />
        
        <div className="price-section">
          <h3>Current Price: ${this.state.currentPrice.toFixed(2)}</h3>
          <p>To Pay: ${this.state.bidPrice.toFixed(2)}</p>
        </div>
        
        <div className="increments">
          <button onClick={() => this.handleIncrement(1 / 8)}>+1/8</button>
          <button onClick={() => this.handleIncrement(1 / 4)}>+1/4</button>
          <button onClick={() => this.handleIncrement(1 / 2)}>+1/2</button>
          <button onClick={() => this.handleIncrement(1)}>+1</button>
        </div>
        
        <button onClick={this.placeBid} className="place-bid">
          Place Bid
        </button>
        
        <div className="timer">
          <p>Time Left: {this.state.timer}s</p>
        </div>
        
        <style jsx>{`
          .auction-page {
            text-align: center;
            font-family: 'Georgia', serif;
            background-color: #f5f0e1;
            color: #5d4037;
            padding: 20px;
            border: 2px solid #d7c4a1;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }

          h2 {
            font-size: 2em;
            color: #4e342e;
            margin-bottom: 10px;
          }

          .product-image {
            width: 300px;
            height: auto;
            border: 2px solid #a1887f;
            border-radius: 4px;
            margin-bottom: 20px;
          }

          .price-section {
            margin: 20px 0;
            background-color: #e1d7c6;
            padding: 10px;
            border-radius: 4px;
            color: #5d4037;
          }

          .increments button, .place-bid {
            margin: 5px;
            padding: 10px 20px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            color: #fff;
            background-color: #6d4c41;
            border: none;
            border-radius: 4px;
            transition: background-color 0.3s;
          }

          .increments button:hover, .place-bid:hover {
            background-color: #5d4037;
          }

          .timer {
            font-size: 1.2em;
            margin-top: 10px;
            font-weight: bold;
            color: #d32f2f;
          }
        `}</style>
      </div>
    );
  }
}

export default LiveAuctionPage;
