"use client";

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

const User = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();
  }, []);

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("please enter email and password");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("sign-up failed: " + error.message);
    } else {
      alert("sign-up successful! please check your email to confirm");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("please enter email and password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("login failed: " + error.message);
    } else {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="/icons/user.svg"
          alt="user"
          className="h-4 w-5 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {user ? (
          <div className="space-y-1">
            <DropdownMenuLabel className="text-lg">
              {user.email?.split("@")[0]}
            </DropdownMenuLabel>

            <Button
              variant={"destructive"}
              className="w-full"
              onClick={handleLogout}
            >
              logout
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded border p-2"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded border p-2"
            />

            <div className="flex flex-col space-y-2">
              <Button onClick={handleLogin} variant={"primary"}>
                login
              </Button>

              <Button onClick={handleSignUp} variant={"success"}>
                sign up
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
