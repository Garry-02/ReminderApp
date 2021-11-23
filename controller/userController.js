const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserByGitHubIdOrCreate = (profile) =>{
  let user = userModel.getUserByGitHubIdOrCreate(profile);
  return user;
  // if (user) {
  //   if (isUserValid(user, password)) {
  //     return user;
  //   }
  // } else {

  // }
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById, getUserByGitHubIdOrCreate
};
