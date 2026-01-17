// const SUPABASE_URL = "https://mock-project.supabase.co"
// const SUPABASE_ANON_KEY = "mock-key"

export interface GenHuntParams {
    city: string;
    theme: string;
    audience: string;
}

export interface CheckoutParams {
    huntId: string;
    teamName: string;
    price: number;
    organizerStripeId: string;
}

export const api = {
    // Simulate calling the generate-hunt Edge Function
    generateHunt: async (params: GenHuntParams) => {
        console.log("Calling Edge Function: generate-hunt", params);

        // Simulating network delay
        await new Promise(r => setTimeout(r, 1500));

        // Return the mock response directly for now (frontend-side mock)
        return {
            hunt_overview: {
                title: `Le Secret de ${params.city}`,
                description: `Une aventure palpitante à ${params.city} sur le thème ${params.theme}.`,
            },
            steps: [
                {
                    step_order: 1,
                    title: "Le Départ Mystère",
                    location_clue: `Cherchez la place principale de ${params.city}.`,
                    riddle_content: "Je suis le cœur de la ville mais je ne bats pas.",
                    riddle_type: "text",
                    solution: "Place de la Mairie",
                    hint: "Regardez les drapeaux.",
                    is_pause_point: false
                },
                {
                    step_order: 2,
                    title: "Défi Gargouille",
                    location_clue: "Devant la plus vieille église.",
                    riddle_content: "Prenez une photo effrayante !",
                    riddle_type: "photo",
                    solution: null,
                    hint: "Grimace exigée.",
                    is_pause_point: false
                }
            ]
        };
    },

    // Simulate calling the create-checkout-session Edge Function
    createCheckoutSession: async (params: CheckoutParams) => {
        console.log("Calling Edge Function: create-checkout-session", params);

        await new Promise(r => setTimeout(r, 1000));

        const amount = params.price;
        const fee = Math.round(amount * 0.10);

        return {
            sessionId: "cs_test_mock_12345",
            checkoutUrl: "https://checkout.stripe.com/mock-link", // This would redirect the user
            breakdown: {
                total: amount,
                organizer: amount - fee,
                fee: fee
            }
        };
    }
}
