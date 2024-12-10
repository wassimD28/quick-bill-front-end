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

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-neutral-50 dark:bg-[#0e0c0b]">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center">Log In</CardTitle>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                    placeholder="email"
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
            <Button className="w-full mb-1">Login</Button>
          </CardFooter>
          <CardDescription className="text-center mb-4">
            Already have an account? <Link className="text-primary" to="/">login</Link>
          </CardDescription>
        </Card>
      </div>
    </>
  );
};
