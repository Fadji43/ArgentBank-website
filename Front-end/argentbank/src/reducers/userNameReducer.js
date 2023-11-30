const initialState = {
    username: 'Tony', 
  };
  
  const userNameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USERNAME':
        // Met à jour le nom d'utilisateur avec la valeur fournie dans l'action payload
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
  