import React from 'react';
import Data from './Data_3';
import Sparkline from './Sparkline';
import Timeline from './Timeline';
import Handoff_2 from './Handoff_2';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';




//Child Component / Profile (Functional Component)
const Profile = (props) => {
  const classes = props.selected ? 'bold' : '';
  return (
    <div>
    { props.user.name } { props.user.mrn }
    <NavItem onClick={ props.onHandoff_2TestClick } className={classes}>
      <i className="fa fa-user"></i> Handoff_2 Test
    </NavItem>
    </div>
  );
};

const Handoff_2Tests = (props) => {
    return (
      <div>
        <div>
        <h4>Handoff_2 Test:</h4>
            <Handoff_2 data={props.user} key={props.mrn} title = {'Handoff_2test'}/>
        </div>
      </div>
    );
};

//Main Component / Parent Component / App (Class Based Component)
class App2 extends React.Component {
  constructor(props){
    super(props);
    this.state = { users: Data, userId: null, user: null, sparkline:null };
    //console.log(this.state.users)
  }
  

  handleHandoff_2TestClick(user){
    this.setState({ userId: null, user: null, sparkline: null, timeline:null, handoff:null, Handoff_2:null })
    this.setState({ userId: user.mrn, user: user, sparkline: null, timeline:null, handoff:null, Handoff_2:user }); //timeline is turned off. to activate set timeline to user.
  }

  handleButtonClick(){
    this.setState({ userId: null, user: null, sparkline:null, Handoff_2:null  });
  }
  
  renderHandoff_2(){
    return (
      <div className='Handoff_2'>
        <Handoff_2Tests user={this.state.user} key={this.state.user.name}/>
        <button onClick={() => {this.handleButtonClick()}}>Close Profile</button>
      </div>
    )
  }
 
  renderProfiles(){
    return this.state.users.map((user) => {
      return (
        <Profile key={user.name} selected={user.mrn === this.state.userId} user={user} onHandoff_2TestClick={ () => {this.handleHandoff_2TestClick(user)}} onHandoffClick={ () => {this.handleHandoffClick(user)}} onTimelineClick={ () => {this.handleTimelineClick(user)}} onSparklineClick={ () => {this.handleSparklineClick(user)} } />
      );
    });
  }
  
  render(){
    return (
      <Grid>
        <h3>Patient List</h3>
        <Nav bsStyle="pills" stacked activeKey={1}> {this.renderProfiles()} </Nav>
        {(this.state.Handoff_2) ? this.renderHandoff_2() : null }
      </Grid>
    );
  }
}


export default App2