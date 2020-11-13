import dotenv from "dotenv"

const result = dotenv.config();

let mongo_uri;

if (process.env.NODE_ENV != "test") {
  mongo_uri = result.parsed.MONGO_URI;
} else {
  mongo_uri = result.parsed.TEST_MONGO_URI;
}

const mongoConfig = {
  mongo_uri,
};

export default mongoConfig;
