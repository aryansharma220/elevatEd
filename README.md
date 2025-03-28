# ElevatEd - AI-Powered Learning Platform

ElevatEd is an advanced learning platform that leverages Google Gemini's AI capabilities to create personalized, interactive learning experiences. The platform adapts to each user's unique learning style, pace, and knowledge level to deliver optimized educational content.

![ElevatEd Logo](public/ElevatEd-logo.png)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

ElevatEd revolutionizes online learning by using AI to generate comprehensive courses on any topic. The platform creates dynamic, adaptive learning paths that respond to user interactions and adjust content difficulty based on performance. From beginners to advanced learners, ElevatEd provides tailored educational experiences with interactive assessments, multimedia content, and real-time feedback.

## Key Features

### AI-Powered Course Creation
- Generate comprehensive courses on any topic with advanced AI
- Structured content organization optimized for learning progression
- Automatic creation of sections, modules, and lessons

### Personalized Learning
- Adaptive learning paths that adjust to your progress and knowledge level
- Custom-tailored content difficulty and pacing
- Knowledge gap identification and targeted recommendations

### Interactive Teaching Mode
- AI instructors that adapt to questions in real-time
- Personalized explanations with text, visuals, and diagrams
- Contextual responses based on learning history

### Multimodal Content
- Rich learning materials including text, images, and diagrams
- Code snippets and executable examples for technical topics
- Visual explanations of complex concepts

### Interactive Assessments
- AI-generated quizzes, exercises, and coding challenges
- Immediate, personalized feedback on submissions
- Spaced repetition to reinforce learning

### Progress Tracking
- Comprehensive analytics and performance metrics
- Visual progress tracking and skill development charts
- Identification of strengths and areas for improvement

### Export & Integration
- Download courses as PDFs, HTML pages, or SCORM modules
- Integration with popular learning management systems (LMS)
- API access for enterprise integrations

### Community Features
- Discussion forums for collaborative learning
- Knowledge sharing and peer support
- Expert contributions and moderator oversight

## Technology Stack

ElevatEd is built using modern web technologies:

- **Frontend Framework**: Next.js 15.1.0 (React 19)
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Theme Management**: next-themes (dark/light mode support)
- **AI Integration**: Google Gemini API
- **State Management**: React Hooks
- **Forms**: React Hook Form
- **Data Visualization**: Recharts
- **Notifications**: Toast components and Sonner

## Project Structure

The project follows a standard Next.js structure with:

```
gdg_prototype_v2/
├── app/                 # Next.js App Router
│   ├── components/      # App-specific components
│   ├── about/           # About page
│   ├── community/       # Community page
│   ├── course/          # Course viewing
│   ├── dashboard/       # User dashboard
│   ├── explore/         # Course exploration
│   ├── features/        # Features showcase
│   ├── pricing/         # Pricing plans
│   └── globals.css      # Global styles
├── components/          # Shared components
│   ├── course-generator-form.tsx # Course creation form
│   ├── course-list.tsx  # Course listings
│   └── ui/              # UI component library
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
├── public/              # Static assets
└── styles/              # Additional styling
    └── globals.css      # Global CSS variables
```

## Components

### UI Components

The platform includes a comprehensive UI component library in the `components/ui/` directory:

- **Navigation**: Navbar, Sidebar, Breadcrumb, Navigation Menu
- **Layout**: Card, Dialog, Sheet, Separator
- **Forms**: Button, Input, Select, Checkbox, Radio, Switch, Textarea
- **Feedback**: Toast, Alert
- **Data Display**: Avatar, Badge, Table, Tabs
- **Visualization**: Chart, Progress
- **Utility**: Accordion, Collapsible, Dropdown, Tooltip

### Feature Components

- **CourseGeneratorForm**: Interactive form for creating new AI-generated courses
- **CourseList**: Display and management of created courses
- **ThreadComponent**: Community discussions and forum threads
- **Footer**: Site-wide footer with navigation and information
- **Navbar**: Main navigation with responsive design

## Pages

### Landing Page (`app/page.tsx`)
- Hero section showcasing the platform's capabilities
- Feature highlights with interactive previews
- How it works demonstration
- Testimonials from users
- Call-to-action sections

### Features Page (`app/features/page.tsx`)
- Detailed breakdown of all platform features
- Interactive demonstrations of AI capabilities
- Technical specifications and integrations
- Use case examples

### Pricing Page (`app/pricing/page.tsx`)
- Tiered pricing plans (Free, Pro, Enterprise)
- Features comparison
- FAQ section
- Enterprise contact options

### Community Page (`app/community/page.tsx`)
- Discussion forums and threads
- User profiles and contributions
- Topic categorization
- Search and filtering

### Course Page (`app/course/[id]/page.tsx`)
- Interactive course viewer
- AI-assisted learning interface
- Progress tracking
- Content navigation

### Dashboard (`app/dashboard/page.tsx`)
- User course library
- Progress statistics
- Recommended content
- Account management

### Explore Page (`app/explore/page.tsx`)
- Course discovery interface
- Filtering by category, level, and topics
- Search functionality
- Trending and popular courses

### About Page (`app/about/page.tsx`)
- Company mission and vision
- Team information
- Technology overview
- Partnership details

## Installation and Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ElevatEd.git
   cd ElevatEd
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Access the application at http://localhost:3000

## Usage

### Creating a Course

1. Navigate to the Dashboard and click "Create New Course"
2. Enter a topic, desired learning level, and any specific requirements
3. The AI will generate a comprehensive course structure
4. Review and customize the generated content
5. Save and begin learning

### Learning with AI

1. Open a course from your dashboard
2. Navigate through modules at your own pace
3. Ask questions by typing in the chat interface
4. Complete interactive assessments to test understanding
5. Track your progress in the analytics section

### Community Interaction

1. Join discussions related to your courses
2. Ask questions or provide answers to the community
3. Share resources and insights
4. Connect with other learners and experts

## Contributing

We welcome contributions to ElevatEd! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
