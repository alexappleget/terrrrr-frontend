import { Button } from "@/components/button/button";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { getAdminData } from "@/functions/functions";
import type { IAdminData } from "@/types/interface";
import { Pickaxe } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Admin = () => {
  const { id } = useParams();
  const [data, setData] = useState<IAdminData | null>(null);

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

  console.log(data);

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-16 lg:px-32 xl:px-52">
      <h2 className="text-3xl mt-12 text-purple-700 drop-shadow-lg">
        Admin Settings
      </h2>
      <div className="mt-4 w-full flex-grow grid lg:grid-cols-2">
        <div className="border-2 border-black">box 1</div>
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
                  <Label htmlFor="worldName" className="mt-4">
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
