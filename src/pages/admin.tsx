import { Badge } from "@/components/badge";
import { Button } from "@/components/button/button";
import { Card, CardContent, CardFooter } from "@/components/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/command";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { ScrollArea } from "@/components/scroll-area";
import { Textarea } from "@/components/textarea";
import {
  getAdminData,
  updateMemberRole,
  updateWorldDetails,
} from "@/functions/functions";
import type { IAdminData, IMembership, IUserWorlds } from "@/types/interface";
import { ChevronsUpDown, Pickaxe } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export const Admin = () => {
  const { id } = useParams();
  const world = useOutletContext<IUserWorlds | undefined>();
  const userRole = world?.role ?? "";
  const [data, setData] = useState<IAdminData | null>(null);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [worldDetails, setWorldDetails] = useState({
    worldName: "",
    joinCode: "",
    worldDescription: "",
  });
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchAdminData = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await getAdminData({ id, userRole });

    const { adminData } = await response.json();

    adminData.memberships = adminData.memberships.sort(
      (a: IMembership, b: IMembership) =>
        a.user.username.localeCompare(b.user.username, undefined, {
          sensitivity: "base",
        })
    );

    setData(adminData);
  }, [id, userRole]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  useEffect(() => {
    if (data) {
      setWorldDetails({
        worldName: data.name || "",
        joinCode: data.joinCode.code || "",
        worldDescription: data.description || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleWorldUpdate = async () => {
    if (!id) {
      throw new Error("World ID not found");
    }

    const response = await updateWorldDetails({
      id,
      name: worldDetails.worldName,
      description: worldDetails.worldDescription,
      code: worldDetails.joinCode,
      userRole,
    });

    if (response.ok) {
      setSuccess("World details updated successfully");
    } else {
      setError("Update failed. Please try again with a different value.");
    }
  };

  if (!data) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="flex gap-2 items-center text-purple-700">
          <Pickaxe className="animate-bounce" />
          <span className="text-sm">Gathering resources...</span>
        </div>
      </div>
    );
  }

  const roles = [
    {
      value: "OWNER",
      label: "Owner",
    },
    {
      value: "ADMIN",
      label: "Admin",
    },
    {
      value: "SUB_ADMIN",
      label: "Sub-Admin",
    },
    {
      value: "MEMBER",
      label: "Member",
    },
  ];

  const handleRoleChange = async ({
    id,
    role,
    userId,
  }: {
    id: string;
    role: string;
    userId: string;
  }) => {
    await updateMemberRole({
      id,
      role,
      userId,
      userRole,
    });
    setOpenPopoverId(null);
    fetchAdminData();
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorldDetails({
      ...worldDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      <h2 className="text-3xl mt-12 text-purple-700 drop-shadow-lg">
        Admin Settings
      </h2>
      <div className="mt-4 w-full flex-grow grid lg:grid-cols-2">
        <div className="p-2">
          <Card className="bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] border-2 border-purple-700/60 shadow-lg shadow-purple-900/20">
            <CardContent>
              <h3 className="text-lg text-purple-100 mb-2">
                Member Management
              </h3>
              <ScrollArea className="h-72 py-2">
                <div className="space-y-4">
                  {data.memberships.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between border-2 border-purple-700/40 rounded-lg px-3 py-2 bg-purple-200/30"
                    >
                      <span className="text-sm text-purple-100">
                        {member.user.username}
                      </span>
                      <div className="space-x-2">
                        <Badge
                          className={`px-2 py-1 ${
                            member.role === "OWNER"
                              ? "bg-yellow-700 text-yellow-100 border-yellow-400"
                              : member.role === "ADMIN"
                              ? "bg-blue-700 text-blue-100 border-blue-400"
                              : member.role === "SUB_ADMIN"
                              ? "bg-green-700 text-green-100 border-green-400"
                              : "bg-purple-700 text-purple-100 border-purple-400"
                          }`}
                        >
                          {member.role}
                        </Badge>
                        <Popover
                          open={openPopoverId === member.id}
                          onOpenChange={(isOpen) =>
                            setOpenPopoverId(isOpen ? member.id : null)
                          }
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPopoverId === member.id}
                              className="text-xs"
                            >
                              Change...
                              <ChevronsUpDown />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {roles.map((role) => (
                                    <CommandItem
                                      key={role.value}
                                      value={role.value}
                                      onSelect={() =>
                                        handleRoleChange({
                                          id: member.worldId,
                                          role: role.value,
                                          userId: member.userId,
                                        })
                                      }
                                    >
                                      {role.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 p-2">
          <Card className="bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] border-2 border-purple-700/60 shadow-lg shadow-purple-900/20">
            <CardContent>
              <h3 className="text-lg text-purple-100">World Details</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="worldName" className="mt-4 text-purple-200">
                    Name
                  </Label>
                  <Input
                    id="worldName"
                    name="worldName"
                    type="text"
                    value={worldDetails.worldName}
                    onChange={handleInputChange}
                    className="bg-purple-900/40 border-2 border-purple-700 text-purple-100 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinCode" className="mt-4 text-purple-200">
                    Join Code
                  </Label>
                  <Input
                    id="joinCode"
                    name="joinCode"
                    type="text"
                    value={worldDetails.joinCode}
                    onChange={handleInputChange}
                    className="bg-purple-900/40 border-2 border-purple-700 text-purple-100 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label className="text-purple-200">World Description</Label>
                <Textarea
                  id="worldDescription"
                  name="worldDescription"
                  value={worldDetails.worldDescription}
                  onChange={handleInputChange}
                  className="bg-purple-900/40 border-2 border-purple-700 text-purple-100 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <Button
                type="button"
                className="bg-yellow-700 text-yellow-100 border-yellow-400 shadow hover:bg-yellow-600 hover:text-yellow-50"
                onClick={handleWorldUpdate}
              >
                Save Changes
              </Button>
              {success && (
                <span className="text-xs text-green-400 mt-4">{success}</span>
              )}
              {error && (
                <span className="text-xs text-red-400 mt-4">{error}</span>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
