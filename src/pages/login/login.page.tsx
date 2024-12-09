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

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-neutral-50 dark:bg-[#0e0c0b]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>login to your account!</CardDescription>
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
            <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
