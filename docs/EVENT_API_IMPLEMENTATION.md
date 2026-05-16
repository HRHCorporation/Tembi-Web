# Event API Implementation Documentation

## Overview
Event module has been reimplemented to fetch data from database API (following the pattern from Blog module in `dev-aldy` branch).

## Architecture

### Database Schema
**Table:** `events`

#### Column Structure:
- `id` - INT, Primary Key, Auto Increment
- `title_ind` - VARCHAR(255), Event title in Indonesian
- `title_eng` - VARCHAR(255), Event title in English
- `tagline_ind` - VARCHAR(500), Event tagline in Indonesian
- `tagline_eng` - VARCHAR(500), Event tagline in English
- `short_description_ind` - TEXT, Short description in Indonesian
- `short_description_eng` - TEXT, Short description in English
- `description_ind` - TEXT, Full description (JSON array) in Indonesian
- `description_eng` - TEXT, Full description (JSON array) in English
- `thumbnail` - VARCHAR(500), Main image URL
- `slug` - VARCHAR(255), URL-friendly identifier (UNIQUE)
- `event_date` - DATE, Event date
- `event_time` - VARCHAR(50), Event time (e.g., "09:00 - 17:00")
- `location` - VARCHAR(255), Event location
- `capacity` - INT, Maximum participants
- `price` - DECIMAL(15,2), Event price in IDR
- `included_items_ind` - TEXT, What's included (JSON array) in Indonesian
- `included_items_eng` - TEXT, What's included (JSON array) in English
- `requirements_ind` - TEXT, Requirements (JSON array) in Indonesian
- `requirements_eng` - TEXT, Requirements (JSON array) in English
- `gallery_images` - TEXT, Gallery images (JSON array of URLs)
- `is_active` - TINYINT(1), Active status (1 = active, 0 = inactive)
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

#### Indexes:
- PRIMARY KEY (`id`)
- INDEX `idx_slug` (`slug`)
- INDEX `idx_event_date` (`event_date`)
- INDEX `idx_is_active` (`is_active`)

### API Endpoints

#### 1. GET `/api/public/events`
**Purpose:** Fetch list of all active events

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title_ind": "Upacara Pernikahan Jawa",
      "title_eng": "Javanese Wedding Ceremony",
      "shortDesc_ind": "Upacara pernikahan tradisional...",
      "shortDesc_eng": "Traditional Javanese wedding...",
      "imageUrl": "https://...",
      "slug": "javanese-wedding-ceremony",
      "date": "2025-06-15",
      "location": "Main Pendopo",
      "capacity": 150,
      "price": 25000000
    }
  ]
}
```

**Query Details:**
- Filters: Only `is_active = 1` events
- Ordering: By `event_date` ASC (upcoming events first)

#### 2. GET `/api/public/events/[slug]`
**Purpose:** Fetch detailed information for a specific event

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name_ind": "Upacara Pernikahan Jawa",
    "name_eng": "Javanese Wedding Ceremony",
    "tagline_ind": "Upacara pernikahan tradisional...",
    "tagline_eng": "Traditional Javanese wedding...",
    "description_ind": ["Paragraph 1...", "Paragraph 2..."],
    "description_eng": ["Paragraph 1...", "Paragraph 2..."],
    "imageUrl": "https://...",
    "slug": "javanese-wedding-ceremony",
    "date": "2025-06-15",
    "time": "09:00 - 17:00",
    "location": "Main Pendopo",
    "capacity": 150,
    "price": 25000000,
    "included_ind": ["Item 1", "Item 2"],
    "included_eng": ["Item 1", "Item 2"],
    "requirements_ind": ["Req 1", "Req 2"],
    "requirements_eng": ["Req 1", "Req 2"],
    "galleryImages": ["https://...", "https://..."],
    "created_at": "2025-05-15...",
    "updated_at": "2025-05-15..."
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Event not found"
}
```

### Frontend Implementation

#### Event Listing Page
**File:** `app/(public)/event/page.tsx`

**Features:**
- ✅ Fetches data from `/api/public/events`
- ✅ Multi-language support (Indonesian/English)
- ✅ Loading state with spinner
- ✅ Error handling with retry button
- ✅ Empty state message
- ✅ Responsive grid layout (1/2/3 columns)

