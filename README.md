# ⚡ Atlas Runner

Bootstrap service for Atlas autonomous system.

## Setup

1. Install dependencies:
2. ```bash
   npm install
   ```

   2. Set up environment variables:
   3. ```bash
      cp .env.example .env.local
      # Fill in your actual values in .env.local
      ```

      3. Run locally:
      4. ```bash
         npm run dev
         ```

         ## Environment Variables

         - `GCP_CREDENTIALS` - Full JSON string from gcp-atlas-owner.json
         - - `SUPABASE_URL` - Your Supabase project URL (https://YOURPROJECT.supabase.co)
           - - `SUPABASE_SERVICE_ROLE` - Service role key from Supabase
             - - `GITHUB_PAT` - GitHub Personal Access Token (classic)
               - - `VERCEL_TOKEN` - Vercel team token
                
                 - ## API Endpoints
                
                 - ### POST /seed
                 - Seeds data into Supabase tables.
                
                 - **Body:**
                 - ```json
                   {
                     "jobs": [{ "title": "test job" }],
                     "affiliates": [{ "name": "test affiliate" }]
                   }
                   ```

                   ### POST /redeploy
                   Triggers Vercel deployment for a project.

                   **Body:**
                   ```json
                   {
                     "projectId": "your-project-name"
                   }
                   ```

                   ## Deployment

                   1. Push to GitHub
                   2. 2. Link repository in Vercel
                      3. 3. Add environment variables in Vercel dashboard
                         4. 4. Deploy
                           
                            5. ## Testing
                           
                            6. Test endpoints after deployment:
                           
                            7. ```bash
                               # Seed data
                               curl -X POST https://your-vercel-url/seed \
                                 -H "Content-Type: application/json" \
                                 -d '{"jobs": [{"title": "test"}]}'

                               # Trigger redeploy
                               curl -X POST https://your-vercel-url/redeploy \
                                 -H "Content-Type: application/json" \
                                 -d '{"projectId": "wowzah"}'
                               ```
