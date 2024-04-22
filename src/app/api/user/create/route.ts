import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { name, bio } = reqBody;

    const newUser = new User({
      name,
      bio
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      message: " User created successfully",
      success: true,
      savedUser,
      status: 200
    });
  } catch (error) {
    console.log(error);
  }
}
