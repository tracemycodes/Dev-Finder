import React from 'react'
import Spinner from '../layouts/Spinner';
import UserItem from './UserItem';
import PropTypes from 'prop-types'


const Users = ({users, loading}) => {
    if (loading) {
      return <Spinner/>
    } else {

      return (
        <div style={userStyle}>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )
    }

}

Users.prototype = {
  users: PropTypes.array.isRequired,
  location: PropTypes.bool.isRequired
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
