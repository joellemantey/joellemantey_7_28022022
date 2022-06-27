import jwtDecode from 'jwt-decode';

export const getToken = () => {
  const token = localStorage.getItem('token');
  return jwtDecode(token);
};

// eslint-disable-next-line import/prefer-default-export
export const hasAccess = (user) => {
  const token = getToken();
  const { userId } = token;
  console.log(token, userId, user);
  return user === userId;
};

export const connectedUser = () => {
  const token = getToken();
  const { userId } = token;
  console.log(token, userId);
  return userId;
};
