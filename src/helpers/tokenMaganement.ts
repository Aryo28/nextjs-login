import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { userInfo } from "@/types/types";

export const tokenData = async (request: NextRequest) => {
  try {
    const token: string = request.cookies.get("token")?.value || "";
    const decryptedToken : userInfo = jwt.verify(token, process.env.TOKEN_SECRET!) as userInfo;
    return decryptedToken;
  } catch (error: any) {
    console.log(error)
    throw new Error("Invalid Token");
  }
};
