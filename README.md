# Farmer-Authority Communication Platform

A modern React frontend for agricultural communication between farmers and authorities, featuring IoT monitoring, advisory systems, and real-time notifications.

## 🚀 Features

### Frontend-Only Architecture
- **Pure React + TailwindCSS** - No backend dependencies
- **Placeholder API endpoints** - Ready for backend integration
- **Mock data integration** - Fully functional with sample data
- **MongoDB-ready** - Structured for easy Cursor/MongoDB backend connection

### Core Functionality
- **Authority Dashboard**: Create and send advisories, alerts, and reports
- **Farmer Dashboard**: View IoT sensor data, receive advisories, and communicate
- **IoT Monitoring**: Live-updating charts for soil moisture, temperature, and humidity
- **Communication System**: Two-way messaging between farmers and authorities
- **Multilingual Support**: Kannada, Hindi, and English language switching
- **Responsive Design**: Mobile-first, rural-friendly interface

### Technical Features
- **Real-time Updates**: Auto-refreshing sensor data every 30 seconds
- **Role-based UI**: Separate interfaces for farmers and authorities
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Lazy loading, optimized bundles, and efficient rendering

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS + Custom Design System
- **Charts**: Recharts for IoT data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **UI Components**: Custom component library with shadcn/ui base

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── AuthorityDashboard.tsx
│   ├── FarmerDashboard.tsx
│   ├── IoTDashboard.tsx
│   ├── HeroSection.tsx
│   └── LanguageSwitcher.tsx
├── contexts/
│   └── LanguageContext.tsx
├── lib/
│   ├── api.ts           # Placeholder API endpoints & mock data
│   └── utils.ts
├── pages/
│   ├── Index.tsx        # Landing page
│   └── NotFound.tsx
└── App.tsx
```

## 🔌 API Integration Ready

The project uses a centralized API configuration (`src/lib/api.ts`) with placeholder endpoints:

```typescript
// Example endpoints ready for backend connection
const ENDPOINTS = {
  IOT_CURRENT: '/api/iot/current',
  SEND_ADVISORY: '/api/advisories/send',
  GET_MESSAGES: '/api/messages',
  // ... more endpoints
}
```

### Mock Data Available
- IoT sensor readings with realistic variations
- Sample advisories and alerts
- Farmer statistics and messaging data
- All data types match expected backend schemas

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔗 Backend Integration

This frontend is designed for easy integration with:

### Recommended Backend Setup
- **Database**: MongoDB for flexible document storage
- **API**: RESTful endpoints or GraphQL
- **Authentication**: JWT-based auth system
- **SMS Integration**: Twilio or similar service
- **File Upload**: Cloud storage for report attachments

### Integration Steps
1. Replace `apiService` functions in `src/lib/api.ts`
2. Update API endpoints in `API_CONFIG`
3. Implement authentication flow
4. Connect real database schemas
5. Add SMS notification service

## 📱 Features Overview

### Authority Dashboard
- Send advisories to all farmers or specific groups
- Upload reports with file attachments
- View farmer statistics and engagement metrics
- Emergency alert broadcasting
- Message management system

### Farmer Dashboard
- Real-time IoT sensor monitoring
- Receive and view government advisories
- Two-way communication with authorities
- Weather alerts and notifications
- Profile and farm management

### IoT Integration
- Live sensor data updates (30-second intervals)
- Historical trend analysis
- Status indicators and alerts
- Connection monitoring
- Customizable thresholds

## 📄 Lovable Project Info

**URL**: https://lovable.dev/projects/ce08d970-2330-4e09-8fa5-78419be567a3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ce08d970-2330-4e09-8fa5-78419be567a3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Recharts (for IoT data visualization)
- Lucide React (for icons)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ce08d970-2330-4e09-8fa5-78419be567a3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
