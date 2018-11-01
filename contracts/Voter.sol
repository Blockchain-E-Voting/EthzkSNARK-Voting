pragma solidity ^0.4.23;

contract Voter{
    //voter details
    struct VoterDetails {
        bytes32 name;
        bytes32 nic;
        bytes32 hashOfSecret;
        bool submitted_to_review;
        bool to_be_deleted;
        bool to_be_added;
        bool deleted;
        bool verified;
    }

    uint numVoters;

    mapping (address => VoterDetails) voters;

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }

    //this should be updated by the applicant
    function addVoter(bytes32 name, bytes32 nic, bytes32 hashOfSecret) public returns(bool,bool,bool,bool,bool) {
       //if user doesn't exist
       if(voters[msg.sender].name==0x0){
         voters[msg.sender] = VoterDetails(name,nic,hashOfSecret,false,false,false,false,false);
         numVoters++;
         voters[msg.sender].submitted_to_review = true;
         return (voters[msg.sender].submitted_to_review,voters[msg.sender].to_be_deleted,voters[msg.sender].to_be_added,voters[msg.sender].deleted,voters[msg.sender].verified);
       }
       voters[msg.sender].submitted_to_review = true;
       return (voters[msg.sender].submitted_to_review,voters[msg.sender].to_be_deleted,voters[msg.sender].to_be_added,voters[msg.sender].deleted,voters[msg.sender].verified);

    }

    //query specific voter details
      function getVoter(address voterId) public view returns (bytes32,bytes32, bytes32,bool,bool,bool,bool,bool) {
        VoterDetails memory v = voters[voterId];
        return (v.name,v.nic,v.hashOfSecret,v.submitted_to_review,v.to_be_deleted,v.to_be_added,v.deleted,v.verified);
     }

    //this should be updated by the grama nildari
    function toBeDeleted(address voterAddress) public{
      voters[voterAddress].submitted_to_review = false;
      voters[voterAddress].to_be_added=false;
      voters[voterAddress].to_be_deleted = true;
    }

    //this should be updated by the grama nildari
    function toBeAdded(address voterAddress) public{
      voters[voterAddress].submitted_to_review=false;
      voters[voterAddress].to_be_deleted=false;
      voters[voterAddress].to_be_added=true;
    }

    //this should be updated by the district office
    function deleted(address voterAddress) public{
      voters[voterAddress].submitted_to_review=false;
      voters[voterAddress].to_be_added=false;
      voters[voterAddress].to_be_deleted=false;
      voters[voterAddress].verified=false;
      voters[voterAddress].deleted=true;
    }

    //this should be updated by the district office
    function verified(address voterAddress) public{
      voters[voterAddress].submitted_to_review=false;
      voters[voterAddress].to_be_added=false;
      voters[voterAddress].to_be_deleted=false;
      voters[voterAddress].deleted=true;
      voters[voterAddress].verified=true;
    }



}
