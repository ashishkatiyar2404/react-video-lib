import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

const JWT_SECRET =
  process.env.REACT_APP_JWT_SECRET || "wave_video_library_jwt_secret_2021";

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode(encodedToken, JWT_SECRET);
  if (decodedToken) {
    const user = this.db.users.findBy({ email: decodedToken.email });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
