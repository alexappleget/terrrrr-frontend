import { Button } from "@/components/button/button";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { updateWorldDetails } from "@/functions/functions";
import type { IAdminData } from "@/types/interface";
import { useEffect, useState } from "react";

export const WorldDetailsCard = ({
  data,
  id,
  userRole,
}: {
  data: IAdminData;
  id: string;
  userRole: string;
}) => {
  const [worldDetails, setWorldDetails] = useState({
    worldName: "",
    joinCode: "",
    worldDescription: "",
  });
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorldDetails({
      ...worldDetails,
      [event.target.name]: event.target.value,
    });
  };

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

  return (
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
              readOnly={userRole !== "OWNER"}
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
              readOnly={userRole !== "OWNER"}
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
            readOnly={userRole !== "OWNER"}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {userRole === "OWNER" && (
          <Button
            type="button"
            className="bg-yellow-700 text-yellow-100 border-yellow-400 shadow hover:bg-yellow-600 hover:text-yellow-50"
            onClick={handleWorldUpdate}
          >
            Save Changes
          </Button>
        )}
        {success && (
          <span className="text-xs text-green-400 mt-4">{success}</span>
        )}
        {error && <span className="text-xs text-red-400 mt-4">{error}</span>}
      </CardFooter>
    </Card>
  );
};
