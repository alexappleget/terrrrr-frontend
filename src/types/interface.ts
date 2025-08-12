import type { ReactNode } from "react";

export interface IAuthContext {
  isAuthenticated: boolean | null;
  signUp: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  user: IUser | null;
}

export interface IBoss {
  id: string;
  name: string;
  health: string;
  stage: string;
  worldProgress: {
    id: string;
    bossId: string;
    worldId: string;
    killed: boolean;
  };
}

export interface IEvent {
  id: string;
  name: string;
  description: string;
  scheduledAt: string;
  worldId: string;
  createdById: string;
  RSVPs: IEventRSVP[];
}

export interface IEventRSVP {
  id: string;
  userId: string;
  eventId: string;
  user: {
    username: string;
  };
}

export interface INote {
  id: string;
  title: string;
  content: string;
  authorId: string;
  worldId: string;
  createdAt: string;
  author: {
    username: string;
  };
}

export interface IRoutes {
  isAuthenticated: boolean | null;
  children: ReactNode;
}

export interface IUser {
  id: string;
  username: string;
}

export interface IUserWorlds {
  id: string;
  role: string;
  userId: string;
  worldId: string;
  world: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    _count: {
      memberships: number;
    };
  };
}

export interface IWorldCardProps {
  id: string;
  name: string;
  description: string;
  role: string;
  members: number;
}

export interface IWorldCode {
  id: string;
  code: string;
  worldId: string;
  createdAt: string;
}

export interface IWorldMembers {
  id: string;
  role: string;
  userId: string;
  worldId: string;
  user: {
    username: string;
  };
}
