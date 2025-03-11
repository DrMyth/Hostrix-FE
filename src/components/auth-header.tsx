import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Logo from "../assets/logo.png";

const LoginHeader = ({ isVerify }: { isVerify: boolean }) => {
  return (
    <div className="flex justify-center gap-2 md:justify-start">
      <a href="/" className="flex items-center gap-2 font-medium">
        <div className="flex h-8.5 w-8.5 items-center justify-center rounded-md text-primary-foreground">
          <img src={Logo} />
        </div>
        <div className="text-lg">Hostrix</div>
      </a>
      {isVerify ? (
        <Button
          variant="ghost"
          className="flex items-center gap-2 ml-auto hover:bg-accent/50"
        >
          <User className="h-4 w-4" />
          Login as Guest
        </Button>
      ) : null}
    </div>
  );
};

export default LoginHeader;
