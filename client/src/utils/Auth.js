export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  window.location.href = "/login";
};
