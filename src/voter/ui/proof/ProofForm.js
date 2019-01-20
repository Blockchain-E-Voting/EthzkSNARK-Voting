import React, { Component } from 'react'
import store from '../../../store'
import { Button } from 'semantic-ui-react'
import Files from 'react-files'
import { Segment , Header, Icon } from 'semantic-ui-react'

class ProofForm extends Component {

  constructor(props){
    super(props)
    this.handleProofchild=this.handleProofchild.bind(this)
    this.state = {
     jsonFile: {}
   };

    this.fileReader = new FileReader();
    this.fileReader.onload = (event) => {

      // or do whatever manipulation you want on JSON.parse(event.target.result) here.

      this.setState({ jsonFile: event.target.result }, () => {
        //console.log(this.state.jsonFile);
        this.handleProofchild();
      });
    };

  }

  handleProofchild () {
    // console.log("jk")
    this.props.onSubmitProofForm(this.state.jsonFile);
 }




render(){

  return(

<div>

  <a href='/sha256hashgenerate.code' download>
  <Button> Download Arithmatic circuit </Button>
  </a>
  <a href='/sha256hashgenerate.code' download>
  <Button> Download Proving Key </Button>
  </a>
<br/><br/>
<div className="files">
        <Files

         onChange={file => {
             // we choose readAsText() to load our file, and onload
             // event we rigister in this.fileReader would be triggered.
             this.fileReader.readAsText(file[0]);
         }}
        >


          <Segment placeholder>

          <Header icon>
            <Icon name='file code' />
            Drop Proof file here or click to upload
          </Header>

        </Segment>

        </Files>
      </div>

  </div>


  )
}


}

export default ProofForm
