export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid request. 'messages' array is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback if API key is not configured (to ensure code runs successfully in development)
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in environment variables. Falling back to simulation mode.");
      
      const lastMessage = messages[messages.length - 1]?.text || "";
      let simulatedResponse = "";

      if (lastMessage.toLowerCase().includes("itinerary") || lastMessage.toLowerCase().includes("plan")) {
        simulatedResponse = `[SIMULATION NOTE: Set GEMINI_API_KEY in .env for real responses]\n\nHere is your custom 3-Day Eco-Itinerary for Chopta:\n\n• **Day 1: Arrival & Acclimatization**\nArrive at your EcoStay Homestay in Chopta (2,680m). Walk around the rhododendron forest. Dine on traditional 'Gahat Dal' and hot millet rotis.\n\n• **Day 2: Tungnath & Chandrashila Peak**\nStart early at 6 AM. Trek 3.5 km to Tungnath Shiva Temple. Continue 1.5 km to the Chandrashila Summit (4,000m) for a 360° Himalayan views. Return to homestay for hot local herbal tea.\n\n• **Day 3: Deoria Tal Reflection Lake**\nDrive to Sari Village (45 mins), then hike 2.3 km through pine forests to the lake. Watch Chaukhamba reflect in the emerald lake. Depart in afternoon.`;
      } else if (lastMessage.toLowerCase().includes("pack") || lastMessage.toLowerCase().includes("wear")) {
        simulatedResponse = `[SIMULATION NOTE: Set GEMINI_API_KEY in .env for real responses]\n\nEssential packing guide for Chopta & Tungnath:\n\n• **Layering is key:** Windcheater jacket, thermal innerwear, fleece jacket (temperatures dip below 5°C even in summer!).\n• **Footwear:** Waterproof trekking shoes with deep treads.\n• **Eco-kit:** Reusable water bottle (mineral bottles are banned in Chopta meadows) and trash-bag for waste wrappers.\n• **Medical:** Altitude sickness pills, pain sprays, and band-aids.`;
      } else if (lastMessage.toLowerCase().includes("sustainable") || lastMessage.toLowerCase().includes("eco")) {
        simulatedResponse = `[SIMULATION NOTE: Set GEMINI_API_KEY in .env for real responses]\n\nEcoStay AI is committed to 100% Sustainable Tourism. Here is how you can help:\n\n1. **Zero Single-Use Plastics:** Carry steel bottles. Refill stations are present at all approved homestays.\n2. **Support Village Economy:** Buy local organic farm produce (Himalayan kidney beans, ghee, wild honey).\n3. **Conserve Resources:** Chopta is off-grid; electricity is solar-powered. Turn off lights, heaters, and charge devices only during daylight.`;
      } else if (lastMessage.toLowerCase().includes("winter") || lastMessage.toLowerCase().includes("snow")) {
        simulatedResponse = `[SIMULATION NOTE: Set GEMINI_API_KEY in .env for real responses]\n\nChopta turns into a white wonderland from December to March:\n\n• **Snowfall:** Frequent snow blockades roads between Chopta and Ukhimath. Drive with caution.\n• **Homestays:** Most homestays utilize fireplace wood heating. Ensure you book a Deluxe room with warm insulation.\n• **Tungnath Trek:** The trek is fully covered in snow. Guided trekking with snow spikes is mandatory.`;
      } else {
        simulatedResponse = `[SIMULATION NOTE: Set GEMINI_API_KEY in .env for real responses]\n\nNamaste! I received your query: "${lastMessage}". Chopta is a beautiful region in Uttarakhand. For custom advice, itineraries, or safety prep, please configure your Gemini API Key in .env to chat dynamically. Let me know if I can help you with preset questions!`;
      }

      return Response.json({ text: simulatedResponse }, { status: 200 });
    }

    // Convert frontend messages to Gemini format:
    const contents = messages
      .filter(m => m.id !== "m-init")
      .map(m => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

    const systemInstruction = {
      parts: [
        {
          text: `You are the EcoStay AI Travel Assistant, a verified Eco-Tourism Specialist for Chopta, Rudraprayag District, Uttarakhand, India.
Your goal is to assist travelers with itineraries, trekking advice (Tungnath, Chandrashila, Deoria Tal treks), packing lists, local Himalayan culture, and sustainable travel guidelines.

Rules:
1. Promote sustainable tourism: zero single-use plastics, carrying reusable bottles, supporting the local economy by buying local farm produce (like Gahat Dal, millet rotis, wild honey), and conserving solar energy.
2. Provide authentic regional context (altitude, weather prep, clothing needed).
3. Do not recommend heavy commercial actions; emphasize homestays and community-oriented, low-carbon impact travel.
4. Keep answers friendly, structured, concise, and using bullet points where helpful.`
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents,
          systemInstruction
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", errText);
      return Response.json({ error: `Gemini API responded with status ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error("Gemini API structure unexpected:", data);
      return Response.json({ error: "Invalid response format from Gemini API" }, { status: 500 });
    }

    return Response.json({ text: generatedText }, { status: 200 });
  } catch (error) {
    console.error("Failed in AI chat route:", error);
    return Response.json({ error: error.message || "Failed to call AI service" }, { status: 500 });
  }
}
