import { z } from "zod";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { rateLimit } from "@/lib/auth";

// Zod Schema for validation
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (email) => email.toLowerCase().endsWith("@gmail.com"),
      { message: "You must register with a @gmail.com address" }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown-ip";
    const limitKey = `register-${ip}`;
    const rateCheck = rateLimit(limitKey, 5, 15 * 60 * 1000); // 5 attempts per 15 minutes
    
    if (!rateCheck.ok) {
      return Response.json(
        { error: "Too many registration attempts. Please try again later." },
        { 
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateCheck.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // 2. Database connection
    await dbConnect();

    // 3. Request Body Parsing
    const body = await request.json();

    // 4. Input Validation
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.errors.map((e) => e.message).join(", ");
      return Response.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, password } = validation.data;
    const normalizedEmail = email.toLowerCase();

    // 5. Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return Response.json(
        { error: "This email address is already registered. Please sign in." },
        { status: 400 }
      );
    }

    // 6. Hash password (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Create User
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    // 8. Return response (do not return password)
    return Response.json(
      {
        message: "Account created successfully!",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { error: error.message || "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
}
