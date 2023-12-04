export const UPDATE_USERNAME = 'UPDATE_USERNAME';

export const updateUsername = (newUsername) => {
  return {
    type: UPDATE_USERNAME,
    payload: newUsername,
  };
};
