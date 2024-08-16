export const isLogin = (id: string) => {
  if (id === undefined) {
    return false;
  } else if (id === null) {
    return false;
  } else {
    return true;
  }
};
export default isLogin;
