import React, { Component } from 'react'
import store from '../../../store'
import Countdown from 'react-countdown-now';
import { Image, Reveal } from "semantic-ui-react";
import Results from '../results/Results'


class ResultCountDown extends Component {

  constructor(props){
    super(props)

  }



render(){

  // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
      // Render a completed state
        return <Results />;
      } else {
      // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
      }
    };


      return(
        <div>
        <Countdown
        date={Date.now() + 5000}
        renderer={ renderer }/>
        </div>
      )
  }

}
export default ResultCountDown;
