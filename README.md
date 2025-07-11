# eBay Listings Reference Tool

A lightweight internal tool to help shipping staff quickly look up item titles and descriptions from our company’s public eBay listings. This improves shipping speed, reduces errors, and eliminates the need to interrupt office staff for listing information.

## Features
- Scans public eBay listings for item titles and descriptions
- Maintains a local, periodically updated database
- Lets users search by internal titles to retrieve eBay descriptions
- No eBay account access required
- Built in Go (Golang)

## Data Collected
For each eBay listing, the tool collects and saves the following fields:

| Field           | Purpose                                                      |
|-----------------|--------------------------------------------------------------|
| Item Number     | Unique ID for each listing — perfect for indexing and tracking|
| Title           | Helps match against your internal system titles              |
| Description     | Crucial for shipping — shows what's included, condition, etc.|
| Price           | Useful for reference or audit purposes                       |
| Listing URL     | Direct link to the item — handy for quick access             |
| Seller Username | Confirms the listing is from your company                    |
| Category        | Helps group similar items together                           |
| Listing Date    | Useful for tracking new vs older listings                    |
| Shipping Info   | Dimensions, weight, or handling time (if available)          |

## Getting Started

### Prerequisites
- Go 1.19 or newer
- Internet access (to fetch eBay listings)

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd ebayListings
   ```
2. Build the tool:
   ```sh
   go build -o ebaylistings
   ```

### Usage
1. Run the tool:
   ```sh
   ./ebaylistings
   ```
2. Use the search utility or dashboard (if enabled) to look up listings by title.

## Updating Listings
- The tool automatically updates its local database at scheduled intervals, or you can trigger a manual refresh.

## Support & Feedback
For questions or feature requests, contact the IT team or project maintainer.
