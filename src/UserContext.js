import React from 'react';

const UserContext = React.createContext({
  user: null,
  onUserChange: null,
});
export default UserContext;
