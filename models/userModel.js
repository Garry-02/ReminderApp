
const database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!",
      reminders: [],
      role: "user",
      profilepic: "url genreaated by the upsplash api or uploaded profile pic url from imgur"
    },
  
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      role: "admin",
      reminders: [],
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      role: "user",
      reminders: [],
    },
    {
      id: 4,
      name: 'james',
      email: 'james@gmail.com',
      password: 'james',
      reminders: [],
      role: 'user',
      profilePic: 'https://images.unsplash.com/photo-1636715083006-a494358bb99a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzc2Njl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc4NzY1Nzc&ixlib=rb-1.2.1&q=85'
    },
  ];
  
  const userModel = {
    getUserByGitHubIdOrCreate: (profile) => {
      const user = userModel.findById(profile.id)
      if(!user) {
        let user = {id: profile.id, name: profile.username, reminders: [] };
        database.push(user)
        return user;
      } else {
        return user;
      }
    },
    findOne: (email) => {
      const user = database.find((user) => user.email === email); 
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
     return null;
    },
    
  };
  
  module.exports = { database, userModel };

