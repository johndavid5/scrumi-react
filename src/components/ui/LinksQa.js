import PropTypes from 'prop-types';
// import LinksQaForm from './LinksQaForm'
// import LinksQaResults from './LinksQaResults'
import { LinksQaFormContainer, LinksQaResultsContainer } from '../containers';

// import '../../stylesheets/LinksQa.scss'


const LinksQa = () => (
<div className="links-qa">
        <LinksQaFormContainer />
        <LinksQaResultsContainer />
    </div>
)

LinksQa.propTypes = {
}

export default LinksQa
