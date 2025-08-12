import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import type { IWorldCardProps } from "@/types/interface";

export const WorldCard = ({
  id,
  name,
  description,
  role,
  members,
}: IWorldCardProps) => {
  const getRoleStyles = (role: string) => {
    const roleStyle = role.toLowerCase();

    switch (roleStyle) {
      case "owner":
        return {
          text: "text-yellow-400",
          bg: "bg-yellow-900/40 border border-yellow-500/30",
        };
      case "admin":
        return {
          text: "text-gray-300",
          bg: "bg-gray-700/40 border border-gray-400/30",
        };
      case "sub_admin":
        return {
          text: "text-amber-600",
          bg: "bg-amber-900/40 border border-amber-600/30",
        };
      case "member":
      default:
        return {
          text: "text-purple-300",
          bg: "bg-purple-900/40 border border-purple-500/30",
        };
    }
  };

  const roleStyles = getRoleStyles(role);

  return (
    <Link to={`/world/${id}/bosses`}>
      <Card className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 border-2 border-purple-600/50 hover:border-purple-400/80 hover:shadow-lg hover:shadow-purple-500/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="mb-2 text-xl text-purple-100 drop-shadow-lg">
            {name}
          </CardTitle>
          <CardDescription className="text-purple-300">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-1 text-green-400 bg-green-900/30 rounded-full border border-green-500/30">
              {members} Players
            </span>
            <span
              className={`px-2 py-1 rounded-full ${roleStyles.text} ${roleStyles.bg}`}
            >
              {role}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
