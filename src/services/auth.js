export const login = (username) => {
    localStorage.setItem("username", username);
  };
  
  export const logout = () => {
    localStorage.removeItem("username");
  };
  
  export const getCurrentUser = () => {
    return localStorage.getItem("username");
  };
  