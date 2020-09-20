import React, { createContext, useState } from 'react';

const Context = createContext();

export default Context;

const UserContext = {
  token: undefined,
  userID: undefined,
};

export const Provider = ({ children }) => {
  const [context, setContext] = useState({
    ...UserContext,
  });

  return <Context.Provider value={[context, setContext]}>{children}</Context.Provider>;
};
