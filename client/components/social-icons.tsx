import { Twitter, Instagram, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function SocialIcons() {
  const socialLinks = [
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: "https://twitter.com",
      label: "Twitter"
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      href: "https://instagram.com",
      label: "Instagram"
    },
    { 
      icon: <Github className="h-5 w-5" />, 
      href: "https://github.com",
      label: "Github"
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "https://linkedin.com",
      label: "LinkedIn"
    }
  ];

  return (
    <div className="flex space-x-6">
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label={link.label}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}