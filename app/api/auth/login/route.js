import { z } from "zod";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { generateToken, rateLimit } from "@/lib/auth";

// Zod Schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown-ip";
    const limitKey = `login-${ip}`;
    const rateCheck = rateLimit(limitKey, 5, 15 * 60 * 1000); // 5 attempts per 15 minutes
    
    if (!rateCheck.ok) {
      return Response.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
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
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.errors.map((e) => e.message).join(", ");
      return Response.json({ error: errorMsg }, { status: 400 });
    }

    const { email, password } = validation.data;
    const normalizedEmail = email.toLowerCase();

    // 5. Special Case: Auto-upsert admin user on first run to ensure DB persistence
    if (normalizedEmail === "admin@ecostay.ai") {
      let adminUser = await User.findOne({ email: "admin@ecostay.ai" });
      if (!adminUser) {
        const hashedAdminPassword = await bcrypt.hash("admin123", 10);
        await User.create({
          name: "EcoStay Admin",
          email: "admin@ecostay.ai",
          password: hashedAdminPassword,
          role: "admin",
        });
      }
    }

    // 6. Find user in database
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      // For general users, enforce gmail rule
      if (normalizedEmail !== "admin@ecostay.ai" && !normalizedEmail.endsWith("@gmail.com")) {
        return Response.json(
          { error: "Access Denied: Standard users must log in using a @gmail.com address." },
          { status: 403 }
        );
      }
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 7. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 8. Generate JWT token
    const token = generateToken(user);

    // 9. Return user info and token
    return Response.json(
      {
        message: "Login successful!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || "",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: error.message || "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
