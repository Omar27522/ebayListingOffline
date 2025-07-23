# Technical Overview: eBay Listings Reference Tool

## Purpose
Automates the retrieval and lookup of item details from public eBay listings for use in the shipping workflow.

## Architecture
- **Scraper Module:** Fetches and parses public eBay listings (titles & descriptions)
- **Database Module:** Stores scraped data locally (e.g., SQLite, JSON, or CSV)

### Listing Data Schema
Each listing record in the local database includes the following fields (as collected from public eBay listings):
- **Seller Username:** Confirms the listing is from your company
- **Item Number:** eBay's unique ID for each listing
- **Title:** Title of the listing
- **Description:** Crucial for shipping
- **Stock QTY:** Stock quantity for the listing
- **Item Specifics:** Item specifics for the listing
- **Price:** Price of the listing
- **Listing URL:** Direct link to the item
- **Listing Date:** Useful for tracking new vs older listings
- **Shipping Info:** Dimensions, weight, or handling time
- **# of watchers:** Number of watchers for the listing

- **Matcher/Search Module:** Matches internal item titles to eBay data and provides fast lookup
- **(Optional) Dashboard/UI:** Simple web or CLI interface for searching listings (dashboard/UI is optional and may be enabled or disabled)

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
- The tool automatically updates its local database at scheduled intervals (via scheduled job or internal timer), or you can trigger a manual refresh.
- Overwrites/updates the local database with new listings.
- No eBay account access is required for updates.

## Security Considerations
- Only accesses public data—no credentials or sensitive info required
- No write access to eBay
- No eBay account access required

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

---

## Setting Up Go Modules and Installing Dependencies (for GUI)

To build and run the GUI (using the `walk` library) on Windows, follow these steps in your project directory (where `app.go` is located):

1. **Initialize Go Modules**  
   This creates a `go.mod` file for dependency management:
   ```sh
   go mod init ebayListings
   ```

2. **Install required dependencies**  
   Download the GUI libraries:
   ```sh
   go get github.com/lxn/walk
   go get github.com/lxn/win
   ```

3. **Run the application**
   ```sh
   go run app.go
   ```

You do **not** need to manually download or move the `walk` library; Go Modules will handle everything automatically.
