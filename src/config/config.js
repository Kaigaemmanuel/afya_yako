const config = {
  development: {
    backendUrl: "http://localhost:8080", // Change this to your local backend address
  },
  production: {
    backendUrl: "https://your-production-backend-url",
  },
};

const environment = process.env.NODE_ENV || "development";

export default config[environment];