**State Management:**
```typescript
const [events, setEvents] = useState<Event[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

#### Event Detail Page
**File:** `app/(public)/event/[slug]/page.tsx`

**Features:**
- ✅ Fetches data from `/api/public/events/[slug]`
- ✅ Multi-language support
- ✅ Loading state with spinner
- ✅ 404 fallback when event not found
- ✅ Fallback to static data (for development without database)
- ✅ Dynamic rendering: Hero, Info, Gallery, Booking CTA

**Fallback Mechanism:**
If API fails or database is not set up, the page falls back to static data embedded in the component (6 sample events).

### Components

#### EventCard
**Props:**
```typescript
{
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  imageUrl: string;
  date: string;
  location: string;
  capacity: number;
  category: string; // Empty string (category removed)
}
```

#### EventInfo
**Props:**
```typescript
{
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  category: string; // Empty string
  description: string[];
  included: string[];
  requirements: string[];
}
```

#### EventGallery
**Props:**
```typescript
{
  eventName: string;
  galleryImages: string[];
}
```

#### EventBookingCTA
**Props:**
```typescript
{
  eventName: string;
  price: number;
  date: string;
}
```

## Database Setup

### Running Migration
```bash
# Using MySQL CLI
mysql -u your_username -p your_database < migrations/create_events_table.sql

# Or using phpMyAdmin
# Import the file: migrations/create_events_table.sql
```

### Sample Data
The migration file includes 2 sample events:
1. Javanese Wedding Ceremony (25,000,000 IDR)
2. Gamelan Music Workshop (250,000 IDR)

You can add more events through the admin panel (once CRUD is implemented).

## Multi-Language Support

The Event module fully supports both Indonesian (ID) and English (EN) languages:

### Frontend Language Switching:
```typescript
const eventName = language === 'id' ? event.name_ind : event.name_eng;
const eventTagline = language === 'id' ? event.tagline_ind : event.tagline_eng;
```

### Database Fields:
All user-facing text fields have both `_ind` and `_eng` versions:
- title_ind / title_eng
- tagline_ind / tagline_eng
- description_ind / description_eng
- included_items_ind / included_items_eng
- requirements_ind / requirements_eng

## JSON Field Format

Several fields store arrays as JSON strings in the database:

### Description:
```json
["Paragraph 1 text here...", "Paragraph 2 text here...", "Paragraph 3 text here..."]
```

### Included Items:
```json
["Item 1", "Item 2", "Item 3"]
```

### Requirements:
```json
["Requirement 1", "Requirement 2"]
```

### Gallery Images:
```json
["https://image1.jpg", "https://image2.jpg", "https://image3.jpg"]
```

## Next Steps (Admin CRUD)

To complete the Event module, you'll need to create admin pages:

### Required Admin Pages:
1. **Events List** - `/admin/events/page.tsx`
   - Data table with columns: ID, Title, Date, Location, Capacity, Price, Status
   - Actions: View, Edit, Delete, Toggle Active

2. **Create Event** - `/admin/events/create/page.tsx`
   - Form fields for all event properties
   - Image uploader for thumbnail
   - Multi-image uploader for gallery
   - Rich text editor for descriptions
   - Array input for included items & requirements

3. **Edit Event** - `/admin/events/edit/[id]/page.tsx`
   - Same as create, but pre-populated with existing data

### Required API Endpoints (Admin):
- `POST /api/admin/events` - Create new event
- `PUT /api/admin/events/[id]` - Update event
- `DELETE /api/admin/events/[id]` - Delete event
- `PATCH /api/admin/events/[id]/toggle` - Toggle active status

## Testing Checklist

- [ ] Database table created successfully
- [ ] Sample data inserted
- [ ] API endpoints return correct data
- [ ] Event listing page loads without errors
- [ ] Event detail page shows all information
- [ ] Language switching works (ID/EN)
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Images load from Unsplash URLs
- [ ] Responsive layout works on mobile
- [ ] 404 page shows for invalid slugs

## Notes

- **Database Connection**: Uses `lib/db-web` (same as Blog module)
- **Pattern**: Follows exact same structure as Blog API in dev-aldy branch
- **Backward Compatible**: Includes fallback static data for development
- **Category Removed**: Category badge removed from UI (as per previous update)
- **Image Hosting**: Currently uses Unsplash URLs, should be replaced with local uploads in admin

## Files Modified/Created

### Created:
- `app/api/public/events/route.ts`
- `app/api/public/events/[slug]/route.ts`
- `migrations/create_events_table.sql`
- `docs/EVENT_API_IMPLEMENTATION.md`

### Modified:
- `app/(public)/event/page.tsx` - API integration
- `app/(public)/event/[slug]/page.tsx` - API integration
- `next.config.ts` - Unsplash domain allowed

### Existing (Not Modified):
- `components/EventCard.tsx`
- `components/EventInfo.tsx`
- `components/EventGallery.tsx`
- `components/EventBookingCTA.tsx`

---

**Last Updated:** 2025-05-16
**Author:** Claude (AI Assistant)
**Branch:** dev-rivky
