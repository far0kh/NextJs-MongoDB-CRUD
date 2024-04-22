/** @format */
export const dynamic = "force-dynamic";

import { connectToDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDb();

    const UserData = await User.find();

    return NextResponse.json(UserData);
  } catch (error) {
    console.log("error fetching user data ", error);
  }
}
