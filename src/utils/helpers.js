export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const isValidEmail = (value) => {
    return new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value);
};