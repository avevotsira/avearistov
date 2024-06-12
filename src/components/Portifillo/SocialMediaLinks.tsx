import type React from "react";
import { Button } from "../ui/button";

const links = [
  { href: "mailto:chantepkik@gmail.com", label: "Email" },
  { href: "https://www.facebook.com/Jakcrovat.Micasa/", label: "Facebook" },
  { href: "https://github.com/avevotsira", label: "GitHub" },
  { href: "https://discordapp.com/users/287134296811110402", label: "Discord" },
];

const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex flex-wrap space-x-4">
      {links.map((link) => (
        <Button asChild className="mb-4" key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
