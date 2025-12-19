import getBuffer from "../utils/dataUri.js";
import { sql } from "../utils/db.js";
import cloudinary from "cloudinary";
import TryCatch from "../utils/TryCatch.js";
import { invalidateChacheJob } from "../utils/rabbitmq.js";
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const createBlog = TryCatch(async (req, res) => {
    const { title, description, blogcontent, category } = req.body;
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "No file to upload",
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({
            message: "Failed to generate buffer",
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "blogs",
    });
    const result = await sql `INSERT INTO blogs (title, description, image, blogcontent,category, author) VALUES (${title}, ${description},${cloud.secure_url},${blogcontent},${category},${req.user?._id}) RETURNING *`;
    await invalidateChacheJob(["blogs:*"]);
    res.json({
        message: "Blog Created",
        blog: result[0],
    });
});
export const updateBlog = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { title, description, blogcontent, category } = req.body;
    const file = req.file;
    const blog = await sql `SELECT * FROM blogs WHERE id=${id}`;
    if (!blog.length) {
        res.status(404).json({
            message: "No blog with this id",
        });
        return;
    }
    if (blog[0]?.author !== req.user?._id) {
        res.status(403).json({
            message: "You are not authorize of this blog",
        });
        return;
    }
    let imageUrl = blog[0]?.image;
    if (file) {
        const fileBuffer = getBuffer(file);
        if (!fileBuffer || !fileBuffer.content) {
            res.status(400).json({
                message: "Failed to generate buffer",
            });
            return;
        }
        const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
            folder: "blogs",
        });
        imageUrl = cloud.secure_url;
    }
    const updatedBlog = await sql `UPDATE blogs SET
    title = ${title || blog[0]?.title},
    description = ${description || blog[0]?.description},
    image= ${imageUrl},
    blogcontent = ${blogcontent || blog[0]?.blogcontent},
    category = ${category || blog[0]?.category}

    WHERE id = ${id}
    RETURNING *
    `;
    await invalidateChacheJob(["blogs:*", `blog:${id}`]);
    res.json({
        message: "Blog Updated",
        blog: updatedBlog[0],
    });
});
export const deleteBlog = TryCatch(async (req, res) => {
    const blog = await sql `SELECT * FROM blogs WHERE id = ${req.params.id}`;
    if (!blog.length) {
        res.status(404).json({
            message: "No blog with this id",
        });
        return;
    }
    if (blog[0]?.author !== req.user?._id) {
        res.status(401).json({
            message: "You are not author of this blog",
        });
        return;
    }
    await sql `DELETE FROM savedblogs WHERE blogid = ${req.params.id}`;
    await sql `DELETE FROM comments WHERE blogid = ${req.params.id}`;
    await sql `DELETE FROM blogs WHERE id = ${req.params.id}`;
    await invalidateChacheJob(["blogs:*", `blog:${req.params.id}`]);
    res.json({
        message: "Blog Deleted Successfully",
    });
});
export const aiTitleResponse = TryCatch(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }
    const prompt = `Correct the grammar of the following blog title and return only the corrected title without any extra text: "${text}"`;
    const ai = new GoogleGenAI({
        apiKey: process.env.Gemini_Api_Key,
    });
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    if (!result.text) {
        return res.status(500).json({ message: "AI response has no text()" });
    }
    const rawtext = result.text;
    if (!rawtext) {
        return res.status(500).json({ message: "AI did not return text" });
    }
    const cleaned = rawtext
        .replace(/\*\*/g, "")
        .replace(/[\r\n]+/g, " ")
        .replace(/[*_`~]/g, "")
        .trim();
    res.json(cleaned);
});
export const aiDescriptionResponse = TryCatch(async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Text is required" });
    }
    const prompt = description === ""
        ? `Generate only one short blog description based on this 
title: ${title}. Your response must be only one sentence, strictly under 30 words, with no options, no greetings, and 
no extra text. Do not explain. Do not say 'here is'. Just return the description only.`
        : `Fix the grammar in the 
following blog description and return only the corrected sentence. Do not add anything else: "${description}"`;
    const ai = new GoogleGenAI({
        apiKey: process.env.Gemini_Api_Key,
    });
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    console.log(result);
    if (!result.text) {
        return res.status(500).json({ message: "AI response has no text()" });
    }
    const rawtext = result.text;
    console.log(rawtext);
    if (!rawtext) {
        return res.status(500).json({ message: "AI did not return text" });
    }
    const cleaned = rawtext
        .replace(/\*\*/g, "")
        .replace(/[\r\n]+/g, " ")
        .replace(/[*_`~]/g, "")
        .trim();
    res.json(cleaned);
});
export const aiBlogResponse = TryCatch(async (req, res) => {
    const prompt = ` You will act as a grammar correction engine. I will provide you with blog content 
in rich HTML format (from Jodit Editor). Do not generate or rewrite the content with new ideas. Only correct 
grammatical, punctuation, and spelling errors while preserving all HTML tags and formatting. Maintain inline styles, 
image tags, line breaks, and structural tags exactly as they are. Return the full corrected HTML string as output. `;
    const { blog } = req.body;
    if (!blog) {
        res.status(400).json({
            message: "Please provide blog",
        });
        return;
    }
    const fullMessage = `${prompt}\n\n${blog}`;
    const ai = new GoogleGenerativeAI(process.env.Gemini_Api_Key);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: fullMessage,
                    },
                ],
            },
        ],
    });
    const responseText = await result.response.text();
    const cleanedHtml = responseText
        .replace(/^(html|```html|```)\n?/i, "")
        .replace(/```$/i, "")
        .replace(/\*\*/g, "")
        .replace(/[\r\n]+/g, "")
        .replace(/[*_`~]/g, "")
        .trim();
    res.status(200).json({ html: cleanedHtml });
});
//# sourceMappingURL=blog.js.map