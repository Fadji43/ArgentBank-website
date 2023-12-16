export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (userData) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: userData,
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

// Async action to fetch user profile data
export const fetchProfileData = () => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(fetchProfileSuccess(userData.body));
      } else {
        dispatch(fetchProfileFailure('Erreur lors de la récupération des données utilisateur'));
      }
    } catch (error) {
      dispatch(fetchProfileFailure('Erreur réseau :', error));
    }
  };
};