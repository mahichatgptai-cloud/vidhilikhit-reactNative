# Vidhilikhit Vedic Astrology — Complete Backend API Specification

> **Base URL**: `http://ec2-3-25-116-172.ap-southeast-2.compute.amazonaws.com/api/v1` (or your staging/production domain)  
> **Headers**:  
> `Content-Type: application/json`  
> `Accept: application/json`  
> `Authorization: Bearer <access_token>` (for authenticated endpoints)  
> **Response Standard Envelope**:  
> ```json
> {
>   "success": true,
>   "message": "Operation successful",
>   "data": { ... },
>   "timestamp": "2026-11-03T16:20:00.000Z"
> }
> ```

---

## Table of Contents
1. [Flow 1: Authentication & User Setup](#1-authentication--user-setup)
2. [Flow 2: Multiple Profiles & Family Switcher](#2-multiple-profiles--family-switcher)
3. [Flow 3: Home Dashboard & Notifications](#3-home-dashboard--notifications)
4. [Flow 4: My Kundali (Astrological Calculations & Charts)](#4-my-kundali-astrological-calculations--charts)
   - Overview & Kundali Lagna Chart
   - Graha Positions (9 Celestial Planets)
   - Bhava (12 Houses)
   - Varga (Divisional Charts D1–D60)
   - Yoga (Auspicious & Inauspicious Planetary Combinations)
   - Dasha (Vimshottari Mahadasha, Antardasha & Timeline)
5. [Flow 5: Matchmaking & Kundali Milan](#5-matchmaking--kundali-milan)
   - Compatibility Overview & Highlights
   - Ashtakoota & Guna Milan (36 Points Detailed Breakdown)
6. [Flow 6: Daily Guidance & Panchang](#6-daily-guidance--panchang)
   - Timeframes: Today, Tomorrow, This Week, This Month
   - Lucky Elements & Affirmations
7. [Flow 7: Specialized Astrology Reports](#7-specialized-astrology-reports)
   - Catalog & Report Generation
8. [Flow 8: Ask Vidhilikhit Bot (AI Vedic Consultation)](#8-ask-vidhilikhit-bot-ai-vedic-consultation)
   - Chat Sessions, Messages & Context-Aware Suggestions
9. [Flow 9: Utility APIs (Location Autocomplete & Timezone Lookup)](#9-utility-apis-location-autocomplete--timezone-lookup)

---

## 1. Authentication & User Setup

### 1.1 Register User
- **Method & Route**: `POST /auth/register`
- **Description**: Registers a new user account with credentials and birth coordinates.
- **Request Body**:
```json
{
  "fullName": "Aarav Mehta",
  "email": "aarav.mehta@example.com",
  "password": "Password@123",
  "gender": "male",
  "dob": "1995-03-15",
  "tob": "10:30",
  "tobChoice": "exact",
  "pob": "Mumbai, Maharashtra, India",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "timeZone": "Asia/Kolkata"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "usr_98a72b10",
      "fullName": "Aarav Mehta",
      "email": "aarav.mehta@example.com",
      "gender": "male",
      "avatar": "https://cdn.vidhilikhit.com/avatars/aarav.jpg",
      "birthDetails": {
        "dob": "1995-03-15",
        "tob": "10:30:00",
        "tobChoice": "exact",
        "pob": "Mumbai, Maharashtra, India",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "timeZone": "Asia/Kolkata"
      },
      "activeProfileId": "prof_master_01"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "d8e3f2a1c0b9..."
    }
  }
}
```

### 1.2 Login User
- **Method & Route**: `POST /auth/login`
- **Request Body**:
```json
{
  "email": "aarav.mehta@example.com",
  "password": "Password@123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "usr_98a72b10",
      "fullName": "Aarav Mehta",
      "email": "aarav.mehta@example.com",
      "gender": "male",
      "avatar": "https://cdn.vidhilikhit.com/avatars/aarav.jpg",
      "activeProfileId": "prof_master_01"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "d8e3f2a1c0b9..."
    }
  }
}
```

### 1.3 Refresh Token
- **Method & Route**: `POST /auth/refresh-token`
- **Request Body**: `{ "refreshToken": "d8e3f2a1c0b9..." }`

---

## 2. Multiple Profiles & Family Switcher
Powers the **Switch Profile** and **Edit Profile** sections (`ProfileScreen.jsx` & `EditProfileScreen.jsx`).

### 2.1 Get All Family Profiles
- **Method & Route**: `GET /profiles`
- **Description**: Returns all profiles linked to the current user with active status indicator.
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "activeProfileId": "prof_01",
    "profiles": [
      {
        "id": "prof_01",
        "name": "Aarav Mehta",
        "relationship": "self",
        "gender": "male",
        "dob": "1995-03-15",
        "dobFormatted": "15 Mar 1995",
        "tob": "10:30",
        "tobFormatted": "10:30 AM",
        "pob": "Mumbai, India",
        "datePlaceStr": "15 Mar 1995 • Mumbai",
        "avatarUrl": "https://cdn.vidhilikhit.com/avatars/aarav.jpg",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "timeZone": "Asia/Kolkata",
        "isActive": true
      },
      {
        "id": "prof_02",
        "name": "Riya Mehta",
        "relationship": "spouse",
        "gender": "female",
        "dob": "1998-08-22",
        "dobFormatted": "22 Aug 1998",
        "tob": "14:15",
        "tobFormatted": "02:15 PM",
        "pob": "Pune, India",
        "datePlaceStr": "22 Aug 1998 • Pune",
        "avatarUrl": "https://cdn.vidhilikhit.com/avatars/riya.jpg",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "timeZone": "Asia/Kolkata",
        "isActive": false
      },
      {
        "id": "prof_03",
        "name": "Father",
        "relationship": "father",
        "gender": "male",
        "dob": "1968-01-10",
        "dobFormatted": "10 Jan 1968",
        "tob": "06:45",
        "tobFormatted": "06:45 AM",
        "pob": "Ahmedabad, India",
        "datePlaceStr": "10 Jan 1968 • Ahmedabad",
        "avatarUrl": "https://cdn.vidhilikhit.com/avatars/father.jpg",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "timeZone": "Asia/Kolkata",
        "isActive": false
      },
      {
        "id": "prof_04",
        "name": "Mother",
        "relationship": "mother",
        "gender": "female",
        "dob": "1972-05-05",
        "dobFormatted": "5 May 1972",
        "tob": "11:20",
        "tobFormatted": "11:20 AM",
        "pob": "Ahmedabad, India",
        "datePlaceStr": "5 May 1972 • Ahmedabad",
        "avatarUrl": "https://cdn.vidhilikhit.com/avatars/mother.jpg",
        "latitude": 23.0225,
        "longitude": 72.5714,
        "timeZone": "Asia/Kolkata",
        "isActive": false
      }
    ]
  }
}
```

### 2.2 Switch Active Profile
- **Method & Route**: `POST /profiles/:id/activate`
- **Description**: Switches the active profile context. All subsequent requests (Kundali, Guidance, Reports) automatically compute based on this active profile.
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Switched active profile to Riya Mehta",
  "data": {
    "activeProfileId": "prof_02"
  }
}
```

### 2.3 Add New Profile
- **Method & Route**: `POST /profiles`
- **Request Body**:
```json
{
  "name": "Rohan Mehta",
  "relationship": "child",
  "gender": "male",
  "dob": "2020-11-12",
  "tob": "08:15",
  "pob": "Mumbai, Maharashtra, India",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "timeZone": "Asia/Kolkata"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Profile created successfully",
  "data": {
    "id": "prof_05",
    "name": "Rohan Mehta",
    "relationship": "child",
    "gender": "male",
    "dobFormatted": "12 Nov 2020",
    "tobFormatted": "08:15 AM",
    "pob": "Mumbai, India",
    "datePlaceStr": "12 Nov 2020 • Mumbai",
    "avatarUrl": "https://cdn.vidhilikhit.com/avatars/default.jpg",
    "isActive": false
  }
}
```

### 2.4 Update Profile Details
- **Method & Route**: `PUT /profiles/:id`
- **Request Body**:
```json
{
  "name": "Aarav Mehta",
  "gender": "male",
  "dob": "1995-03-15",
  "tob": "10:30",
  "pob": "Mumbai, Maharashtra, India",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "timeZone": "Asia/Kolkata"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "prof_01",
    "name": "Aarav Mehta",
    "gender": "male",
    "dobFormatted": "15 Mar 1995",
    "tobFormatted": "10:30 AM",
    "pob": "Mumbai, India"
  }
}
```

### 2.5 Upload Profile Avatar
- **Method & Route**: `POST /profiles/:id/avatar`
- **Content-Type**: `multipart/form-data`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "data": {
    "avatarUrl": "https://cdn.vidhilikhit.com/avatars/aarav_custom_1793.jpg"
  }
}
```

---

## 3. Home Dashboard & Notifications
Powers `HomeScreen.jsx`.

### 3.1 Get Home Dashboard Summary
- **Method & Route**: `GET /home/dashboard`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "firstName": "Aarav",
      "fullName": "Aarav Mehta",
      "avatarUrl": "https://cdn.vidhilikhit.com/avatars/aarav.jpg"
    },
    "unreadNotificationsCount": 2,
    "kundaliCard": {
      "isReady": true,
      "title": "Your Kundali is Ready",
      "subtitle": "Explore your birth chart and personalized insights.",
      "rashi": "Aries (Mesha)",
      "lagna": "Taurus (Vrishabha)"
    },
    "dailyPanchangSnippet": {
      "tithi": "Shukla Dashami",
      "nakshatra": "Ashwini",
      "auspiciousTime": "11:45 AM – 12:30 PM (Abhijit)"
    },
    "vidhilikhitBotBanner": {
      "title": "Ask Our\nVidhilikhit Bot",
      "subtitle": "Get answers to your\nquestions anytime.",
      "promptSuggestion": "What does my 10th house say about my career?"
    }
  }
}
```

---

## 4. My Kundali (Astrological Calculations & Charts)
Powers `MyKundaliScreen.jsx`. Supports optional `?profileId=prof_01`.

### 4.1 Overview Tab & Kundali Chart
- **Method & Route**: `GET /kundali/overview`
- **Query Params**: `?profileId=prof_01&chartStyle=north_indian`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "profile": {
      "fullName": "Aarav Mehta",
      "birthDate": "15 March 1995",
      "birthTime": "10:30 AM",
      "birthPlace": "Mumbai, Maharashtra, India"
    },
    "summary": {
      "rashi": {
        "english": "Aries",
        "sanskrit": "Mesha",
        "lord": "Mars",
        "element": "Fire"
      },
      "nakshatra": {
        "name": "Ashwini",
        "pada": 3,
        "lord": "Ketu",
        "deity": "Ashwini Kumaras"
      },
      "lagna": {
        "english": "Taurus",
        "sanskrit": "Vrishabha",
        "lord": "Venus",
        "degree": "14° 28' 12\""
      }
    },
    "chart": {
      "chartStyle": "north_indian",
      "ascendantSign": 2,
      "svgUrl": "https://api.vidhilikhit.com/v1/kundali/chart-render/d1.svg",
      "houses": [
        { "house": 1, "signNumber": 2, "signName": "Taurus", "planets": [] },
        { "house": 2, "signNumber": 3, "signName": "Gemini", "planets": ["Jupiter"] },
        { "house": 3, "signNumber": 4, "signName": "Cancer", "planets": [] },
        { "house": 4, "signNumber": 5, "signName": "Leo", "planets": ["Moon", "Mercury"] },
        { "house": 5, "signNumber": 6, "signName": "Virgo", "planets": ["Venus"] },
        { "house": 6, "signNumber": 7, "signName": "Libra", "planets": [] },
        { "house": 7, "signNumber": 8, "signName": "Scorpio", "planets": ["Sun"] },
        { "house": 8, "signNumber": 9, "signName": "Sagittarius", "planets": ["Rahu"] },
        { "house": 9, "signNumber": 10, "signName": "Capricorn", "planets": [] },
        { "house": 10, "signNumber": 11, "signName": "Aquarius", "planets": ["Mars"] },
        { "house": 11, "signNumber": 12, "signName": "Pisces", "planets": ["Saturn"] },
        { "house": 12, "signNumber": 1, "signName": "Aries", "planets": ["Ketu"] }
      ]
    }
  }
}
```

### 4.2 Graha Tab (9 Planetary Positions)
- **Method & Route**: `GET /kundali/grahas`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "grahas": [
      {
        "id": "sun",
        "name": "Sun (Surya)",
        "sign": "Pisces (Meena)",
        "signSanskrit": "Meena",
        "house": "7th House",
        "houseNumber": 7,
        "degree": "00° 48' 22\"",
        "isRetrograde": false,
        "isCombust": false,
        "dignity": "Friendly",
        "nakshatra": "Purva Bhadrapada",
        "imageKey": "graha_sun"
      },
      {
        "id": "moon",
        "name": "Moon (Chandra)",
        "sign": "Cancer (Karka)",
        "signSanskrit": "Karka",
        "house": "4th House",
        "houseNumber": 4,
        "degree": "18° 14' 06\"",
        "isRetrograde": false,
        "isCombust": false,
        "dignity": "Own Sign",
        "nakshatra": "Ashlesha",
        "imageKey": "graha_moon"
      },
      {
        "id": "mars",
        "name": "Mars (Mangal)",
        "sign": "Taurus (Vrishabha)",
        "signSanskrit": "Vrishabha",
        "house": "10th House",
        "houseNumber": 10,
        "degree": "22° 36' 50\"",
        "isRetrograde": false,
        "isCombust": false,
        "dignity": "Neutral",
        "nakshatra": "Rohini",
        "imageKey": "graha_mars"
      },
      {
        "id": "mercury",
        "name": "Mercury (Budh)",
        "sign": "Aquarius (Kumbha)",
        "signSanskrit": "Kumbha",
        "house": "4th House",
        "houseNumber": 4,
        "degree": "11° 02' 14\"",
        "isRetrograde": true,
        "isCombust": false,
        "dignity": "Friendly",
        "nakshatra": "Shatabhisha",
        "imageKey": "graha_mercury"
      },
      {
        "id": "jupiter",
        "name": "Jupiter (Guru)",
        "sign": "Sagittarius (Dhanu)",
        "signSanskrit": "Dhanu",
        "house": "2nd House",
        "houseNumber": 2,
        "degree": "21° 54' 30\"",
        "isRetrograde": false,
        "isCombust": false,
        "dignity": "Own Sign (Moolatrikona)",
        "nakshatra": "Purva Ashadha",
        "imageKey": "graha_jupiter"
      },
      {
        "id": "venus",
        "name": "Venus (Shukra)",
        "sign": "Aries (Mesha)",
        "signSanskrit": "Mesha",
        "house": "5th House",
        "houseNumber": 5,
        "degree": "04° 15' 00\"",
        "isRetrograde": false,
        "isCombust": false,
        "dignity": "Neutral",
        "nakshatra": "Ashwini",
        "imageKey": "graha_venus"
      },
      {
        "id": "saturn",
        "name": "Saturn (Shani)",
        "sign": "Capricorn (Makar)",
        "signSanskrit": "Makar",
        "house": "11th House",
        "houseNumber": 11,
        "degree": "28° 42' 11\"",
        "isRetrograde": false,
        "isCombust": false,
        "dignity": "Own Sign",
        "nakshatra": "Dhanishta",
        "imageKey": "graha_saturn"
      },
      {
        "id": "rahu",
        "name": "Rahu",
        "sign": "Libra (Tula)",
        "signSanskrit": "Tula",
        "house": "8th House",
        "houseNumber": 8,
        "degree": "14° 08' 45\"",
        "isRetrograde": true,
        "isCombust": false,
        "dignity": "Friendly",
        "nakshatra": "Swati",
        "imageKey": "graha_rahu"
      },
      {
        "id": "ketu",
        "name": "Ketu",
        "sign": "Aries (Mesha)",
        "signSanskrit": "Mesha",
        "house": "12th House",
        "houseNumber": 12,
        "degree": "14° 08' 45\"",
        "isRetrograde": true,
        "isCombust": false,
        "dignity": "Neutral",
        "nakshatra": "Bharani",
        "imageKey": "graha_ketu"
      }
    ]
  }
}
```

### 4.3 Bhava Tab (12 Houses)
- **Method & Route**: `GET /kundali/bhavas`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "bhavas": [
      {
        "number": 1,
        "title": "Self & Personality",
        "sanskritName": "Tanu Bhava",
        "sign": "Taurus",
        "signLord": "Venus",
        "planetsPresent": [],
        "description": "Your nature, appearance, vitality, and life direction."
      },
      {
        "number": 2,
        "title": "Wealth & Family",
        "sanskritName": "Dhana Bhava",
        "sign": "Gemini",
        "signLord": "Mercury",
        "planetsPresent": ["Jupiter"],
        "description": "Finances, family speech, stored wealth, and values."
      },
      {
        "number": 3,
        "title": "Communication",
        "sanskritName": "Sahaja Bhava",
        "sign": "Cancer",
        "signLord": "Moon",
        "planetsPresent": [],
        "description": "Skills, courage, initiatives, and younger siblings."
      },
      {
        "number": 4,
        "title": "Home & Happiness",
        "sanskritName": "Sukha Bhava",
        "sign": "Leo",
        "signLord": "Sun",
        "planetsPresent": ["Moon", "Mercury"],
        "description": "Home, maternal bond, fixed assets, and inner peace."
      },
      {
        "number": 5,
        "title": "Creativity & Children",
        "sanskritName": "Putra Bhava",
        "sign": "Virgo",
        "signLord": "Mercury",
        "planetsPresent": ["Venus"],
        "description": "Intelligence, creative expression, romance, and progeny."
      },
      {
        "number": 6,
        "title": "Health & Service",
        "sanskritName": "Ari Bhava",
        "sign": "Libra",
        "signLord": "Venus",
        "planetsPresent": [],
        "description": "Health, daily routines, overcoming obstacles, and service."
      },
      {
        "number": 7,
        "title": "Relationships",
        "sanskritName": "Yuvati Bhava",
        "sign": "Scorpio",
        "signLord": "Mars",
        "planetsPresent": ["Sun"],
        "description": "Marriage, life partnerships, and public dealings."
      },
      {
        "number": 8,
        "title": "Transformation",
        "sanskritName": "Randhra Bhava",
        "sign": "Sagittarius",
        "signLord": "Jupiter",
        "planetsPresent": ["Rahu"],
        "description": "Longevity, deep transformation, research, and mysteries."
      },
      {
        "number": 9,
        "title": "Luck & Philosophy",
        "sanskritName": "Dharma Bhava",
        "sign": "Capricorn",
        "signLord": "Saturn",
        "planetsPresent": [],
        "description": "Higher wisdom, fortune, father, and spiritual evolution."
      },
      {
        "number": 10,
        "title": "Career & Status",
        "sanskritName": "Karma Bhava",
        "sign": "Aquarius",
        "signLord": "Saturn",
        "planetsPresent": ["Mars"],
        "description": "Profession, public reputation, leadership, and achievements."
      },
      {
        "number": 11,
        "title": "Gains & Network",
        "sanskritName": "Labha Bhava",
        "sign": "Pisces",
        "signLord": "Jupiter",
        "planetsPresent": ["Saturn"],
        "description": "Aspirations, income, friendships, and long-term gains."
      },
      {
        "number": 12,
        "title": "Losses & Liberation",
        "sanskritName": "Vyaya Bhava",
        "sign": "Aries",
        "signLord": "Mars",
        "planetsPresent": ["Ketu"],
        "description": "Foreign travels, expenditures, subconscious, and Moksha."
      }
    ]
  }
}
```

### 4.4 Varga Tab (Divisional Charts)
- **Method & Route**: `GET /kundali/vargas`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "vargas": [
      {
        "code": "D1",
        "title": "Rashi Chart",
        "description": "Primary physical constitution and core destiny.",
        "chartSvg": "https://api.vidhilikhit.com/v1/kundali/chart-render/d1.svg"
      },
      {
        "code": "D9",
        "title": "Navamsha",
        "description": "Spouse, marriage, inner nature and dharma.",
        "chartSvg": "https://api.vidhilikhit.com/v1/kundali/chart-render/d9.svg"
      },
      {
        "code": "D10",
        "title": "Dashamsha",
        "description": "Career achievements, fame, profession and power.",
        "chartSvg": "https://api.vidhilikhit.com/v1/kundali/chart-render/d10.svg"
      },
      {
        "code": "D7",
        "title": "Saptamsha",
        "description": "Children, creativity, progeny and legacy.",
        "chartSvg": "https://api.vidhilikhit.com/v1/kundali/chart-render/d7.svg"
      },
      {
        "code": "D4",
        "title": "Chaturthamsha",
        "description": "Fixed assets, fortune, real estate and home.",
        "chartSvg": "https://api.vidhilikhit.com/v1/kundali/chart-render/d4.svg"
      },
      {
        "code": "D12",
        "title": "Dwadashamsha",
        "description": "Ancestral roots, parents and past life karma.",
        "chartSvg": "https://api.vidhilikhit.com/v1/kundali/chart-render/d12.svg"
      }
    ]
  }
}
```

### 4.5 Yoga Tab (Auspicious & Important Yogas)
- **Method & Route**: `GET /kundali/yogas`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "totalYogasDetected": 4,
    "yogas": [
      {
        "id": "gaja-kesari",
        "title": "Gaja Kesari Yoga",
        "badge": "Present",
        "badgeType": "present",
        "description": "Brings wisdom, financial stability and respect in society.",
        "planetsInvolved": ["Jupiter", "Moon"],
        "strength": 88,
        "imageKey": "yoga_gajakesari"
      },
      {
        "id": "dhana",
        "title": "Dhana Yoga",
        "badge": "Present",
        "badgeType": "present",
        "description": "Indicates potential for wealth and financial growth.",
        "planetsInvolved": ["Jupiter", "Mercury"],
        "strength": 82,
        "imageKey": "yoga_dhana"
      },
      {
        "id": "raja",
        "title": "Raja Yoga",
        "badge": "Present",
        "badgeType": "present",
        "description": "Can bring success, leadership and higher status.",
        "planetsInvolved": ["Sun", "Mars"],
        "strength": 80,
        "imageKey": "yoga_raja"
      },
      {
        "id": "chandra-mangal",
        "title": "Chandra-Mangal Yoga",
        "badge": "Moderate",
        "badgeType": "moderate",
        "description": "Enhances mental strength and decision-making.",
        "planetsInvolved": ["Moon", "Mars"],
        "strength": 65,
        "imageKey": "yoga_chandramangal"
      }
    ]
  }
}
```

### 4.6 Dasha Tab (Vimshottari Dasha System)
- **Method & Route**: `GET /kundali/dasha`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "currentMahadasha": {
      "planet": "Saturn",
      "title": "Saturn Mahadasha",
      "startDate": "2019-01-14",
      "endDate": "2038-03-22",
      "period": "Jan 2019 – Mar 2038 (19 years)",
      "description": "A major 19-year cycle ruled by Saturn, emphasizing discipline, responsibility, enduring focus, and karmic refinement.",
      "imageKey": "graha_saturn"
    },
    "currentAntardasha": {
      "planet": "Mercury",
      "title": "Mercury",
      "startDate": "2024-02-10",
      "endDate": "2026-07-28",
      "period": "Feb 2024 – Jul 2026 (2 years 5 months)",
      "description": "A 2-year 5-month sub-period stimulating intellectual prowess, trade opportunities, analytical acumen, and communication.",
      "imageKey": "graha_mercury"
    },
    "upcomingAntardashas": [
      {
        "id": "ketu",
        "planet": "Ketu",
        "title": "Ketu Antardasha",
        "period": "Jul 2026 – Aug 2027",
        "startDate": "2026-07-28",
        "endDate": "2027-08-30",
        "description": "A spiritual transit encouraging introspection, subtle wisdom, and release of unnecessary attachments.",
        "imageKey": "graha_ketu"
      },
      {
        "id": "venus",
        "planet": "Venus",
        "title": "Venus Antardasha",
        "period": "Aug 2027 – Oct 2030",
        "startDate": "2027-08-30",
        "endDate": "2030-10-15",
        "description": "A gracious sub-period fostering creative arts, harmonious relationships, financial fortune, and lifestyle comforts.",
        "imageKey": "graha_venus"
      },
      {
        "id": "sun",
        "planet": "Sun",
        "title": "Sun Antardasha",
        "period": "Oct 2030 – Aug 2031",
        "startDate": "2030-10-15",
        "endDate": "2031-08-20",
        "description": "A clarifying period elevating self-sovereignty, leadership visibility, public honor, and executive authority.",
        "imageKey": "graha_sun"
      }
    ]
  }
}
```

