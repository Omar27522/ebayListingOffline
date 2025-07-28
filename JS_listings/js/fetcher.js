/**
 * Fetcher Module - Handles eBay data fetching via CORS proxy
 * Part of eBay Listings Reference Tool
 */

const Fetcher = {
    // Configuration
    CONFIG: {
        CORS_PROXIES: [
            'https://api.allorigins.win/raw?url=',
            'https://corsproxy.io/?',
            'https://cors-anywhere.herokuapp.com/'
        ],
        EBAY_STORE_URL: 'https://www.ebay.com/sch/i.html?_dkr=1&iconV2Request=true&_blrs=recall_filtering&_ssn=atg_pc&store_cat=0&store_name=atgpc&_oac=1',
        TIMEOUT: 30000, // 30 seconds
        MAX_RETRIES: 3
    },

    /**
     * Fetch eBay listings data
     * @returns {Promise<Array>} Promise resolving to array of listings
     */
    async fetchListings() {
        console.log('Starting eBay listings fetch...');
        
        let lastError = null;
        
        // Try each CORS proxy in sequence
        for (let i = 0; i < this.CONFIG.CORS_PROXIES.length; i++) {
            const proxy = this.CONFIG.CORS_PROXIES[i];
            console.log(`Attempting fetch with proxy ${i + 1}/${this.CONFIG.CORS_PROXIES.length}: ${proxy}`);
            
            try {
                const listings = await this.fetchWithProxy(proxy);
                if (listings && listings.length > 0) {
                    console.log(`Successfully fetched ${listings.length} listings using proxy: ${proxy}`);
                    return listings;
                }
            } catch (error) {
                console.warn(`Proxy ${proxy} failed:`, error.message);
                lastError = error;
                
                // Continue to next proxy
                continue;
            }
        }
        
        // If all proxies failed
        throw new Error(`All CORS proxies failed. Last error: ${lastError?.message || 'Unknown error'}`);
    },

    /**
     * Fetch data using a specific CORS proxy
     * @param {string} proxyUrl - CORS proxy URL
     * @returns {Promise<Array>} Promise resolving to array of listings
     */
    async fetchWithProxy(proxyUrl) {
        // Construct the full URL with CORS proxy
        const fullUrl = proxyUrl + encodeURIComponent(this.CONFIG.EBAY_STORE_URL);
        
        // Fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.CONFIG.TIMEOUT);
        
        try {
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            if (!html || html.length < 1000) {
                throw new Error('Received empty or incomplete response');
            }
            
            console.log('Received HTML response, parsing listings...');
            
            // Parse the HTML to extract listings
            const listings = this.parseListings(html);
            
            if (!listings || listings.length === 0) {
                throw new Error('No listings found in response');
            }
            
            return listings;
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            
            throw error;
        }
    },

    /**
     * Parse HTML to extract listing data
     * @param {string} html - Raw HTML from eBay
     * @returns {Array} Array of listing objects
     */
    parseListings(html) {
        try {
            // Create a DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const listings = [];
            
            // Look for listing items - eBay uses various selectors
            const selectors = [
                '.s-item',
                '.sresult',
                '[data-view="mi:1686"]',
                '.srp-results .s-item'
            ];
            
            let items = [];
            for (const selector of selectors) {
                items = doc.querySelectorAll(selector);
                if (items.length > 0) {
                    console.log(`Found ${items.length} items using selector: ${selector}`);
                    break;
                }
            }
            
            if (items.length === 0) {
                console.warn('No listing items found with known selectors');
                return [];
            }
            
            // Extract data from each item
            items.forEach((item, index) => {
                try {
                    const listing = this.extractListingData(item);
                    if (listing && listing.itemNumber && listing.title) {
                        listings.push(listing);
                    }
                } catch (error) {
                    console.warn(`Error parsing item ${index}:`, error);
                }
            });
            
            // Remove duplicates based on item number
            const uniqueListings = this.removeDuplicates(listings);
            
            console.log(`Parsed ${uniqueListings.length} unique listings`);
            return uniqueListings;
            
        } catch (error) {
            console.error('Error parsing HTML:', error);
            throw new Error('Failed to parse eBay listings from HTML');
        }
    },

    /**
     * Extract listing data from a single item element
     * @param {Element} item - DOM element for a single listing
     * @returns {Object|null} Listing object or null
     */
    extractListingData(item) {
        try {
            // Try multiple selectors for item number
            const itemNumberSelectors = [
                '[data-itemid]',
                '.s-item__link',
                'a[href*="itm/"]',
                '.it-ttl a'
            ];
            
            let itemNumber = null;
            for (const selector of itemNumberSelectors) {
                const element = item.querySelector(selector);
                if (element) {
                    // Extract from data attribute
                    itemNumber = element.getAttribute('data-itemid');
                    
                    // Extract from href if no data attribute
                    if (!itemNumber && element.href) {
                        const match = element.href.match(/\/itm\/(\d+)/);
                        if (match) {
                            itemNumber = match[1];
                        }
                    }
                    
                    if (itemNumber) break;
                }
            }
            
            // Try multiple selectors for title
            const titleSelectors = [
                '.s-item__title',
                '.it-ttl',
                'h3',
                '.s-item__link'
            ];
            
            let title = null;
            for (const selector of titleSelectors) {
                const element = item.querySelector(selector);
                if (element) {
                    title = element.textContent || element.innerText;
                    if (title) {
                        title = title.trim();
                        // Clean up common eBay title prefixes
                        title = title.replace(/^(New Listing|SPONSORED)\s*/i, '');
                        break;
                    }
                }
            }
            
            if (itemNumber && title) {
                return {
                    itemNumber: itemNumber.trim(),
                    title: title.trim()
                };
            }
            
            return null;
            
        } catch (error) {
            console.warn('Error extracting listing data:', error);
            return null;
        }
    },

    /**
     * Remove duplicate listings based on item number
     * @param {Array} listings - Array of listing objects
     * @returns {Array} Array with duplicates removed
     */
    removeDuplicates(listings) {
        const seen = new Set();
        return listings.filter(listing => {
            if (seen.has(listing.itemNumber)) {
                return false;
            }
            seen.add(listing.itemNumber);
            return true;
        });
    },

    /**
     * Validate fetched data
     * @param {Array} listings - Array of listing objects
     * @returns {boolean} True if data is valid
     */
    validateData(listings) {
        if (!Array.isArray(listings)) {
            return false;
        }
        
        if (listings.length === 0) {
            return false;
        }
        
        // Check that all listings have required fields
        return listings.every(listing => 
            listing && 
            typeof listing.itemNumber === 'string' && 
            typeof listing.title === 'string' &&
            listing.itemNumber.trim().length > 0 &&
            listing.title.trim().length > 0
        );
    }
};

// Make Fetcher available globally
window.Fetcher = Fetcher;
