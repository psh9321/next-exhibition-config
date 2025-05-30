import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_FAVORITE_REMOVE } from "@/api/favorite.server";

import { FAVORITE_RESPONSE } from "@/types/favorite"

export async function POST(req : NextRequest) {
    try {

        const seqArr = DataDecrypt(await req.json()) as string[];

        const { resultCode, data, errMsg } = await API_SERVER_FAVORITE_REMOVE(seqArr) as FAVORITE_RESPONSE;

        revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"] as string)

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        throw err
    }
}