# Coach Finder

A platform where powerlifters can find and connect with experienced coaches.

## Features

- 🔍 Search and filter coaches by specialty, experience, price range, and location
- 👤 Detailed coach profiles with certifications, coaching style, and testimonials
- 💬 Real-time messaging system for communication
- 🔐 Secure authentication with Google
- 📱 Responsive design for all devices

## Tech Stack

- Frontend: Next.js 14, React, TailwindCSS, shadcn/ui, Framer Motion
- Backend: Next.js API Routes, Prisma ORM
- Database: PostgreSQL
- Authentication: NextAuth.js with Google provider

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/coach-finder.git
   cd coach-finder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in the following variables:

   - `DATABASE_URL`: Your PostgreSQL database URL
   - `NEXTAUTH_URL`: Your application URL (e.g., http://localhost:3000)
   - `NEXTAUTH_SECRET`: A random string for session encryption
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials
5. Create an OAuth 2.0 Client ID
6. Add your application's domain to the authorized domains
7. Add your callback URL: `http://localhost:3000/api/auth/callback/google`
8. Copy the client ID and client secret to your `.env` file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
