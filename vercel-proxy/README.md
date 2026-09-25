# MB Events Vercel proxy

Deploy this directory as a Vercel project named `mb-events` with the **Other** framework preset. It proxies every route to the public MB Events Sites deployment, which runs the Cloudflare database-backed questionnaire and lead API.

Keep the Sites deployment active. This Vercel project is a branded front door, not an independent copy of the application or database.
