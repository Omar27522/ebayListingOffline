/**
 * Main Module - Application controller and UI management
 * Part of eBay Listings Reference Tool
 */

const App = {
    // DOM elements
    elements: {},
    
    // Application state
    state: {
        listings: [],
        filteredListings: [],
        isLoading: false,
        hasData: false
    },

    /**
     * Initialize the application
     */
    init() {
        console.log('Initializing eBay Listings Reference Tool...');
        
        // Cache DOM elements
        this.cacheElements();
        
        // Bind event listeners
        this.bindEvents();
        
        // Load existing data
        this.loadExistingData();
        
        // Update UI state
        this.updateUI();
        
        console.log('Application initialized successfully');
    },

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        this.elements = {
            syncBtn: document.getElementById('syncBtn'),
            syncMessage: document.getElementById('syncMessage'),
            lastUpdated: document.getElementById('lastUpdated'),
            itemCount: document.getElementById('itemCount'),
            searchInput: document.getElementById('searchInput'),
            clearBtn: document.getElementById('clearBtn'),
            searchResults: document.getElementById('searchResults'),
            resultsTable: document.getElementById('resultsTable'),
            resultsBody: document.getElementById('resultsBody'),
            footerLastSync: document.getElementById('footerLastSync')
        };
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Sync button
        this.elements.syncBtn.addEventListener('click', () => this.handleSync());
        
        // Search input
        this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Clear button
        this.elements.clearBtn.addEventListener('click', () => this.handleClear());
    },

    /**
     * Load existing data from storage
     */
    loadExistingData() {
        try {
            this.state.listings = Storage.loadListings();
            this.state.hasData = Storage.hasData();
            
            if (this.state.hasData) {
                console.log(`Loaded ${this.state.listings.length} listings from storage`);
                this.state.filteredListings = [...this.state.listings];
            }
        } catch (error) {
            console.error('Error loading existing data:', error);
            this.showMessage('Error loading stored data', 'error');
        }
    },

    /**
     * Handle sync button click
     */
    async handleSync() {
        if (this.state.isLoading) {
            return;
        }

        try {
            this.setLoading(true);
            this.showMessage('Fetching eBay listings... This may take a while.', 'info');
            
            // Fetch new data
            const listings = await Fetcher.fetchListings();
            
            // Validate data
            if (!Fetcher.validateData(listings)) {
                throw new Error('Invalid data received from eBay');
            }
            
            // Save to storage
            const saved = Storage.saveListings(listings);
            if (!saved) {
                throw new Error('Failed to save data to local storage');
            }
            
            // Update application state
            this.state.listings = listings;
            this.state.filteredListings = [...listings];
            this.state.hasData = true;
            
            // Update UI
            this.updateUI();
            this.renderResults();
            
            this.showMessage(`Successfully synced ${listings.length} listings!`, 'success');
            
        } catch (error) {
            console.error('Sync error:', error);
            this.showMessage(`Sync failed: ${error.message}`, 'error');
        } finally {
            this.setLoading(false);
        }
    },

    /**
     * Handle search input
     */
    handleSearch(query) {
        if (!this.state.hasData) {
            return;
        }

        const trimmedQuery = query.trim();
        
        if (trimmedQuery === '') {
            // Show all listings
            this.state.filteredListings = [...this.state.listings];
        } else {
            // Exact match search in titles only
            this.state.filteredListings = this.state.listings.filter(listing =>
                listing.title.toLowerCase().includes(trimmedQuery.toLowerCase())
            );
        }
        
        this.renderResults();
        this.updateSearchInfo(trimmedQuery);
    },

    /**
     * Handle clear button click
     */
    handleClear() {
        this.elements.searchInput.value = '';
        this.handleSearch('');
    },

    /**
     * Set loading state
     */
    setLoading(isLoading) {
        this.state.isLoading = isLoading;
        
        if (isLoading) {
            this.elements.syncBtn.classList.add('loading');
            this.elements.syncBtn.disabled = true;
        } else {
            this.elements.syncBtn.classList.remove('loading');
            this.elements.syncBtn.disabled = false;
        }
    },

    /**
     * Show message to user
     */
    showMessage(text, type = 'info') {
        this.elements.syncMessage.textContent = text;
        this.elements.syncMessage.className = `message ${type}`;
        this.elements.syncMessage.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.elements.syncMessage.style.display = 'none';
            }, 5000);
        }
    },

    /**
     * Update UI state based on application state
     */
    updateUI() {
        const storageInfo = Storage.getStorageInfo();
        
        // Update item count
        this.elements.itemCount.textContent = `${storageInfo.itemCount} items`;
        
        // Update last sync time
        const lastSync = this.formatLastSync(storageInfo.lastSync);
        this.elements.lastUpdated.textContent = lastSync;
        this.elements.footerLastSync.textContent = lastSync;
        
        // Enable/disable search based on data availability
        if (this.state.hasData) {
            this.elements.searchInput.disabled = false;
            this.elements.clearBtn.disabled = false;
            this.elements.searchInput.placeholder = 'Search by title (exact match)...';
            this.updateSearchInfo('');
        } else {
            this.elements.searchInput.disabled = true;
            this.elements.clearBtn.disabled = true;
            this.elements.searchInput.placeholder = 'Search disabled - sync data first';
            this.elements.searchResults.textContent = 'Search disabled - sync data first';
        }
    },

    /**
     * Update search info display
     */
    updateSearchInfo(query) {
        const total = this.state.listings.length;
        const filtered = this.state.filteredListings.length;
        
        if (query.trim() === '') {
            this.elements.searchResults.textContent = `Showing all ${total} items`;
        } else {
            this.elements.searchResults.textContent = `Found ${filtered} of ${total} items matching "${query}"`;
        }
    },

    /**
     * Render search results in table
     */
    renderResults() {
        const tbody = this.elements.resultsBody;
        
        if (!this.state.hasData || this.state.filteredListings.length === 0) {
            const message = !this.state.hasData 
                ? 'No data available - click "Sync eBay Listings" to get started'
                : 'No items found matching your search';
                
            tbody.innerHTML = `
                <tr class="no-data">
                    <td colspan="2">${message}</td>
                </tr>
            `;
            return;
        }
        
        // Render listings
        tbody.innerHTML = this.state.filteredListings
            .map(listing => `
                <tr>
                    <td>${this.escapeHtml(listing.itemNumber)}</td>
                    <td>${this.escapeHtml(listing.title)}</td>
                </tr>
            `)
            .join('');
    },

    /**
     * Format last sync timestamp for display
     */
    formatLastSync(timestamp) {
        if (!timestamp) {
            return 'Never';
        }
        
        try {
            const date = new Date(timestamp);
            return date.toLocaleString();
        } catch (error) {
            return 'Unknown';
        }
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Make App available globally for debugging
window.App = App;
