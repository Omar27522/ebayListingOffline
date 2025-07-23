# eBay Listings Reference Tool - Development Roadmap

## 🎯 Project Overview
Build a vanilla JavaScript web application for one-time eBay data collection with local storage and fast offline search. Shipping staff can quickly lookup eBay item IDs without constant internet connection or interrupting office staff.

**Key Approach:** Fetch once, store locally, search offline, update manually
**Target Store:** [ATG PC Store](https://www.ebay.com/sch/i.html?_dkr=1&iconV2Request=true&_blrs=recall_filtering&_ssn=atg_pc&store_cat=0&store_name=atgpc&_oac=1)

## 📋 Phase 1: Foundation & Setup (Days 1-3)

### 1.1 Project Structure
- [ ] Create basic file structure
  ```
  JS_listings/
  ├── index.html
  ├── css/
  │   └── style.css
  ├── js/
  │   ├── main.js
  │   ├── ebay-fetcher.js
  │   └── storage.js
  └── data/
      └── cache.json
  ```

### 1.2 Basic HTML Layout
- [ ] Create simple, clean interface for shipping staff
- [ ] Add "Fetch Listings" button for initial data load
- [ ] Add "Update Listings" button for manual refresh
- [ ] Include search input for fast local lookup
- [ ] Design listings display table with item ID and title
- [ ] Add status indicators (last updated, total items)

### 1.3 CSS Styling
- [ ] Mobile-first responsive design
- [ ] Clean, professional interface
- [ ] Loading states and animations
- [ ] Print-friendly styles

## 🔧 Phase 2: One-Time Data Collection (Days 4-7)

### 2.1 eBay Data Fetching Strategy
**⚠️ Critical Challenge: CORS Policy**

eBay blocks direct browser requests. Solutions prioritized for one-time fetch:
1. **CORS Proxy Service** (Recommended for simplicity)
   - Use public CORS proxy for initial fetch
   - Only needed during manual updates
   - No server maintenance required

2. **Browser Extension** (Alternative)
   - Can bypass CORS restrictions
   - Direct access to eBay pages
   - One-time installation for staff

3. **Manual Data Import** (Fallback)
   - CSV/JSON file uploads
   - Staff exports from eBay seller hub
   - No CORS issues

### 2.2 Simplified Data Structure
```javascript
{
  "listings": [
    {
      "itemNumber": "123456789",
      "title": "Gaming PC - Intel i7",
      "fetchedAt": "2025-01-23T08:00:00Z"
    }
  ],
  "metadata": {
    "lastFetch": "2025-01-23T08:00:00Z",
    "totalItems": 150,
    "source": "ATG PC eBay Store"
  }
}
```

### 2.3 Local Storage Implementation
- [ ] localStorage for simple JSON storage (sufficient for item count)
- [ ] Data validation and error handling
- [ ] Export/import functionality for backup
- [ ] Clear cache option for fresh start
- [ ] Storage size monitoring

## 🔍 Phase 3: Search & Filter Features (Days 8-12)

### 3.1 Search Implementation
- [ ] Real-time search as user types
- [ ] Search by item number (exact match)
- [ ] Search by title keywords
- [ ] Fuzzy search for typos
- [ ] Search result highlighting

### 3.2 Advanced Filtering
- [ ] Filter by listing status
- [ ] Date range filtering
- [ ] Category filtering (if available)
- [ ] Sort options (title, date, relevance)

### 3.3 Performance Optimization
- [ ] Debounced search input (300ms delay)
- [ ] Virtual scrolling for large datasets
- [ ] Lazy loading of descriptions
- [ ] Search result pagination

## 🎨 Phase 4: User Experience (Days 13-16)

### 4.1 Shipping Staff Workflow
- [ ] Quick-access buttons for common searches
- [ ] Keyboard shortcuts (Ctrl+F for search)
- [ ] Copy-to-clipboard functionality
- [ ] Export selected listings to CSV
- [ ] Print-friendly listing details

### 4.2 Data Management UI
- [ ] Manual refresh button with progress
- [ ] Last update timestamp display
- [ ] Data statistics (total listings, last sync)
- [ ] Error notifications and retry options

### 4.3 Offline Capability
- [ ] Service Worker for offline access
- [ ] Cached data availability indicator
- [ ] Graceful degradation when offline

## 🔄 Phase 5: Data Updates & Reliability (Days 17-20)

### 5.1 Update Mechanisms
- [ ] Manual refresh functionality
- [ ] Scheduled background updates (if browser extension)
- [ ] Incremental updates (only changed listings)
- [ ] Update conflict resolution

### 5.2 Error Handling & Recovery
- [ ] Network error handling
- [ ] Data corruption recovery
- [ ] User-friendly error messages
- [ ] Automatic retry with exponential backoff

## 🚀 Phase 6: Deployment & Testing (Days 21-25)

### 6.1 Testing Strategy
- [ ] Unit tests for search functions
- [ ] Integration tests for data flow
- [ ] User acceptance testing with shipping staff
- [ ] Performance testing with large datasets

### 6.2 Documentation
- [ ] User manual for shipping staff
- [ ] Technical documentation
- [ ] Troubleshooting guide
- [ ] Update procedures

### 6.3 Deployment
- [ ] Local network deployment
- [ ] Staff training sessions
- [ ] Feedback collection system
- [ ] Maintenance schedule

## 🎯 Success Metrics

- **Performance**: Search results < 500ms
- **Usability**: Staff can find items in < 30 seconds
- **Reliability**: 99% uptime during business hours
- **Data Freshness**: Updates within 24 hours
- **User Adoption**: 80% of shipping staff using tool

## 🚨 Risk Mitigation

### High Priority Risks
1. **CORS Blocking**: Have backup manual import ready
2. **eBay Rate Limiting**: Implement respectful scraping
3. **Data Volume**: Test with realistic dataset sizes
4. **Browser Compatibility**: Test on staff computers

### Contingency Plans
- Manual CSV import as fallback
- Browser extension if CORS can't be solved
- Simplified UI if performance issues arise
- Staff training for edge cases

## 📅 Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| 1 | 3 days | Basic structure & UI |
| 2 | 4 days | Data fetching & storage |
| 3 | 5 days | Search & filtering |
| 4 | 4 days | UX improvements |
| 5 | 4 days | Updates & reliability |
| 6 | 5 days | Testing & deployment |

**Total Estimated Time: 25 days**

## 🔧 Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: IndexedDB with fallback to localStorage
- **Data Format**: JSON
- **Deployment**: Static files on local network
- **Testing**: Manual + basic unit tests

---

*Last Updated: January 23, 2025*
