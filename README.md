# eBay Listings Reference Tool

A lightweight internal tool to help shipping staff quickly look up item titles and descriptions from the company’s public eBay listings. This improves shipping speed, reduces errors, and eliminates the need to interrupt office staff for listing information.

## Features
- Scans public eBay listings
- Maintains a local, periodically updated database
- Lets users search, filter, and retrieve eBay descriptions
- No eBay account access required

## Data Collected
For each eBay listing, the tool collects and saves the following fields:

| Field           | Purpose                                                      |
|-----------------|--------------------------------------------------------------|
| Seller Username | Confirms the listing is from your company                    |
| Item Number     | ebay's unique ID for each listing                            |
| Title           | Title of the listing                                         |
| Description     | Crucial for shipping                                         |
| Stock QTY       | Stock quantity for the listing                               |
| Item Specifics  | Item specifics for the listing                               |
| Price           | Price of the listing                                         |
| Listing URL     | Direct link to the item                                      |
| Listing Date    | Useful for tracking new vs older listings                    |
| Shipping Info   | Dimensions, weight, or handling time                         |
| # of watchers   | Number of watchers for the listing                           |

## Getting Started

### Prerequisites
- Internet access (to fetch eBay listings)

### Installation
1. Download the latest release from the [releases page](https://github.com/your-repo/ebayListings/releases).
2. Extract the downloaded file to a directory of your choice, and run the `ebayOffline.exe` file.

### Usage
1. Run the tool:
   
2. Use the search utility or dashboard (if enabled) to look up listings by title.

## Updating Listings
- The tool automatically updates its local database at scheduled intervals, or you can trigger a manual refresh.

## Support & Feedback
For questions or feature requests, contact the IT team or project Owner.
