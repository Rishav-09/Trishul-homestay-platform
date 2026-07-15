import dbConnect from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, name, avatar, provider } = await request.json();

    if (!email || !name) {
      return Response.json({ error: "Missing email or name from OAuth payload" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    // Find user or create a new user without a password (since they log in via OAuth)
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      user = await User.create({
        name,
        email: normalizedEmail,
        password: `OAUTH_${provider.toUpperCase()}_MOCK_PASSWORD_${Math.random()}`,
        role: "user",
        avatar: avatar || "",
      });
    } else if (avatar && !user.avatar) {
      // Update avatar if not set
      user.avatar = avatar;
      await user.save();
    }

    const token = generateToken(user);

    return Response.json({
      message: `Successfully authenticated via ${provider}`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    }, { status: 200 });

  } catch (error) {
    console.error("OAuth error:", error);
    return Response.json({ error: error.message || "Failed to complete OAuth sign in" }, { status: 500 });
  }
}
