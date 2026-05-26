import "server-only";

const serverConfigs = {
  env: {
    backendApi: {
      url: process.env.BACKEND_API_URL as string,
    },
    xendit: {},
    disableAdminAuth: process.env.DISABLE_ADMIN_AUTH === "true",
  },
  cookies: {
    authToken: "auth-token",
    authProfile: "auth-profile",
    adminSession: process.env.COOKIE_NAME || "admin_session_tembi",
  }
};

export default serverConfigs;