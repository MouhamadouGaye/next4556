// pages/api/getPostContent.ts

import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  content?: string;
  error?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { slug } = req.query;

  if (typeof slug !== "string") {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ error: "File not found" });
  }
}
