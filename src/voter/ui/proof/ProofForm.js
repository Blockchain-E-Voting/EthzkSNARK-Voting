import React, { Component } from 'react'
import store from '../../../store'
import { Button } from 'semantic-ui-react'

class ProofForm extends Component {

  constructor(props){
    super(props)
    this.handleProofchild=this.handleProofchild.bind(this)

  }

  handleProofchild () {
    // console.log("jk")
    this.props.onSubmitProofForm();
 }




render(){

  return(


  <Button onClick = { this.handleProofchild }>Click Here</Button>


  )
}


}

export default ProofForm
