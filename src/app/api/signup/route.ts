import { db } from "@/lib/db";
import { signUpSchema } from "@/Schema/user";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
export async function POST(request: Request) {
  const data = await request.json();
  const validData = signUpSchema.safeParse(data);
  if (validData.success) {
    try {
      const user = await db.profile.findFirst({
        where: {
          OR: [
            {
              email: validData.data.email,
            },
            {
              name: validData.data.name,
            },
          ],
        },
      });
      if (user) {
        return new NextResponse("User already exists", { status: 401 });
      }
      const hashedPassword = await hash(validData.data.password, 10);
      await db.profile.create({
        data: {
            name: validData.data.name,
            email: validData.data.email,
            password: hashedPassword,
            image: "", // Add a default empty string for the image field
        }
      })
      return new NextResponse("User created successfully", { status: 200 });
    } catch (error) {
      return new NextResponse("Error creating user", { status: 500 });
    }
  } else {
    return new NextResponse("Invalid data", { status: 400 });
  }
}