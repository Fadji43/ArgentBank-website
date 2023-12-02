export const fetchUserData = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/profile/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE', error: error.message });
    }
  };
};
