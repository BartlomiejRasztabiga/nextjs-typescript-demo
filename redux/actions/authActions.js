export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const logIn = (access_token) => ({
    type: LOG_IN,
    payload: access_token
})

export const logOut = () => ({
    type: LOG_OUT
})