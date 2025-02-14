import { ClerkProvider, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { db } from '../../lib/db';
import GetStarted from './components/client/GetStarted';

const HomePage = async () => {
  
  return (
    <ClerkProvider>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
          <UserButton />
        </SignedIn>
        <h1>Welcome to Coach Finder</h1>
        <p>Find the best coach for your needs.</p>
        <GetStarted />        
      </div>
    </ClerkProvider>
  );
};

export default HomePage;