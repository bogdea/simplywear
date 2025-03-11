import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser } from "@/lib/auth";

export async function DELETE() {
  try {
    const user = await getSupabaseUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await prisma.cart.deleteMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ message: "cart cleared successfully" });
  } catch (error) {
    console.error("error clearing cart:", error);
    return NextResponse.json(
      { error: "failed to clear cart" },
      { status: 500 },
    );
  }
}
