import { cn } from "@/lib/utils";

interface AvatarInitialsProps {
  name: string;
  className?: string;
}

export function AvatarInitials({ name, className }: AvatarInitialsProps) {
  const getInitials = (name: string) => {
    // Extract email username part
    const username = name.split('@')[0];
    // Get first two characters, uppercase them
    return username.slice(0, 2).toUpperCase();
  };

  // Generate a consistent color based on the name
  const getColor = (name: string) => {
    const colors = [
      "bg-blue-500/20 text-blue-500",
      "bg-green-500/20 text-green-500",
      "bg-purple-500/20 text-purple-500",
      "bg-orange-500/20 text-orange-500",
      "bg-pink-500/20 text-pink-500",
      "bg-indigo-500/20 text-indigo-500"
    ];
    
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className={cn(
      "flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm",
      getColor(name),
      className
    )}>
      {getInitials(name)}
    </div>
  );
}