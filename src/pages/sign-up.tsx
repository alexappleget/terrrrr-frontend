import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    await signUp({ username: "Test", password: "password123" });
    navigate("/dashboard");
  };

  return (
    <>
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
};
