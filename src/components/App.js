import {
 Route, Redirect, Switch, Link, IndexRoute 
} from 'react-router-dom';
import Objectives from './ui/Objectives';
import Users from './ui/Users';
import '../../stylesheets/APP.scss';

const Home = () => (
<h2>Home</h2>
)

let linkStyle={paddingTop: '10px', marginRight: '1em', paddingBottom: '10px', marginLeft: '1em'}

const App = () => (
    <div>
         <br/>
         <span style={linkStyle}><Link to="/scrumi-react/objectives">Objectives</Link></span><span style={linkStyle}><Link to="/scrumi-react/users">Users</Link></span>
         <br/>
    <Redirect from="/" to="/scrumi-react/objectives" />
    <Route exact path="/scrumi-react/objectives" component={Objectives} />
    <Route path="/scrumi-react/users" component={Users} />
    </div>
)
export default App;
