import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AuthActions from "../actions/auth-actions";
import LoginGoogleForm from "./login-google";

export default function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Name</CardTitle>
        <CardDescription>Log in to continue.</CardDescription>
      </CardHeader>
      <form action={AuthActions.login}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-2/3">Sign In</Button>
          <Link
            href="/portal/sign-up"
            className={buttonVariants({ variant: "link" })}
          >
            Create Account
          </Link>
        </CardFooter>
      </form>
      <LoginGoogleForm />
    </Card>
  );
}
