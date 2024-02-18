import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("Attempting to create new user");
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const savedUSer = await newUser.save();
    console.log("New User: ", savedUSer.username);

    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      status: 200,
      username: savedUSer.username,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
