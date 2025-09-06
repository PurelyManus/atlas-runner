import express from "express";
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json({ limit: "10mb" }));

// ENV VARS needed:
// GCP_CREDENTIALS (full JSON string)
// SUPABASE_URL
// SUPABASE_SERVICE_ROLE
// GITHUB_PAT
// VERCEL_TOKEN

// Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

app.post("/seed", async (req, res) => {
    const { jobs, affiliates } = req.body;

           if (jobs) {
                 const { error } = await supabase.from("jobs").insert(jobs);
                 if (error) return res.status(400).json({ error });
           }
    if (affiliates) {
          const { error } = await supabase.from("affiliates").insert(affiliates);
          if (error) return res.status(400).json({ error });
    }

           res.json({ ok: true });
});

app.post("/redeploy", async (req, res) => {
    const { projectId } = req.body;
    const resp = await fetch(`https://api.vercel.com/v13/deployments`, {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
          body: JSON.stringify({ name: projectId, target: "production" })
    });
    const data = await resp.json();
    res.json(data);
});

app.listen(3000, () => console.log("⚡ Atlas Runner live on 3000"));
