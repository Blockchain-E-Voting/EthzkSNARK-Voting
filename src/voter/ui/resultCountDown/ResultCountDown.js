import React, { Component } from 'react'
import store from '../../../store'
import Countdown from 'react-countdown-now';
import { Image, Reveal, Label } from "semantic-ui-react";
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
      return <div>
      <div className='rows'>
      <div className='row'>
       <span>
       <Label  style={{ fontSize: 50, color: '#ad6969' }}>{hours}h:</Label>
       <Label  style={{ fontSize: 50, color: '#ad6969' }}>{minutes}m:</Label>
       <Label  style={{ fontSize: 50, color: '#ad6969' }}> {seconds}s </Label>
       </span>
       </div>
     </div>
     </div>;
      }
    };


      return(
        <div>
        Your vote was successful. <br/>Thanks for voting. Please note down your vote id<br/>
        Your vote id is: {this.props.voteId}
        <Countdown
        date={Date.now() + 15000}
        renderer={ renderer }/>
        </div>
      )
  }

}
export default ResultCountDown;
