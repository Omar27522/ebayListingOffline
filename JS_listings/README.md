# eBay Listings Reference Tool

A lightweight internal tool to help shipping staff quickly look up item titles and eBay item IDs from the company's public eBay listings. This improves shipping speed, reduces errors, and eliminates the need to interrupt office staff for listing information.

## Features
- One-time scan of public eBay listings with local storage
- Fast offline search of cached listings data
- Manual update capability (daily or as needed)
- Quick lookup of eBay item IDs and titles
- No eBay account access required
- No continuous internet connection needed after initial load

## Data Collected
For each eBay listing, the tool collects and saves the following fields locally:

| Field           | Purpose                                                      |
|-----------------|--------------------------------------------------------------|
| Item Number     | eBay's unique ID for each listing (for shipping reference)  |
| Title           | Title of the listing (for search and identification)        |


## Getting Started
store Link:
https://www.ebay.com/sch/i.html?_dkr=1&iconV2Request=true&_blrs=recall_filtering&_ssn=atg_pc&store_cat=0&store_name=atgpc&_oac=1

### Prerequisites
- Modern web browser
- Internet access (only for initial data fetch and manual updates)

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser

### Usage
1. **Initial Setup**: Click "Fetch Listings" to download and cache all eBay listings locally
2. **Search**: Use the search box to find listings by item ID, title, or keywords
3. **Offline Use**: After initial fetch, the tool works without internet connection

## Updating Listings
- **Manual Update**: Click the "Update Listings" button to refresh data from eBay
- **Recommended**: Update once daily or as needed
- **No Automatic Updates**: Tool only fetches data when you request it

## Support & Feedback
For questions or feature requests, contact the IT team or project Owner.
