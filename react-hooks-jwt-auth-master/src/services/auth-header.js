export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  // checks in protected resources for correct user token
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken }; //        // for Node.js Express back-end
  } else {
    return {};
  }
}
