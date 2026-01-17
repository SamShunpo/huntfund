// Setup type definitions for Deno/Supabase (mocked for now)
// @ts-ignore
import { serve } from "std/http/server.ts"

// Placeholder for OpenAI Key - retrieved from env in production
// @ts-ignore
const openAiKey = Deno.env.get('OPENAI_API_KEY')

serve(async (req: Request) => {
    try {
        const { city, theme, audience } = await req.json()

        if (!city || !theme) {
            return new Response(JSON.stringify({ error: 'Missing city or theme' }), { status: 400 })
        }

        // Prompt Engineering (Updated for JSON Mode)
        const systemPrompt = `You are an expert Scavenger Hunt designer. Output strictly valid JSON.`
        const userPrompt = `Create a scavenger hunt in ${city} about ${theme} for ${audience || 'General Public'}.
    Return a strictly structured JSON object with:
    - hunt_overview: { title, description, estimated_duration_minutes, difficulty_level }
    - steps: Array of items with:
      - step_order: number
      - title: string
      - location_clue: A visual hint to find the spot (NO GPS)
      - riddle_content: The enigma
      - riddle_type: 'text' | 'photo' | 'info'
      - solution: string (or null for photo/info)
      - hint: A granular hint if stuck
      - is_pause_point: boolean (true for bars/cafes)`

        // MOCKED RESPONSE FOR SKELETON (Strict Schema)
        const mockedResponse = {
            hunt_overview: {
                title: `The Mysteries of ${city}`,
                description: `Explore the hidden side of ${city} with this ${theme}-themed adventure.`,
                estimated_duration_minutes: 90,
                difficulty_level: "Medium"
            },
            steps: [
                {
                    step_order: 1,
                    title: "The Starting Point",
                    location_clue: "Find the statue of the Lion in the central square.",
                    riddle_content: "I have a mane but no breath. Watch my gaze follow the sun. What sits at my feet?",
                    riddle_type: "text",
                    solution: "Shield",
                    hint: "Look at the base of the statue.",
                    is_pause_point: false
                },
                {
                    step_order: 2,
                    title: "The Old Fountain",
                    location_clue: "Go to the fountain with three dolphins near the market.",
                    riddle_content: "Take a selfie with the dolphins!",
                    riddle_type: "photo",
                    solution: null,
                    hint: "It's behind the flower stall.",
                    is_pause_point: false
                },
                {
                    step_order: 3,
                    title: "The Travelers' Rest",
                    location_clue: "The famous café 'Le Petit Zinc'.",
                    riddle_content: "Break time! Grab a drink and scan the QR code at the counter.",
                    riddle_type: "info",
                    solution: null,
                    hint: "Enjoy a lemonade.",
                    is_pause_point: true
                }
            ]
        }

        return new Response(JSON.stringify(mockedResponse), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})
