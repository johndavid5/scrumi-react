import PropTypes from 'prop-types';
import { ObjectivesFilterFormContainer, ObjectivesListContainer } from '../containers';

const Objectives = () => (
<div className="objectives">
        <ObjectivesFilterFormContainer />
        <ObjectivesListContainer />
    </div>
)

Objectives.propTypes = {
}

export default Objectives
