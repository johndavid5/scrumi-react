import PropTypes from 'prop-types';
import { UsersFilterFormContainer, UsersListContainer } from '../containers';

const Users = () => (
<div className="users">
  <UsersFilterFormContainer />
  <UsersListContainer />
</div>
)

Users.propTypes = {
}

export default Users
