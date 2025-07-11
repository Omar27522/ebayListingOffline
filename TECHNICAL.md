# Technical Overview: eBay Listings Reference Tool

## Purpose
Automates the retrieval and lookup of item details from public eBay listings for use in the shipping workflow.

## Architecture
- **Scraper Module:** Fetches and parses public eBay listings (titles & descriptions)
- **Database Module:** Stores scraped data locally (e.g., SQLite, JSON, or CSV)

### Listing Data Schema
Each listing record in the local database includes the following fields:
- **Item Number:** Unique identifier for each listing (used for indexing and tracking)
- **Title:** The listing title (used for matching with internal titles)
- **Description:** Full item description (crucial for shipping details)
- **Price:** Listed price (useful for reference or audits)
- **Listing URL:** Direct link to the eBay item
- **Seller Username:** Confirms the listing is from your company
- **Category:** Category of the item (for grouping/sorting)
- **Listing Date:** Date the item was listed (helps track new/old listings)
- **Shipping Info:** Any available shipping details (dimensions, weight, handling time)

- **Matcher/Search Module:** Matches internal item titles to eBay data and provides fast lookup
- **(Optional) Dashboard/UI:** Simple web or CLI interface for searching listings

## Data Flow
1. Scraper fetches latest listings from company’s public eBay page
2. Parsed data is stored in the local database
3. User inputs a title or keyword
4. Matcher returns the corresponding eBay description

## Dependencies
- Go standard library
- HTTP client (for scraping)
- HTML parsing library (e.g., goquery)
- Local database (SQLite recommended, or flat files)
- (Optional) Web framework (e.g., Gin, for dashboard)

## Update Mechanism
- Scheduled job (cron or internal timer) or manual trigger
- Overwrites/updates local database with new listings

## Security Considerations
- Only accesses public data—no credentials or sensitive info required
- No write access to eBay

## Extensibility
- Can add support for other marketplaces (Amazon, Shopify, etc.)
- Can expand UI for advanced search/filter features
- Modular design for easy enhancement

## File Structure (suggested)
- `main.go` — entry point
- `scraper/` — scraping logic
- `db/` — database logic
- `ui/` — dashboard or CLI
- `README.md` — user documentation
- `TECHNICAL.md` — this file

## Contact
For technical questions, contact the project maintainer or IT lead.
