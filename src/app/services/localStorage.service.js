const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user_local_id";

export function setToken({ refreshToken, idToken, localId, expiresIn = 3600 }) {
    console.log(refreshToken, idToken, localId);
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function removeToken() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpires() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getExpires,
    getUserId,
    removeToken
};

export default localStorageService;
