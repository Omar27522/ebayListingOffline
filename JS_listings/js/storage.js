/**
 * Storage Module - Handles localStorage operations for eBay listings data
 * Part of eBay Listings Reference Tool
 */

const Storage = {
    // Storage keys
    KEYS: {
        LISTINGS: 'ebay_listings_data',
        LAST_SYNC: 'ebay_last_sync',
        ITEM_COUNT: 'ebay_item_count'
    },

    /**
     * Save listings data to localStorage
     * @param {Array} listings - Array of listing objects {itemNumber, title}
     */
    saveListings(listings) {
        try {
            const data = {
                listings: listings,
                timestamp: new Date().toISOString(),
                count: listings.length
            };
            
            localStorage.setItem(this.KEYS.LISTINGS, JSON.stringify(data));
            localStorage.setItem(this.KEYS.LAST_SYNC, data.timestamp);
            localStorage.setItem(this.KEYS.ITEM_COUNT, data.count.toString());
            
            console.log(`Saved ${listings.length} listings to localStorage`);
            return true;
        } catch (error) {
            console.error('Error saving listings to localStorage:', error);
            return false;
        }
    },

    /**
     * Load listings data from localStorage
     * @returns {Array} Array of listing objects or empty array
     */
    loadListings() {
        try {
            const data = localStorage.getItem(this.KEYS.LISTINGS);
            if (!data) {
                return [];
            }
            
            const parsed = JSON.parse(data);
            return parsed.listings || [];
        } catch (error) {
            console.error('Error loading listings from localStorage:', error);
            return [];
        }
    },

    /**
     * Get last sync timestamp
     * @returns {string|null} ISO timestamp string or null
     */
    getLastSync() {
        return localStorage.getItem(this.KEYS.LAST_SYNC);
    },

    /**
     * Get stored item count
     * @returns {number} Number of stored items
     */
    getItemCount() {
        const count = localStorage.getItem(this.KEYS.ITEM_COUNT);
        return count ? parseInt(count, 10) : 0;
    },

    /**
     * Clear all stored data
     */
    clearAll() {
        try {
            localStorage.removeItem(this.KEYS.LISTINGS);
            localStorage.removeItem(this.KEYS.LAST_SYNC);
            localStorage.removeItem(this.KEYS.ITEM_COUNT);
            console.log('Cleared all localStorage data');
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    /**
     * Check if storage has data
     * @returns {boolean} True if data exists
     */
    hasData() {
        return this.getItemCount() > 0;
    },

    /**
     * Get storage usage info
     * @returns {Object} Storage usage statistics
     */
    getStorageInfo() {
        try {
            const data = localStorage.getItem(this.KEYS.LISTINGS);
            const sizeBytes = data ? new Blob([data]).size : 0;
            const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
            
            return {
                itemCount: this.getItemCount(),
                sizeBytes: sizeBytes,
                sizeMB: sizeMB,
                lastSync: this.getLastSync()
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return {
                itemCount: 0,
                sizeBytes: 0,
                sizeMB: '0.00',
                lastSync: null
            };
        }
    }
};

// Make Storage available globally
window.Storage = Storage;
