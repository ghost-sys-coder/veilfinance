import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center px-4 flex-col min-h-[100vh] text-center">
      <h1 className="text-6xl gradient-title font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! the page you are looking for doesn't not exist or it has been
      </p>
      <Button>
        <Link href={"/"}>Return to the Home page</Link>
      </Button>
    </div>
  );
};

export default NotFound;
