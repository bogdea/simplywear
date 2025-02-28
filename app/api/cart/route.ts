import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSupabaseUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSupabaseUser();
    if (!user) return NextResponse.json([]);

    const cart = await prisma.cart.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch cart" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSupabaseUser();
    if (!user)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { productId, quantity = 1 } = await req.json();
    if (!productId)
      return NextResponse.json(
        { error: "product ID is required" },
        { status: 400 },
      );

    const existingItem = await prisma.cart.findFirst({
      where: { userId: user.id, productId },
    });

    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cart.update({
        where: { id: existingItem.id },
        data: { quantity: quantity },
      });
    } else {
      cartItem = await prisma.cart.create({
        data: { userId: user.id, productId, quantity },
        include: { product: true },
      });
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