---

## 5. Matchmaking & Kundali Milan
Powers `PartnerDetailsScreen.jsx`, `CompatibilityReportScreen.jsx`, and `CompatibilityDetailsScreen.jsx`.

### 5.1 Calculate Compatibility Report
- **Method & Route**: `POST /matchmaking/calculate`
- **Request Body**:
```json
{
  "person1": {
    "name": "Alivia Mondal",
    "gender": "female",
    "dob": "1995-03-15",
    "tob": "10:30",
    "pob": "Mumbai, Maharashtra, India",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "timeZone": "Asia/Kolkata"
  },
  "person2": {
    "name": "Aarav Sharma",
    "gender": "male",
    "dob": "1994-11-20",
    "tob": "14:15",
    "pob": "Pune, Maharashtra, India",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "timeZone": "Asia/Kolkata"
  }
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "matchId": "match_83921",
    "person1": { "name": "Alivia Mondal", "moonSign": "Cancer", "nakshatra": "Ashlesha" },
    "person2": { "name": "Aarav Sharma", "moonSign": "Taurus", "nakshatra": "Rohini" },
    "overall": {
      "percentage": "82%",
      "gunasObtained": 28,
      "gunasTotal": 36,
      "verdict": "High Match",
      "verdictDescription": "Strong natural harmony and shared emotional values indicate high matrimonial potential."
    },
    "highlights": [
      {
        "id": "emotional",
        "title": "Emotional Connection",
        "score": "90%",
        "icon": "ruby_heart",
        "description": "Strong emotional understanding and support."
      },
      {
        "id": "values",
        "title": "Values & Beliefs",
        "score": "78%",
        "icon": "leaf",
        "description": "Similar views on family, traditions and life goals."
      },
      {
        "id": "marriage",
        "title": "Marriage Prospects",
        "score": "76%",
        "icon": "match_rings",
        "description": "Favorable indications for a stable and harmonious marriage."
      },
      {
        "id": "harmony",
        "title": "Long-term Harmony",
        "score": "84%",
        "icon": "lotus_gold",
        "description": "Positive indications for a peaceful and fulfilling future."
      }
    ],
    "manglikAnalysis": {
      "person1Manglik": false,
      "person2Manglik": false,
      "isManglikDoshaCancelled": true,
      "summary": "No Manglik Dosha affliction present in this union."
    }
  }
}
```

