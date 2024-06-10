"use server"

import { db } from "@/lib/db"


export async function getAllComunity() {
    const comunity = await db.community.findMany()
    return comunity
} 