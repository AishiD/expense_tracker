"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileButton = ({ className }) => {
  const navigate = useNavigate();

  return (
    <Button
      className={
        "relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden hover:bg-primary/80 cursor-pointer"
      }
      onClick={() => navigate("/profile")}
    >
      <span className="relative z-10 transition-all duration-500">Profile</span>

      <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
};

const Navbar = () => {
  return (
    <header className="bg-transparent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
        <nav
          className={cn(
            "w-full flex items-center justify-between gap-3.5 lg:gap-6 transition-all duration-500 p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full",
          )}
        >
          <Link to={"/"}>
            <span className="text-background bg-primary rounded-full p-1">Ex</span>pence
          </Link>
          <ProfileButton />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
