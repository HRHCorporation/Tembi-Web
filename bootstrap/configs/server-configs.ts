import "server-only";

const serverConfigs = {
  env: {
    backendApi: {
      url: process.env.BACKEND_API_URL as string,
    },
    xendit: {},
  },
  cookies: {
    authToken: "auth-token",
    authProfile: "auth-profile"
  }
};

export default serverConfigs;