### 5.2 Get Compatibility Detailed Breakdown
- **Method & Route**: `GET /matchmaking/:matchId/details`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "matchId": "match_83921",
    "overallScore": "82%",
    "detailedAspects": [
      {
        "id": "emotional",
        "title": "Emotional Connection",
        "score": "90%",
        "iconType": "ruby_heart",
        "description": "Strong emotional understanding and support between both individuals.",
        "details": "The moon and water elements harmonize exceptionally well, creating intuitive empathy and emotional resilience in the relationship."
      },
      {
        "id": "mental",
        "title": "Mental Compatibility",
        "score": "76%",
        "iconType": "lotus_gold",
        "description": "Good alignment in thinking, communication and approach to life.",
        "details": "Mercury positions encourage open intellectual discussions, joint problem solving, and mutual respect for individual perspectives."
      },
      {
        "id": "values",
        "title": "Values & Beliefs",
        "score": "78%",
        "iconType": "sun_face",
        "description": "Similar views on family, traditions and important life values.",
        "details": "Shared spiritual orientation, family cultural heritage, and harmonious ethical outlook facilitate long-term familial peace."
      },
      {
        "id": "marriage",
        "title": "Marriage Prospects",
        "score": "76%",
        "iconType": "match_rings",
        "description": "Favorable indications for a stable and harmonious marriage.",
        "details": "7th house and Venus placements predict enduring commitment, reciprocal loyalty, and auspicious matrimonial milestones."
      },
      {
        "id": "financial",
        "title": "Financial Harmony",
        "score": "72%",
        "iconType": "leaf",
        "description": "Complementary approach towards finances and material stability.",
        "details": "Balanced wealth accumulation, prudent expenditure management, and collaborative financial aspirations."
      },
      {
        "id": "physical",
        "title": "Physical Compatibility",
        "score": "80%",
        "iconType": "moon_crescent",
        "description": "Strong physical attraction and comfort with each other.",
        "details": "Yoni Koota affinity indicates strong magnetic attraction, reciprocal comfort, and vibrant intimacy."
      },
      {
        "id": "harmony",
        "title": "Long-term Harmony",
        "score": "84%",
        "iconType": "star_sparkle",
        "description": "Positive indications for a peaceful and fulfilling future together.",
        "details": "Jupiter and 9th house blessings bestow enduring grace, mutual growth, and profound lifelong fulfillment."
      }
    ],
    "ashtakootaGunas": [
      { "koota": "Varna", "maxPoints": 1, "obtained": 1, "description": "Spiritual compatibility" },
      { "koota": "Vashya", "maxPoints": 2, "obtained": 2, "description": "Mutual attraction and influence" },
      { "koota": "Tara", "maxPoints": 3, "obtained": 3, "description": "Destiny and health compatibility" },
      { "koota": "Yoni", "maxPoints": 4, "obtained": 3, "description": "Biological and physical compatibility" },
      { "koota": "Graha Maitri", "maxPoints": 5, "obtained": 4, "description": "Psychological rapport and planetary friendship" },
      { "koota": "Gana", "maxPoints": 6, "obtained": 5, "description": "Temperamental harmony" },
      { "koota": "Bhakoot", "maxPoints": 7, "obtained": 7, "description": "Emotional flow and wealth" },
      { "koota": "Nadi", "maxPoints": 8, "obtained": 8, "description": "Genetic compatibility and health of progeny" }
    ],
    "overallRecommendation": {
      "title": "Overall Recommendation",
      "verdict": "Highly Auspicious Match",
      "summary": "This union demonstrates great balance across emotional, spiritual, and physical domains with 28 out of 36 Gunas matched."
    }
  }
}
```

---

## 6. Daily Guidance & Panchang
Powers `DailyGuidanceScreen.jsx`.

### 6.1 Get Guidance by Timeframe
- **Method & Route**: `GET /guidance/forecast`
- **Query Params**: `?timeframe=Today` (`Today` | `Tomorrow` | `This Week` | `This Month`)
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "timeframe": "Today",
    "dateFormatted": "14 October 2026",
    "dayName": "Wednesday",
    "panchang": {
      "tithi": "Shukla Dashami",
      "nakshatra": "Shravana",
      "sunrise": "06:28 AM",
      "sunset": "06:14 PM",
      "rahuKaal": "12:21 PM – 01:52 PM",
      "abhijitMuhurat": "11:50 AM – 12:38 PM"
    },
    "overall": {
      "title": "Overall Guidance",
      "description": "A positive day for new beginnings. Stay focused and maintain balance in your actions."
    },
    "domains": {
      "career": {
        "title": "Career",
        "description": "New opportunities may arise. Be open to learning and showcase initiative."
      },
      "finance": {
        "title": "Finance",
        "description": "Good time to plan and save. Avoid unnecessary expenses during Rahu Kaal."
      },
      "relationships": {
        "title": "Relationships",
        "description": "Communicate openly and be patient with loved ones."
      },
      "health": {
        "title": "Health",
        "description": "Focus on healthy habits and maintain your hydration and vitality."
      }
    },
    "luckyElements": {
      "colorName": "Saffron",
      "colorHex": "#FF9900",
      "number": "5",
      "direction": "East",
      "gemstone": "Citrine"
    },
    "affirmation": {
      "title": "Today's Affirmation",
      "quote": "“I welcome positive energy and create a better day for myself.”"
    }
  }
}
```

