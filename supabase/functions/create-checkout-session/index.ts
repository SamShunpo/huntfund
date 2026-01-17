// @ts-ignore
import { serve } from "std/http/server.ts"
// import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno' // Real import

// @ts-ignore
// const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, { ... })

serve(async (req: Request) => {
    try {
        const { huntId, teamName, price, organizerStripeId } = await req.json()

        // 1. Calculate Fees
        // Price is in cents? Let's assume input is e.g. 2000 (20.00 EUR)
        const amount = Number(price)
        const platformFee = Math.round(amount * 0.10) // 10%

        // 2. Create Checkout Session (Mocked)
        /*
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'eur',
              product_data: { name: `Team Entry: ${teamName}` },
              unit_amount: amount,
            },
            quantity: 1,
          }],
          payment_intent_data: {
            application_fee_amount: platformFee,
            transfer_data: {
              destination: organizerStripeId, // Connected Account ID
            },
          },
          mode: 'payment',
          success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.get('origin')}/cancel`,
        })
        */

        // MOCKED RESPONSE
        const mockedSession = {
            sessionId: "cs_test_mock_12345",
            checkoutUrl: "https://checkout.stripe.com/mock-link",
            debugInfo: {
                amountTotal: amount,
                organizerTransfer: amount - platformFee,
                platformFee: platformFee,
                organizerId: organizerStripeId
            }
        }

        return new Response(JSON.stringify(mockedSession), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
})
