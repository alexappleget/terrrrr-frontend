import { Badge } from "@/components/badge";
import { Button } from "@/components/button/button";
import { Card, CardContent } from "@/components/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { ScrollArea } from "@/components/scroll-area";
import { roles } from "@/constants/roles";
import { updateMemberRole } from "@/functions/functions";
import type { IAdminData } from "@/types/interface";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export const MemberManagementCard = ({
  data,
  fetchAdminData,
  userRole,
}: {
  data: IAdminData;
  fetchAdminData: () => void;
  userRole: string;
}) => {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

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

  return (
    <Card className="bg-gradient-to-br from-[#472d67] via-[#3d2759] to-[#2b193d] border-2 border-purple-700/60 shadow-lg shadow-purple-900/20">
      <CardContent>
        <h3 className="text-lg text-purple-100 mb-2">Member Management</h3>
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
                  {userRole === "OWNER" && (
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