---

## 7. Specialized Astrology Reports
Powers `ReportsScreen.jsx`.

### 7.1 Get Available Reports Catalog
- **Method & Route**: `GET /reports/catalog`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": "kundali",
        "title": "Full Kundali Report",
        "description": "Complete analysis of your birth chart with detailed insights.",
        "iconKey": "report_kundali",
        "isFree": true,
        "pdfAvailable": true
      },
      {
        "id": "career",
        "title": "Career Report",
        "description": "Opportunities, growth periods and guidance for your profession.",
        "iconKey": "report_career",
        "isFree": false,
        "price": 299,
        "currency": "INR"
      },
      {
        "id": "marriage",
        "title": "Marriage & Relationship Report",
        "description": "Compatibility, timing and guidance for a happy relationship.",
        "iconKey": "report_marriage",
        "isFree": false,
        "price": 399,
        "currency": "INR"
      },
      {
        "id": "finance",
        "title": "Finance Report",
        "description": "Wealth, financial stability and auspicious periods.",
        "iconKey": "report_finance",
        "isFree": false,
        "price": 299,
        "currency": "INR"
      },
      {
        "id": "health",
        "title": "Health Report",
        "description": "Insights on health, well-being and lifestyle guidance.",
        "iconKey": "report_health",
        "isFree": false,
        "price": 249,
        "currency": "INR"
      },
      {
        "id": "dasha",
        "title": "Dasha Report",
        "description": "Detailed analysis of your planetary periods and their effects.",
        "iconKey": "report_dasha",
        "isFree": false,
        "price": 299,
        "currency": "INR"
      }
    ]
  }
}
```

### 7.2 Request Report Generation (PDF / Full Analysis)
- **Method & Route**: `POST /reports/generate`
- **Request Body**:
```json
{
  "reportType": "career",
  "profileId": "prof_01",
  "format": "pdf"
}
```
- **Response (202 Accepted)**:
```json
{
  "success": true,
  "message": "Career report generation initiated",
  "data": {
    "reportJobId": "rep_job_99812",
    "status": "processing",
    "estimatedTimeSeconds": 8
  }
}
```

### 7.3 Check Report Status & Download URL
- **Method & Route**: `GET /reports/status/:reportJobId`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "reportJobId": "rep_job_99812",
    "status": "ready",
    "downloadUrl": "https://cdn.vidhilikhit.com/generated-reports/aarav_mehta_career_report.pdf",
    "generatedAt": "2026-11-03T16:15:00.000Z"
  }
}
```

