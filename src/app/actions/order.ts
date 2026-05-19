"use server";

import prisma from "@/lib/prisma";

import { cookies } from "next/headers";

export async function createOrder(data: {
    nama_pelanggan: string;
    no_wa: string;
    temaId: number;
    harga: number;
}) {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("member_session")?.value;

        const order = await prisma.order.create({
            data: {
                nama_pelanggan: data.nama_pelanggan,
                no_wa: data.no_wa,
                temaId: data.temaId,
                harga: data.harga,
                status: "Pending",
                userId: userId || null,
            },
        });
        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, error: "Gagal membuat pesanan" };
    }
}
