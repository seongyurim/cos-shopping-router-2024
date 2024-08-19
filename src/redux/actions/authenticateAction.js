function login(id, password) {
  return (dispatch, getState) => {
    console.log("Login Success Action");
    dispatch({type:"LOGIN_SUCCESS", payload:{id,password}});
  };
}

function logout(authenticate) {
  return (dispatch) => {
    console.log("Logout Success Action");
    dispatch({type:"LOGOUT_SUCCESS", payload:{authenticate}});
  }
}

export const authenricateAction = { login, logout };