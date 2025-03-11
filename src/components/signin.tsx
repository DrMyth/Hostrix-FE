import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Good to see you! Let’s get back to building something great.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="johndoe" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={(e) => {
            // TODO: form validation
            window.location.href = "/dashboard";
          }}
        >
          Sign In
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Create Account
        </a>
      </div>
    </form>
  );
}
