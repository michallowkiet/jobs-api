import { JwtPayload } from "jsonwebtoken";

interface IJwtPayloadType extends JwtPayload {
  userId: string;
  name: string;
}

export default IJwtPayloadType;
