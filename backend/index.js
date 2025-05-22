const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes todo lists into a short overview.",
        },
        {
          role: "user",
          content: `Summarize this list of todos:\n${text}`,
        },
      ],
    });

    const summary = chatCompletion.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ summary: "Failed to summarize. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));