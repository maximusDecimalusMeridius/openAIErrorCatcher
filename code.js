// Import necessary modules
import OpenAI from "openai"; // OpenAI SDK for interacting with GPT models
import dotenv from "dotenv";  // dotenv package to load environment variables

// Load environment variables from .env file (e.g., OpenAI API key)
dotenv.config(); 

// Initialize OpenAI API client using the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
});

/**
 * Handles errors by sending them to OpenAI for a possible fix.
 * @param {Error} error - The error object caught in a try-catch block.
 */
async function handleError(error) {
    console.error("Error occurred:", error.message); // Log the error message

    try {
        // Send the error message to OpenAI's chat model and request a possible fix
        const response = await openai.chat.completions.create({
            model: "gpt-4", // Use GPT-4 model for generating responses
            messages: [{ role: "user", content: "Fix for this error: " + error.message }],
        });

        // Log the suggested fix from OpenAI's response
        console.log("Suggested Fix:", response.choices[0].message.content);
    } catch (apiError) {
        console.error("Failed to get fix from OpenAI:", apiError); // Handle OpenAI API call errors
    }
}

/**
 * Test function that throws and handles error from bad code
 */
async function main() {
    try {
        // Faulty code (this will throw an error since someUndefinedFunction() is undefined)
        let result = someUndefinedFunction(); 
        console.log(result); // This won't execute
    } catch (error) {
        await handleError(error); // Pass error to handleError()
    }
}

// Execute the main function
main();
