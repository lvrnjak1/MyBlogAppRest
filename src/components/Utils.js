// Set user and token to local storage
export const saveUserToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove user and token from local storage
export const logoutUser = () => {
  localStorage.clear();
};

// Set user data to local storage
export const saveUserData = (user) => {
  localStorage.setItem("userData", JSON.stringify(user));
};

// Returns token - without Bearer prefix
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const getUser = () => {
  return localStorage.getItem("userData");
};

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const getHeadersObject = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
};
