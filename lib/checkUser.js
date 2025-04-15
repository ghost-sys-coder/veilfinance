import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    console.warn("No user found in the Clerk session");
    return null;
  }

  try {
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const email = user.emailAddresses[0]?.emailAddress ?? "";

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: email
      },
    });


    return newUser;
  } catch (error) {
    console.error("❌ Failed to sync Clerk user:", error);
    return null;
  }
};
