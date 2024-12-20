import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/quick-bill-logo.svg"

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-neutral-50 dark:bg-[#0e0c0b]">
        <Card className="w-[450px]">
          <CardHeader>
            <img className="h-14" src={logo} alt="" />
            <CardTitle className="text-start">log In</CardTitle>
            <p className="text-sm text-white/60">Log to your account.</p>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="username"
                    placeholder="username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    placeholder="password"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full">
            <Button className="mb-1 w-full">Login</Button>
          </CardFooter>
          <CardDescription className="mb-4 text-center">
            You don't have an account?{" "}
            <Link className="text-primary" to="/register">
              register
            </Link>
          </CardDescription>
        </Card>
      </div>
    </>
  );
};
