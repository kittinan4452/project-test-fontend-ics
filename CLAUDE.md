# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Run dev server with network access
npm run host
```

**Important**: Before running the dev server locally, you may need to remove the `base` configuration from `vite.config.ts` to avoid routing issues. For GitHub Pages deployment, the `base` should be set to `/project-test-frontend-ics/`.

## Project Overview

This is a React + TypeScript + Vite application for displaying a list of places (restaurants, cafes, bakeries) with filtering, searching, and pagination capabilities. The app uses:

- **React 18** with TypeScript
- **React Router v6** for navigation
- **Material UI (MUI)** for UI components and icons
- **Tailwind CSS** + **DaisyUI** for styling
- **Vite** as the build tool

## Architecture

### Data Source
The app uses a static JSON file (`src/json-file/example_data.json`) as the data source containing place information:
- Each place has: `id`, `name`, `categories`, `profile_image_url`, `images[]`, `operation_time[]`, `rating`, `address`
- Categories include: restaurant, cafe, bakery
- Operation times include day-specific opening/closing hours

### Routing Structure
- `/` - List page (`Listpages` component) - displays filtered/searchable list of places
- `/detail/:id` - Detail page (`DetailPage` component) - shows detailed information for a specific place

### Component Architecture

**App.tsx**: Root component with Router setup

**Navbar.tsx**: Top navigation bar containing:
- User profile dropdown menu
- Notification bell
- Sidebar integration

**Sidebar.tsx**: Left sidebar with:
- ICS logo
- Navigation placeholder

**Listpages.tsx** (src/components/List-page/): Main list view with:
- Category filter dropdown (All/Restaurant/Bakery/Cafe)
- Search input for place names
- Paginated grid display (9 items per page)
- Image carousel for mobile view (3 images per place)
- Uses `activeImageMap` state to track carousel position per item

**Detail-page.tsx** (src/components/Detail-page/): Detail view with:
- Back button navigation
- Mobile toggle between "INFORMATION" and "IMAGE" segments
- Displays place info: profile image, name, rating, address, opening hours
- Shows 3 place images

### State Management Patterns

**Listpages.tsx**:
- `searchTerm` - search input value
- `selectedCategory` - filter category selection
- `filteredData` - filtered places array
- `currentPage` - pagination current page
- `activeImageMap` - object tracking carousel slide index per place ID

**Detail-page.tsx**:
- `selectedSegment` - 'information' | 'image' for mobile view toggle

### Styling Approach

The project uses a hybrid styling approach:
- **Tailwind CSS** utility classes for layout, spacing, responsiveness
- **DaisyUI** component classes (select, input, carousel)
- **Material UI** styled components for complex UI elements
- **Custom CSS** via Tailwind directives (@tailwind in index.css)

Responsive breakpoints use Tailwind's default: `sm`, `md`, `lg`, `xl`, `max-sm`, etc.

### Font Configuration

The Kanit font family is loaded via Google Fonts and applied throughout the app using the `font-kanit` utility class.

### Image Handling

- Static images in `public/images/` (profile, logo)
- External Unsplash URLs for place images (from JSON data)
- Profile image import: `import Profile from "../../public/images/Rectangle 296.png"`
- Logo import: `import Logo from "../../public/images/ics-logo.jpg"`

## Key Implementation Details

### Filtering and Searching (Listpages.tsx:33-40)
Filtering combines category match and search term:
- Category match: `item.categories.includes(selectedCategory)` or 'All'
- Search match: `item.name.toLowerCase().includes(searchTerm.toLowerCase())`

### Pagination Logic (Listpages.tsx:66-69)
- 9 items per page
- `indexOfLastItem = currentPage * itemsPerPage`
- `currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)`

### Mobile Carousel (Listpages.tsx:153-185)
Each place item has its own carousel state tracked via `activeImageMap[itemId]`.
The carousel uses DaisyUI classes with manual navigation buttons.

### Type Safety
Both list and detail components define TypeScript interfaces matching the JSON data structure. Note that `operation_time` in the list page uses `{ time_open, time_close }` while detail page includes `{ time_open, time_close, day }` - ensure consistency when modifying these interfaces.
