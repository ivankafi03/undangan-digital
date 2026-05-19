"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id: number, status: string) {
    await prisma.order.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/admin/pesanan");
    revalidatePath("/admin/dashboard");
}

export async function deleteOrder(id: number) {
    await prisma.order.delete({
        where: { id },
    });
    revalidatePath("/admin/pesanan");
    revalidatePath("/admin/dashboard");
}
