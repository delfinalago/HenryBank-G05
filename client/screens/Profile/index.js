import React from "react";
import PropTypes from "prop-types";

import profileData from "../../mocks/profile.json";

import Profile from "./Profile";

const ProfileScreen = (props) => {
  return <Profile {...profileData} {...props} />;
};

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
