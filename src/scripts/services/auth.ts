export const auth = {
  login: async (token: string) => {
    localStorage.setItem("access_token", token);
    location.reload();
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    location.reload();
  },

  getToken: () => localStorage.getItem("access_token"),

  setUsername: (username: string) => {
    localStorage.setItem("current_user", username);
  },

  getUsername: () => localStorage.getItem("current_user"),

  isAuthenticated: () => {
    const token = localStorage.getItem("access_token");
    return Boolean(token);
  }
}