import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";

type HorizontalCardProps = {
  title: string;
  description: string;
  link: string;
};

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="flex-col items-center shadow-md rounded-md transition-transform transform hover:-translate-y-0.5 duration-200">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-base font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="ml-4">
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardContent>
      </Card>
    </a>
  );
};

export default HorizontalCard;
