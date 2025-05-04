# 🌍 GlobeScope - Country Explorer Application

This is a React-based web application that allows users to explore country data from the REST Countries API. Users can search for countries, filter by region or language, and view detailed information. The application also includes a simple login feature and lets users mark countries as favorites (stored locally).

---

## 🔧 Application Setup

### 1. Clone the Repository

git clone https://github.com/isiniperera/my-country-explorer-deploy.git
cd my-country-explorer-deploy

### 2. Install the dependencies

npm install

### 3. Start the Development Server

npm start

### 4. Build for Production

npm run build

### 5. Hosted URL

🔗 https://jovial-conkies-7ff337.netlify.app

### 6. API Used

REST Countries API v3.1
URL: https://restcountries.com/v3.1
    Fetches real-time data of all countries
    Provides data on population, region, capital, currencies, languages, and borders

### 7. Features

    Light/Dark Mode Toggle
    Country Search by Name
    Filter by Region or Language
    View Detailed Country Information
    Mark Favorite Countries (saved per user)
    Simple LocalStorage-based Login System

### 8. Challenges Faced & Solutions

-> Language Filtering:
The API structure required nested traversal to extract unique languages. Solved using a dynamic language extraction function and map logic.

-> User-Based Favorites:
Needed to store favorites based on the logged-in user. Solved by using a favorites-<username> key pattern in localStorage.

-> Long Netlify Build:
The build took time due to Netlify post-processing. Allowed it to complete, as it did eventually finish successfully.

### 9. Technologies Used

    React (with Hooks and Functional Components)
    React Router DOM
    JavaScript ES6+
    CSS Modules
    REST API (REST Countries)
    Netlify for Deployment
    LocalStorage for simple state persistence

### 10. Authentication

    Simple local login with username
    Session is stored in localStorage
    No backend or password system

### 11. Submission Info

    GitHub Repository:
    🔗 https://github.com/isiniperera/my-country-explorer-deploy

    GitHub Classroom Link:
    🔗 https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-isiniperera

    Hosted Site (Netlify):
    🔗 https://jovial-conkies-7ff337.netlify.app

### 12. Testing

### Unit & Integration Tests
- Used **Jest** and **React Testing Library** for component testing.
- Tested components like `CountryCard`, `SearchBar`, and pages like `Home` .
- Verified rendering, props handling, and integration with user events.

### Responsiveness
- Fully responsive across mobile,  desktop views.
- Verified using Chrome DevTools with various screen breakpoints.

### Cross-Browser Compatibility
- Tested on Chrome, Firefox.
- Ensured consistent behavior, rendering, and layout across all browsers.