---

## 8. Ask Vidhilikhit Bot (AI Vedic Consultation)
Powers `BotScreen.jsx`.

### 8.1 Get Active Chat Session History
- **Method & Route**: `GET /bot/chat/history`
- **Query Params**: `?profileId=prof_01`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "sessionId": "chat_ses_001",
    "messages": [
      {
        "id": "msg_01",
        "sender": "user",
        "text": "What does my birth chart say about my career?",
        "timestamp": "10:30 AM"
      },
      {
        "id": "msg_02",
        "sender": "bot",
        "text": "Your birth chart shows a strong inclination towards creative and analytical work. Jupiter's influence supports growth through knowledge, while Mercury indicates good communication skills. A career in design, technology or research can bring success.",
        "timestamp": "10:30 AM"
      },
      {
        "id": "msg_03",
        "sender": "user",
        "text": "When is a good time for marriage?",
        "timestamp": "10:31 AM"
      },
      {
        "id": "msg_04",
        "sender": "bot",
        "text": "Based on your current planetary transits, 2027–2028 shows favorable indications for marriage. It is always best to consider a detailed analysis with your full kundali.",
        "timestamp": "10:31 AM"
      }
    ]
  }
}
```

### 8.2 Send Message to Vidhilikhit Bot
- **Method & Route**: `POST /bot/chat/send`
- **Description**: Uses Vedic astrological calculation engine + AI to deliver personalized responses based on user's active birth chart, Mahadasha, and current planetary transits.
- **Request Body**:
```json
{
  "sessionId": "chat_ses_001",
  "profileId": "prof_01",
  "message": "Which gemstone should I wear for focus and career growth?"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "message": {
      "id": "msg_05",
      "sender": "bot",
      "text": "With Mercury ruling your 2nd and 5th houses and positioned in Aquarius, wearing an Emerald (Panna) or Green Tourmaline in silver on a Wednesday morning can enhance your concentration and speech clarity. Please ensure your Mercury is well-aspected before wearing.",
      "timestamp": "10:33 AM"
    },
    "suggestedFollowUps": [
      "What are the benefits of Emerald?",
      "Are there any rituals before wearing it?",
      "What about Yellow Sapphire?"
    ]
  }
}
```

---

## 9. Utility APIs (Location Autocomplete & Timezone Lookup)
Powers `VedicLocationPickerModal.jsx` and onboarding location search.

### 9.1 Location Search Autocomplete
- **Method & Route**: `GET /locations/autocomplete`
- **Query Params**: `?query=Mum`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "predictions": [
      {
        "placeId": "loc_01",
        "mainText": "Mumbai",
        "secondaryText": "Maharashtra, India",
        "formattedAddress": "Mumbai, Maharashtra, India",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "timeZone": "Asia/Kolkata",
        "gmtOffset": "+05:30"
      },
      {
        "placeId": "loc_02",
        "mainText": "Pune",
        "secondaryText": "Maharashtra, India",
        "formattedAddress": "Pune, Maharashtra, India",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "timeZone": "Asia/Kolkata",
        "gmtOffset": "+05:30"
      }
    ]
  }
}
```
