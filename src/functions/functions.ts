import { BACKEND_URL } from "@/lib/utils";

export const getAdminData = async ({ id }: { id: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/world/adminData/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export const getBosses = async ({ id }: { id: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/boss/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export const createEvent = async ({
  id,
  name,
  description,
  scheduledAt,
}: {
  id: string;
  name: string;
  description: string;
  scheduledAt: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/event/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      description,
      scheduledAt: new Date(scheduledAt).toISOString(),
    }),
  });

  return response;
};

export const getEvents = async ({ id }: { id: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/event/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export const createNote = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/note/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, content }),
  });

  return response;
};

export const getNotes = async ({ id }: { id: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/note/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export const getUserWorlds = async () => {
  const response = await fetch(`${BACKEND_URL}/api/world`, {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export const createWorld = async ({
  worldName,
  description,
}: {
  worldName: string;
  description: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/world/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name: worldName, description }),
  });

  return response;
};

export const getWorldMembership = async ({ id }: { id: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/membership/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export const joinWorld = async ({ joinCode }: { joinCode: string }) => {
  const response = await fetch(`${BACKEND_URL}/api/world/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code: joinCode }),
  });

  return response;
};

export const updateMemberRole = async ({
  id,
  role,
  userId,
}: {
  id: string;
  role: string;
  userId: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/membership/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ role, userId }),
  });

  return response;
};
