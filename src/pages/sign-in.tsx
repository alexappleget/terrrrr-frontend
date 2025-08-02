import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signIn({ username: "Test", password: "password123" });
    navigate("/dashboard");
  };

  return (
    <>
      <button onClick={handleSignIn}>Sign In</button>
    </>
  );
};
