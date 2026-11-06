# Living in Concord NC | Your 2026 Relocation Guide | LivingInConcord.com
        
- Build a real estate authority website called LivingInConcord.com for Franklin Bellamy at Unlocking Real Estate, a Concord NC realtor.  
- Sections:  
  * Homepage — hero section, market stats bar, neighborhood preview cards, about Franklin, featured listings area, testimonials, lead capture CTA  
  * About Franklin — story, expertise, neighborhoods served, contact info  
  * Neighborhoods Hub — overview page linking to 10 individual neighborhood pages  
  * Market Reports — monthly updated market data page with stats and charts  
  * Moving to Concord Guide — 3000+ word relocation guide with downloadable PDF lead magnet  
  * Blog — category‑based blog for SEO content  
  * Contact / Schedule — consultation booking page  
- Design: Professional, clean, mobile‑first. Bold typography. Real estate authority feel — not a generic template; use attached image as a design layout.  
- Colors:  
  * Primary Green: #4daf6e  
  * Secondary Navy: #1A2845  
  * Accent Purple: #6B46C1  
  * Success Teal: #14B8A6  
  * Error Red: #EF4444  
  * Warning Amber: #F59E0B  
  * Info Blue: #3B82F6  
  * Background: #F9FAFB  
  * Foreground: #111827  
  * Muted Gray: #6B7280  
  * Border: #E5E7EB  
- Font: Inter
- Disclaimer requirement: Every new page and blog post MUST include a topic-specific disclaimer via the `PageAuthorBlock` component's `disclaimer` prop. The disclaimer must be specific to the page's content (e.g. market data pages cite MLS sources, school pages cite Cabarrus County Schools/NC DPI, safety pages cite verification sources like NeighborhoodScout.com, etc.). Never use a generic disclaimer — always tailor it to the data sources and subject matter of that specific page. For market data pages, use `showMarketDisclaimer={true}` instead.

Made with Floot.

# Instructions

For security reasons, the `env.json` file is not pre-populated — you will need to generate or retrieve the values yourself.  

For **JWT secrets**, generate a value with:  

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then paste the generated value into the appropriate field.  

For the **Floot Database**, download your database content as a gzipped pg_dump (.sql.gz) from the cog icon in the database view (right pane -> data -> floot data base -> cog icon on the left of the name), restore it into your own PostgreSQL database (gunzip -c database-dump.sql.gz | psql <connection string>), and then fill in the connection string value.  

**Note:** Floot OAuth will not work in self-hosted environments.  

For other external services, retrieve your API keys and fill in the corresponding values.  

Once everything is configured, you can build and start the service with:  

```
npm install -g pnpm
pnpm install
pnpm vite build
pnpm tsx server.ts
```
