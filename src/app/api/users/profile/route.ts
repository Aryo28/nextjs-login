import { connect } from "@/dbConfig/dbConfig";
import { tokenData } from "@/helpers/tokenMaganement";
import User from "@/models/user.model";
import { userInfo, userObject } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const userInfo:userInfo = await tokenData(request);
        const user : userObject= await User.findById({_id:userInfo.id}).select("-password") as userObject;
        return NextResponse.json({user});
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error: error.message},{status:400});
    }
}