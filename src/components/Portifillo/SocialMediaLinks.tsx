import React from "react";
import { Button } from "../ui/button";

const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <Button asChild className="mb-4">
        <a href="mailto:your-email@example.com">Email</a>
      </Button>
      <Button asChild className="mb-4">
        <a href="https://www.linkedin.com/in/your-profile">LinkedIn</a>
      </Button>
      <Button asChild className="mb-4">
        <a href="https://github.com/your-username">GitHub</a>
      </Button>
    </div>
  );
};

export default SocialMediaLinks;
