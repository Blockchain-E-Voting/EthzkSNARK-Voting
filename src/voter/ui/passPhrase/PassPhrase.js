import React, { Component } from 'react'
import store from '../../../store'
import {  Reveal,Button, Segment } from "semantic-ui-react";



class PassPhrase extends Component {

  constructor(props){
    super(props)
    this.randomString=this.randomString.bind(this)
    this.state = {
      randomString:'',
      output1:'',
      output2:'',
      output3:'',
      output4:'',
      bigintegeroutput1:'',
      bigintegeroutput2:'',
      bigintegeroutput3:'',
      bigintegeroutput4:''
    }
    this.toNextState=this.toNextState.bind(this)

  }

  componentDidMount(){
    this.generatePhase();
  }

  parseBigInt(bigint, base) {
    //convert bigint string to array of digit values
    for (var values = [], i = 0; i < bigint.length; i++) {
      values[i] = parseInt(bigint.charAt(i), base);
    }
    return values;
  }

  formatBigInt(values, base) {
    //convert array of digit values to bigint string
    for (var bigint = '', i = 0; i < values.length; i++) {
      bigint += values[i].toString(base);
    }
    return bigint;
  }

  convertBase(bigint, inputBase, outputBase) {
    //takes a bigint string and converts to different base
    var inputValues = this.parseBigInt(bigint, inputBase),
      outputValues = [], //output array, little-endian/lsd order
      remainder,
      len = inputValues.length,
      pos = 0,
      i;
    while (pos < len) { //while digits left in input array
      remainder = 0; //set remainder to 0
      for (i = pos; i < len; i++) {
        //long integer division of input values divided by output base
        //remainder is added to output array
        remainder = inputValues[i] + remainder * inputBase;
        inputValues[i] = Math.floor(remainder / outputBase);
        remainder -= inputValues[i] * outputBase;
        if (inputValues[i] == 0 && i == pos) {
          pos++;
        }
      }
      outputValues.push(remainder);
    }
    outputValues.reverse(); //transform to big-endian/msd order
    return this.formatBigInt(outputValues, outputBase);
  }



  generatePhase(){

    let str=this.randomString()
    console.log(str);
    this.setState({randomString:str})
    let output1="";
    let output2="";
    let output3=""
    let output4=""
    for (let i=0; i < str.length; i++) {
      if(i<16){
        output1 +="0"+str[i].charCodeAt(0).toString(2);
      }else if (i<32) {
        output2 +="0"+str[i].charCodeAt(0).toString(2);
      }else if (i<48) {
        output3 +="0"+str[i].charCodeAt(0).toString(2);
      }else{
        output4 +="0"+str[i].charCodeAt(0).toString(2);
      }
    }
    this.setState({output1:output1})
    this.setState({output2:output2})
    this.setState({output3:output3})
    this.setState({output4:output4})

    this.setState({bigintegeroutput1:this.convertBase(output1, 2, 10)})
    this.setState({bigintegeroutput2:this.convertBase(output2, 2, 10)})
    this.setState({bigintegeroutput3:this.convertBase(output3, 2, 10)})
    this.setState({bigintegeroutput4:this.convertBase(output4, 2, 10)})

  }

  randomString() {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var randomString = '';
    for (var i = 0; i < 64; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

  toNextState(){
    this.props.onClickNext()
  }



render(){

      return(
        <div>
        <p>
        Since only you control your identity, You will need to save your security phrase.
        this security phrase will never saved in cloud storage. Screenshots are not secure you can make a safe backup
        with physical paper and a pen.
        </p>

        Secret Phrase
        <Segment tertiary>
        --------------------------------------------------------------------------------------------------------------------
        <br/>{this.state.randomString}<br/>
        --------------------------------------------------------------------------------------------------------------------
        </Segment>

          Encoded 512bit version Interpretation
        <Segment tertiary>
        --------------------------------------------------------------------------------------------------------------------
        <br/>{this.state.output1}<br/>{this.state.output2}<br/>{this.state.output3}<br/>{this.state.output4}<br/>
        --------------------------------------------------------------------------------------------------------------------
        </Segment>

        Big Integer Interpretation
        <Segment tertiary>
        --------------------------------------------------------------------------------------------------------------------
        <br/>{this.state.bigintegeroutput1}<br/>{this.state.bigintegeroutput2}<br/>{this.state.bigintegeroutput3}<br/>{this.state.bigintegeroutput4}<br/>
        --------------------------------------------------------------------------------------------------------------------
        </Segment>

        <p>Download the arithmatic circuit and calculate the sha256 hash of the big Integer Representation</p>
        <a href='/sha256hashgenerate.code' download>
        <Button> Download Arithmatic circuit </Button>
        </a>
        <Button onClick={this.toNextState}> Next</Button>
        </div>

      )
  }

}
export default PassPhrase;
