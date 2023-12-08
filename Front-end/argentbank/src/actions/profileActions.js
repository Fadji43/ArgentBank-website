

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

const fetchProfileRequest = () => ({ type: FETCH_PROFILE_REQUEST });
const fetchProfileSuccess = (data) => ({ type: FETCH_PROFILE_SUCCESS, payload: data });
const fetchProfileFailure = (error) => ({ type: FETCH_PROFILE_FAILURE, payload: error });

export const fetchProfileData = () => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(fetchProfileSuccess(userData.body));
      } else {
        console.error('Erreur lors de la récupération des données utilisateur');
        dispatch(fetchProfileFailure('Erreur lors de la récupération des données utilisateur'));
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      dispatch(fetchProfileFailure('Erreur réseau'));
    }
  };
};