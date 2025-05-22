"use client";

import type React from "react";
import { Sidebar } from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  userRole?: "user" | "admin";
};

export function Layout({
  children,
  isLoggedIn = false,
  userRole = "user",
}: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isLoggedIn={isLoggedIn} userRole={userRole} />
      <div className="flex-1 md:ml-72">
        <main className="container mx-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
