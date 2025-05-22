"use client";
import { X, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUser } from "../context/UserContext";
import Link from "next/link";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useUser();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Separator />

        {/* Profile content */}
        <div className="p-6">
          {/* Profile header with avatar and name */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage
                  src={
                    user.profileUrl || "https://i.ibb.co.com/KpPWKmwg/user.png"
                  }
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">
              @{user.name.toLowerCase().replace(/\s+/g, "")}
            </p>
          </div>

          <Separator className="my-4" />

          {/* User details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{user.email} </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Role : {user.role}</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href={`/${user?.role.toLocaleLowerCase()}/dashboard`}>View Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
