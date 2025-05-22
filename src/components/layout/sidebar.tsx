"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Star,
  ShoppingBag,
  Search,
  Settings,
  LogOut,
  User,
  PlusCircle,
  BarChart3,
  DollarSign,
  CheckSquare,
  Clock,
  Menu,
  X,
  ChevronDown,
  CreditCard,
  Package,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type SidebarProps = {
  className?: string;
  isLoggedIn?: boolean;
  userRole?: "user" | "admin";
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  role?: "user" | "admin" | "all";
};

export function Sidebar({
  className,
  isLoggedIn = false,
  userRole = "user",
}: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/reviews/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  // Common navigation items for all users
  const commonNavItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: Home,
      role: "all",
    },
    {
      title: "All Reviews",
      href: "/reviews",
      icon: Star,
      role: "all",
    },
    {
      title: "Categories",
      href: "/categories",
      icon: ShoppingBag,
      role: "all",
    },
  ];

  // User-specific navigation items
  const userNavItems: NavItem[] = [
    {
      title: "My Reviews",
      href: "/my-reviews",
      icon: Star,
      role: "user",
    },
    {
      title: "Write Review",
      href: "/reviews/new",
      icon: PlusCircle,
      role: "user",
    },
    {
      title: "My Purchases",
      href: "/purchases",
      icon: CreditCard,
      role: "user",
    },
  ];

  // Admin-specific navigation items
  const adminNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChart3,
      role: "admin",
    },
    {
      title: "Pending Reviews",
      href: "/admin/reviews/pending",
      icon: Clock,
      badge: "5",
      role: "admin",
    },
    {
      title: "Manage Reviews",
      href: "/admin/reviews",
      icon: CheckSquare,
      role: "admin",
    },
    {
      title: "Premium Content",
      href: "/admin/premium",
      icon: DollarSign,
      role: "admin",
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
      role: "admin",
    },
  ];

  // Combine navigation items based on user role
  const navItems = [
    ...commonNavItems,
    ...(isLoggedIn && userRole === "user" ? userNavItems : []),
    ...(isLoggedIn && userRole === "admin" ? adminNavItems : []),
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="bg-white shadow-md"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-72 flex-col border-r bg-white transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center border-b px-6">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Star className="mr-2 h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold text-blue-600">Review</span>
              <span className="text-xl font-semibold text-gray-900">
                Portal
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="px-4 py-3 border-b">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search reviews..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-600",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                    {item.badge && (
                      <Badge className="ml-auto bg-blue-600">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Categories section with collapsible */}
            <div className="px-4 py-2">
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Popular Categories</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 py-2">
                  <div className="grid gap-1">
                    {[
                      "Electronics",
                      "Clothing",
                      "Books",
                      "Home & Kitchen",
                      "Beauty",
                    ].map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* User section */}
          <div className="mt-auto border-t p-4">
            {isLoggedIn ? (
              <div className="w-full">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatars/user.png" alt="User" />
                      <AvatarFallback>
                        {userRole === "admin" ? "AD" : "US"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">
                        {userRole === "admin" ? "Admin User" : "John Doe"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userRole === "admin"
                          ? "Administrator"
                          : "Regular User"}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isUserMenuOpen && "rotate-180",
                    )}
                  />
                </Button>

                {isUserMenuOpen && (
                  <div className="mt-2 space-y-1 border rounded-md bg-white shadow-sm">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href="/profile"
                        onClick={() => {
                          setIsOpen(false);
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href="/settings"
                        onClick={() => {
                          setIsOpen(false);
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-2">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
