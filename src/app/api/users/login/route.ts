import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const currUser = await User.findOne({ email });

    if (!currUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, currUser.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: currUser.id,
      username: currUser.username,
      email: currUser.email,
    };

    const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "2h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      status: 200,
    });

    response.cookies.set("token", newToken, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
