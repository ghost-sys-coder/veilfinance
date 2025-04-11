"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// function to turn the balance into a number since Next.js does not support float/decimal values
const serializeBalance = (obj) => {
    const serialized = { ...obj };

    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
}

export async function createAccount(data) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("unauthorized");
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });

        if (!user) {
            throw new Error("User not found!");
        }

        // convert balance to a float value before saving
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance format");
        }

        // check if this is the user's first account
        const existingUserAccounts = await db.account.findMany({
            where: { userId: user.id }
        });

        const shouldBeDefault = existingUserAccounts.length === 0 ? true : data.isDefault;

        // if this account should be default, unset other accounts
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { clerkUserId: user.id },
                data: {isDefault: false}
            })
        }

        const account = await db.account.create({
            data: {
                ...data,
                isDefault: shouldBeDefault,
                balance: balanceFloat,
                userId: user.id
            }
        });

        const serializedAccount = serializeBalance(account);
        revalidatePath("/dashboard");
        return { success: true, data: serializedAccount };
    } catch (error) {
        console.log("Failed to create account", error);
    }
}