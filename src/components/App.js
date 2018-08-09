import { Route, Redirect, Switch, IndexRoute } from 'react-router-dom'
import Menu from './ui/Menu'
import Whoops404 from './ui/Whoops404'
import { Colors, Color, NewColor } from './containers'
import LinksQa from './ui/LinksQa'
import Objectives from './ui/Objectives'
import '../stylesheets/APP.scss'

const App = () =>
    <Switch>
        {/*<IndexRoute component={LinksQa} />*/}
        {/*<Redirect from="/" to="/links_qa" />*/}
        {/*<Route path="/" component={Objectives} />*/}
        <Route path="/objectives" component={Objectives} />
        <Route path="/links_qa" component={LinksQa} />
        {/*<Route exact path="/:id" component={Color} />
        <Route path="/"
            component={({match, location}) => (
                <div className="app">
                    <Menu sort={location.pathname.replace('/sort/', '')} />
                    <NewColor />
                    <Switch>
                        <Route exact path="/" component={Colors} />
                        <Route path="/sort/:sort" component={Colors} />
                        <Route component={Whoops404} />
                    </Switch>
                </div>
            )} />
         */}
    </Switch>

export default App
