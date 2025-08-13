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
import { getAdminData, updateMemberRole } from "@/functions/functions";
import type { IAdminData } from "@/types/interface";
import { ChevronsUpDown, Pickaxe } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Admin = () => {
  const { id } = useParams();
  const [data, setData] = useState<IAdminData | null>(null);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const fetchAdminData = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await getAdminData({ id });

    const { adminData } = await response.json();
    setData(adminData);
  }, [id]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

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
    });
    setOpenPopoverId(null);
    fetchAdminData();
  };

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      <h2 className="text-3xl mt-12 text-purple-700 drop-shadow-lg">
        Admin Settings
      </h2>
      <div className="mt-4 w-full flex-grow grid lg:grid-cols-2">
        <div className="border-2 border-black">
          <Card>
            <CardContent>
              <h3 className="text-lg">Member Management</h3>
              <ScrollArea className="h-60 py-2">
                <div className="space-y-4">
                  {data.memberships.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between border-2 rounded-lg px-2 py-2"
                    >
                      <span className="text-sm">{member.user.username}</span>
                      <div className="space-x-2">
                        <Badge>{member.role}</Badge>
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
        <div className="space-y-4">
          <Card>
            <CardContent>
              <h3 className="text-lg">World Details</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="worldName" className="mt-4">
                    Name
                  </Label>
                  <Input
                    id="worldName"
                    type="text"
                    value={data.name}
                    name="worldName"
                    className="bg-purple-800/20 border-2 border-purple-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinCode" className="mt-4">
                    Join Code
                  </Label>
                  <Input
                    id="joinCode"
                    type="text"
                    value={data.joinCode.code}
                    name="joinCode"
                    className="bg-purple-800/20 border-2 border-purple-700"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label>World Description</Label>
                <Textarea
                  id="worldDescription"
                  value={data.description}
                  name="worldDescription"
                  className="bg-purple-800/20 border-2 border-purple-700"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button">Save Changes</Button>
            </CardFooter>
          </Card>
          <div className="border-2 border-black">box 3</div>
        </div>
      </div>
    </div>
  );
};
