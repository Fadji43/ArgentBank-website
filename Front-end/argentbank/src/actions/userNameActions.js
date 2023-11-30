export const updateUsername = (newUsername) => {
    return {
      type: 'UPDATE_USERNAME',
      payload: newUsername,
    };
  };