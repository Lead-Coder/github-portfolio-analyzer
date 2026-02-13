
import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { Button } from '../components/ui/Button';
import BackgroundBlobs from '../components/BackgroundBlobs';

const NotFoundPage = () => {
  return (
    <PageWrapper className="flex items-center justify-center text-center p-4">
      <BackgroundBlobs />
      <div className="z-10">
        <h1 className="text-9xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">404</h1>
        <h2 className="mt-2 text-2xl font-bold">Page Not Found</h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="mt-8">Go back home</Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
