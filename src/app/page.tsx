import React from 'react';
import { ClerkProvider, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Page: React.FC = () => {
  return (
    <ClerkProvider>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignInButton />
          <UserButton />
        </SignedIn>
        <h1>Welcome to Coach Finder</h1>
        <p>Find the best coach for your needs.</p>
        <button>Get Started</button>
      </div>
    </ClerkProvider>
  );
};

export default Page;