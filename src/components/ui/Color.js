import { Component } from 'react'
import PropTypes from 'prop-types'
// `withRouter` is an HOC.  When we export the `Color`
// component, we send it to `withRouter` which wraps
// it with a component that passes the router properties:
// match, history, and location (as props)...
import { withRouter } from 'react-router'
import FaTrash from 'react-icons/lib/fa/trash-o'
import StarRating from './StarRating'
import TimeAgo from './TimeAgo'
// import '../../stylesheets/Color.scss'
import '../../../stylesheets/Color.scss'

class Color extends Component {
    render() {
        const {
            id, title, color, rating, timestamp, onRemove, onRate, history,
        } = this.props
        return (
          <section className="color" style={this.style}>
                <h1
              ref="title"
                    onClick={() => history.push(`/${id}`)}
            >
              {title}
            </h1>
              <button onClick={onRemove}>
                  <FaTrash />
                </button>
              <div
                  className="color"
                  onClick={() => history.push(`/${id}`)}
                  style={{ backgroundColor: color }}
                />
              <TimeAgo timestamp={timestamp} />
              <div>
                  <StarRating starsSelected={rating} onRate={onRate} />
                </div>
            </section>
        )
    }
}

Color.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rating: PropTypes.number,
    onRemove: PropTypes.func,
    onRate: PropTypes.func,
}

Color.defaultProps = {
    rating: 0,
    onRemove: f => f,
    onRate: f => f,
}

export default withRouter(Color)
