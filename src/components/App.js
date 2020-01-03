import {
    Route, Redirect, Switch, Link, IndexRoute,
} from 'react-router-dom'

import { withRouter } from 'react-router'

import Objectives from './ui/Objectives'
import Users from './ui/Users'
import '../../stylesheets/APP.scss'

/*
const Home = () => (
<h2>Home</h2>
)
*/

const App = (props) => {
    const linkStyle = {
        paddingTop: '10px', marginRight: '1em', paddingBottom: '10px', marginLeft: '1em',
    }

    return (
        <div>
        {1 === 0 ? (
              <pre>
props.location.pathname=
                    {props.location.pathname}
          </pre>
            ) : ''}

            {1 === 0
                ? (
                  <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            <span style={linkStyle}><Link className={props.location.pathname == '/scrumi-react/objectives' ? 'link-active' : ''} to="/scrumi-react/objectives">Objectives</Link></span>
                            <span style={linkStyle}><Link className={props.location.pathname == '/scrumi-react/users' ? 'link-active' : ''} to="/scrumi-react/users">Users</Link></span>
                                <hr />
                          </div>
                    </div>
                    </div>
                )
                : ''
            }

            {1 === 1
                ? (
                    <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                          <Link className={`nav-link${props.location.pathname == '/scrumi-react/objectives' ? ' active' : ''}`} to="/scrumi-react/objectives">Objectives</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link${props.location.pathname == '/scrumi-react/users' ? ' active' : ''}`} to="/scrumi-react/users">Users</Link>
                      </li>
                  </ul>
                ) : ''
            }

            <Redirect from="/" to="/scrumi-react/objectives" />
            <Route exact path="/scrumi-react/objectives" component={Objectives} />
            <Route path="/scrumi-react/users" component={Users} />
      </div>
    )
}

// export default App;
export default withRouter(App)
