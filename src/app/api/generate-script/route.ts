
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { coinName, style, videoIdea } = await req.json();

        if (!coinName) {
            return NextResponse.json({ error: 'Coin name is required' }, { status: 400 });
        }

        const prompt = `You are a hype-man for a new crypto meme coin called "${coinName}". 
        Create 4 short, punchy, high-energy phrases for a promo video.
        
        The user wants the video to be about: "${videoIdea || 'General hype'}".
        Style: ${style} (e.g., "pump" = excited moonboy, "degen" = slang heavy, "serious" = professional).
        
        Format: Return ONLY a JSON array of 4 strings. No other text. nothing else.
        Example: ["${coinName} to the moon! 🚀", "Don't miss out! 💎", "Next 1000x Gem! 🔥", "Buy Now on Raydium!"]`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o',
        });

        const content = completion.choices[0].message.content;

        let script = [];
        try {
            // Handle potential markdown code block wrapping
            const cleanContent = content?.replace(/```json/g, '').replace(/```/g, '').trim();
            script = JSON.parse(cleanContent || '[]');
        } catch (e) {
            console.error("Failed to parse AI response:", content);
            // Fallback
            script = [
                `${coinName} is flying! 🚀`,
                "The community is taking over!",
                "Get in early before the pump!",
                "Buy now on DEX! 💎"
            ];
        }

        return NextResponse.json({ script });

    } catch (error) {
        console.error('Error generating script:', error);
        return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
    }
}
