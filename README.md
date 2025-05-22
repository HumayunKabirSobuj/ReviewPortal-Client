# Product Review Portal

A comprehensive platform that allows users to create accounts, share product reviews with ratings, categorize reviews, and interact with posts through voting and commenting. The portal includes premium content features, admin moderation, and a payment system.

## Live Link:
```
https://review-portal-b4-02.vercel.app
```

## 🌟 Features

### User Management

- **User Registration & Authentication**: Secure signup/login with JWT authentication
- **User Profiles**: View and manage personal information and review history
- **Role-based Access Control**: Different permissions for regular users and administrators

### Review System

- **Create & Manage Reviews**: Users can create, edit, and delete their own reviews
- **Rating System**: 1-5 star rating for products
- **Categorization**: Organize reviews by product categories
- **Media Support**: Upload images with reviews
- **Purchase Source**: Add optional links to where products were purchased

### Premium Content

- **Premium Reviews**: Special high-quality reviews available for purchase
- **Preview System**: Users can see a preview before purchasing
- **One-time Payment**: Pay once to unlock full premium content
- **Payment History**: Track all purchases in user profile

### Interaction

- **Voting System**: Upvote/downvote reviews
- **Comment System**: Discuss reviews with other users
- **Reply Functionality**: Respond to specific comments

### Admin Features

- **Review Moderation**: Approve or unpublish user reviews
- **Content Management**: Monitor and moderate all portal content
- **Premium Content Management**: Set prices and manage premium reviews
- **Analytics Dashboard**: Track payments and popular content

### Search & Discovery

- **Advanced Filtering**: Find reviews by category, rating, date, or popularity
- **Search Functionality**: Keyword search across all reviews
- **Related Reviews**: Discover similar products in the same category

## 🛠️ Technology Stack

- **Frontend**: React.js with Next.js framework
- **UI Components**: Tailwind CSS with shadcn/ui
- **Backend**: Next.js API routes with Server Actions
- **Database**: SQL database (via Prisma ORM)
- **Authentication**: NextAuth.js for secure user management
- **Payment Processing**: Stripe integration
- **Image Storage**: Vercel Blob for media uploads
- **Deployment**: Vercel platform

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Database (PostgreSQL recommended)
- Stripe account (for payment processing)

## 🚀 Getting Started

### Installation

1. Clone the repository:

` git clone https://github.com/HumayunKabirSobuj/ReviewPortal-Client.git`

2. cd ReviewHub-Client

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   

```
NEXT_PUBLIC_BASE_API=Your Api Key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=Your cloud name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your cloudinary api key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your cloudinary api secret
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your cloudinary preset

```


5. Run The Project
```
npm run dev
```