const initialState = {
    username: '', 
  };
  
  const userNameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USERNAME':
        // Met à jour le nom d'utilisateur avec la valeur du payload
        return {
          ...state,          // Maintient l'immuabilité de l'état actuel
          username: action.payload,
        };
      default:
        // Retourne l'état inchangé pour toute autre action
        return state;
    }
  };
  
  export default userNameReducer;
  