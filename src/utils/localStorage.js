export const setToken = (idToken) => {
    localStorage.setItem('id_token', idToken);
};

export const getToken = () => localStorage.getItem('id_token');
