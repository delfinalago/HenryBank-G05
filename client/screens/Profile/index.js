import React from 'react'
import PropTypes from 'prop-types'

import profileData from '../../mocks/profile.json'

import Profile from './Profile'

const ProfileScreen = () => <Profile {...profileData} />


ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
