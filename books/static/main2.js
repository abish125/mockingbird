console.clear();

//Child Component / Profile (Functional Component)
const Profile = (props) => {
  const classes = props.selected ? 'bold' : '';
  return (
    <li onClick={ props.onClick } className={classes}>
      <i className="fa fa-user"></i> { props.user.name } 
    </li>
  );
};

//Child Component /  (Functional Component)
const Selection = (props) => {
    return (
      <ul>
        <li><i className="fa fa-book fa-fw"></i> Name: {props.user.name}</li>
        <li><i className="fa fa-user fa-fw"></i> Username: { props.user.username }</li>
		<li><i className="fa fa-phone fa-fw"></i> Phone: {props.user.phone}</li>
        <li><i className="fa fa-envelope fa-fw"></i> Email: <a href={"mailto:"+props.user.email}>{props.user.email}</a></li>
      </ul>
    );
};
//Main Component / Parent Component / App (Class Based Component)
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { users: [], userId: null, user: null };
  }
  
  componentWillMount() {
    $.get('http://jsonplaceholder.typicode.com/users')
    .then((users) => { 
      this.setState({ users }); 
    });
  }
  
  handleProfileClick(user){
    this.setState({ userId: user.id, user: user });
  }
  handleButtonClick(){
    this.setState({ userId: null, user: null });
  }
  
  renderSelection(){
    return (
      <div className='selection'>
        <Selection user={this.state.user}/>
        <button onClick={() => {this.handleButtonClick()}}>Close Profile</button>
      </div>
    )
  }
  
  renderProfiles(){
    return this.state.users.map((user) => {
      return (
        <Profile
          selected = {user.id === this.state.userId}
          key = {user.id} 
          user = {user} 
          onClick = { () => {this.handleProfileClick(user)} }
        />
      );
    });
  }
  
  render(){
    return (
      <div>
        <h3>Employee Directory</h3>
        {(this.state.user) ? this.renderSelection() : null }
        {this.renderProfiles()}
      </div>
    );
  }
}

ReactDOM.render( <App />, document.querySelector("#container"));