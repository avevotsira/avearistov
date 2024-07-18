// SocialMediaLinks.tsx
import type React from "react";
import { Button } from "../ui/button";
import { DiscordLogo, EmailLogo, FacebookLogo, GithubLogo } from "./Logo/Logo";

const links = [
  { href: "mailto:chantepkik@gmail.com", label: "Email", icon: <EmailLogo /> },
  {
    href: "https://www.facebook.com/Jakcrovat.Micasa/",
    label: "Facebook",
    icon: <FacebookLogo />,
  },
  {
    href: "https://github.com/avevotsira",
    label: "GitHub",
    icon: <GithubLogo />,
  },
  {
    href: "https://discordapp.com/users/287134296811110402",
    label: "Discord",
    icon: <DiscordLogo />,
  },
];

const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-start">
        {links.map((link) => (
          <Button asChild className="mx-2 mb-4" key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1"
            >
              {link.icon && (
                <span className="icon w-5 h-5 flex items-center neon-pulse-slow-text">
                  {link.icon}
                </span>
              )}
              <span className="flex items-center">{link.label}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
