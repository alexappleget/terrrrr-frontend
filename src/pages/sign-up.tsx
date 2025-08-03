import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Eye, EyeOff, Pickaxe } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { signUp } = useAuthContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formState.password.length < 6) {
      setError("Password must be at least 6 characters long");
    }

    setIsLoading(true);

    try {
      await signUp({
        username: formState.username,
        password: formState.password,
      });
      navigate("/dashboard");
    } catch (error) {
      setError("We had trouble creating the account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[url('/login-background.png')] bg-cover">
      <Card className="w-full max-w-md shadow-2xl bg-[url('/terraria-dirt-block.png')] bg-cover font-['Press_Start_2P']">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-600 rounded-full shadow-lg">
              <Pickaxe className="w-8 h-8 text-yellow-100" />
            </div>
          </div>
          <CardTitle className="text-yellow-100 text-2xl mb-2">
            CREATE CHARACTER
          </CardTitle>
          <p className="text-yellow-200/80 text-sm">Join the adventure today</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-yellow-100 text-xs flex items-center gap-2"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={formState.username}
                name="username"
                onChange={handleChange}
                className="bg-stone-800/80 border-amber-600 text-yellow-100 focus:border-amber-400 focus:ring-amber-400/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-yellow-100 text-xs">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formState.password}
                  name="password"
                  onChange={handleChange}
                  className="bg-stone-800/80 border-amber-600 text-yellow-100 focus:border-amber-400 focus:ring-amber-400/50 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-yellow-200 hover:text-yellow-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-yellow-100 text-xs"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formState.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  className="bg-stone-800/80 border-amber-600 text-yellow-100 focus:border-amber-400 focus:ring-amber-400/50 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-yellow-200 hover:text-yellow-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-yellow-100 py-3 shadow-lg border-2 border-amber-500 hover:border-amber-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-100/30 border-t-yellow-100 rounded-full animate-spin" />
                  CREATING CHARACTER...
                </div>
              ) : (
                <span>CREATE CHARACTER</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          {error && <span className="text-xs text-red-300">{error}</span>}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-yellow-200/60 text-xs">
              Already have a character?
            </span>
            <a
              href="/signin"
              className="text-yellow-200 hover:text-yellow-100 text-xs underline"
            >
              Sign In
            </a>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
