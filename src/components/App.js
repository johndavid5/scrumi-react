import {
 Route, Redirect, Switch, IndexRoute 
} from 'react-router-dom';
import Objectives from './ui/Objectives';
import '../../stylesheets/APP.scss';

const App = () => (
<Switch>
        <Route exact path="/" component={Objectives} />
        <Route path="/objectives" component={Objectives} />
        <Route path="/scrumi-react/objectives" component={Objectives} />
    </Switch>
)
export default App;
