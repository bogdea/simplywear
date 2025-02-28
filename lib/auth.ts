import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function getSupabaseUser() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) return null;

  const user = await prisma.user.upsert({
    where: { id: data.user.id },
    update: {},
    create: {
      id: data.user.id,
      email: data.user.email!,
    },
  });

  return user;
}
