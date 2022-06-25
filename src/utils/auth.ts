import Cookies from 'js-cookie'

const TokenKey = 'token' //献祭了
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token:string) {
  return Cookies.set(TokenKey, token, { expires: 10 })  //献祭了

}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function logout(){
  removeToken();
  localStorage.removeItem("username");
  localStorage.removeItem("avatar");
  location.reload();
}
