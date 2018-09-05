import PropTypes from 'prop-types'
import { logajohn } from '../../lib/logajohn'

// import '../../stylesheets/LinksQaResultsComponent.scss'
import '../../../stylesheets/LinksQaResultsComponent.scss'

// const LinksQaResultsComponent = ({ linksQa={}, debug=true}) => {
const LinksQaResultsComponent = (props) => {
    const sWho = 'LinksQaResultsComponent'

    const linksQa = props.linksQa
    const debug = true

    let stderr_rows = []
    if (linksQa.linksQa.output.stderr) {
        stderr_rows = linksQa.linksQa.output.stderr.split('\n')
    }
    // console.log(`${sWho}(): stderr_rows = `, stderr_rows );
    logajohn.debug(`${sWho}(): stderr_rows = `, stderr_rows)

    let stdout_rows = []
    if (linksQa.linksQa.output.stdout) {
        stdout_rows = linksQa.linksQa.output.stdout.split('\n')
    }
    // console.log(`${sWho}(): stdout_rows = `, stdout_rows );
    logajohn.debug(`${sWho}(): stdout_rows = `, stdout_rows)


    const tdStyle = {
	  border: '2px solid purple',
	  padding: '2px',
        textAlign: 'left',
    }

    return (
      <div className="links-qa-results-component container-fluid" style={{ paddingLeft: '1em' }}>
          <div className="run-params row">
              <div className="col-sm-8">
              <h3 style={{ whiteSpace: 'nowrap' }}>
Base Path:
                        {linksQa.basePath}
                    </h3>
            </div>
              <div className="col-sm-4">
                  <h3 style={{ whiteSpace: 'nowrap' }}>
Addition Only Code:
                      {linksQa.additionOnlyCode}
                    </h3>
                </div>
            </div>

          <div className="run-params row">
          <div className="col-sm-4">
                <h3 style={{ whiteSpace: 'nowrap' }}>
STDERR Rows:
                    {stderr_rows.length}
                    </h3>
              </div>
        </div>
            <table className="table">
          <tbody key="tbody">
                  {
			    stderr_rows.map((value, index) => (
  <tr key={`tr-${index}`}>
                                <th scope="row" key={index} style={tdStyle}>{index}</th>
                              <td style={tdStyle} key={`val-${index}`}>{value}</td>
                            </tr>
			    ))
                    }
                </tbody>
            </table>

          <div className="run-params row">
          <div className="col-sm-4">
                    <h3 style={{ whiteSpace: 'nowrap' }}>
STDOUT Rows:
                        {stdout_rows.length}
                    </h3>
                </div>
        </div>
          <table className="table">
              <tbody key="tbody">
                  {
			    stdout_rows.map((value, index) => (
  <tr key={`tr-${index}`}>
                              <th scope="row" key={index} style={tdStyle}>{index}</th>
                              <td style={tdStyle} key={`val-${index}`}>{value}</td>
                            </tr>
			    ))
                    }
                </tbody>
            </table>

          { (debug == true)
                ? (
                  <div>
                      <pre style={{ fontSize: '125%', textAlign: 'left' }}>
linksQa =
                          { JSON.stringify(linksQa, null, ' ') }
                        </pre>
                    </div>
                )
                : ''
    		}
          { (debug == true)
                ? (
                  <div>
                        <pre style={{ fontSize: '125%', textAlign: 'left' }}>
props =
                      { JSON.stringify(props, null, ' ') }
                    </pre>
                    </div>
                )
                : ''
    		}
        </div>
    )
}

LinksQaResultsComponent.propTypes = {
    linksQa: PropTypes.object,
    debug: PropTypes.bool,
}

export default LinksQaResultsComponent
