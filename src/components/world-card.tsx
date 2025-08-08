import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import type { IWorldCardProps } from "@/types/interface";

export const WorldCard = ({ id, name, description, role }: IWorldCardProps) => {
  return (
    <Link to={`/world/${id}/bosses`}>
      <Card>
        <CardHeader className="text-center pb-4">
          <CardTitle className="mb-2">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs">
            <span>4 Players</span>
            <span>{role}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
