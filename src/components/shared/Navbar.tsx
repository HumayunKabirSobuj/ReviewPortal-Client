
// "use client";

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Star,
//   Home,
//   Menu,
//   X,
//   ChevronDown,
//   LogOut,
//   User,
//   MailQuestion,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";
// import { useUser } from "../context/UserContext";
// import { logout } from "@/services/AuthServices";
// import { ProfileModal } from "./ProfileModal";

// type NavItem = {
//   title: string;
//   href: string;
//   icon: React.ElementType;
// };

// const navItems: NavItem[] = [
//   {
//     title: "Home",
//     href: "/",
//     icon: Home,
//   },
//   {
//     title: "Reviews",
//     href: "/reviews",
//     icon: Star,
//   },
//   {
//     title: "About",
//     href: "/about",
//     icon: MailQuestion,
//   },
// ];

// export function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const [profileModalOpen, setProfileModalOpen] = useState(false);

//   const { user, setIsLoading,} = useUser();


//   const handleLogout = async () => {
//     // console.log("logout...");
//     setIsLoading(true); // প্রথমে loading শুরু করি
//     await logout(); // async call শেষ না হওয়া পর্যন্ত wait করি
//     setIsLoading(false); // তারপর loading false করি
//     router.push("/");
//   };

//   return (
//     <nav className="border-b bg-white shadow-sm">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo and desktop navigation */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <Link href="/" className="flex items-center">
//                 <Star className="mr-2 h-6 w-6 text-yellow-500" />
//                 <span className="text-xl font-semibold text-gray-900">
//                   Review Portal
//                 </span>
//               </Link>
//             </div>

//             {/* Desktop navigation */}
//             <div className="hidden md:ml-10 md:block">
//               <div className="flex items-center space-x-4">
//                 {navItems.map((item) => {
//                   const Icon = item.icon;
//                   const isActive =
//                     pathname === item.href ||
//                     (item.href !== "/" && pathname.startsWith(item.href));

//                   return (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       className={cn(
//                         "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
//                         isActive
//                           ? "bg-blue-50 text-blue-600"
//                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                       )}
//                     >
//                       <Icon className="mr-2 h-4 w-4" />
//                       {item.title}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right side items */}
//           <div className="flex items-center">
//             {/* Notifications */}

//             {/* User dropdown or Login button */}
//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="flex items-center space-x-2"
//                   >
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage
//                         src={
//                           user?.profileUrl ||
//                           "https://i.ibb.co.com/KpPWKmwg/user.png"
//                         }
//                         alt="User"
//                       />
//                       <AvatarFallback>USER</AvatarFallback>
//                     </Avatar>
//                     <span className="hidden text-sm font-medium text-gray-700 md:inline-block">
//                       {user?.name}
//                     </span>
//                     <ChevronDown className="h-4 w-4 text-gray-500" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
//                   <div className="px-2 py-1.5">
//                     <p className="text-sm font-medium">{user?.name}</p>
//                     <p className="text-xs text-gray-500">{user?.email}</p>
//                   </div>
//                   <DropdownMenuSeparator />

//                   <DropdownMenuItem
//                     onClick={() => {
//                       setProfileModalOpen(true);
//                       // Close the dropdown menu when opening the modal
//                       document.body.click();
//                     }}
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     <span>My Profile</span>
//                   </DropdownMenuItem>

//                   {user.role === "ADMIN" ? (
//                     <DropdownMenuItem>
//                       <User className="mr-2 h-4 w-4" />
//                       <Link href={"/admin/dashboard"}>
//                         <span> Dashboard</span>
//                       </Link>
//                     </DropdownMenuItem>
//                   ) : (
//                     <DropdownMenuItem>
//                       <User className="mr-2 h-4 w-4" />
//                       <Link href={"/user/dashboard"}>
//                         <span> Dashboard</span>
//                       </Link>
//                     </DropdownMenuItem>
//                   )}

//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     className="text-red-600"
//                     onClick={() => handleLogout()}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     <span>Log out</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button variant="default" className="bg-purple-600 ">
//                 <Link href={"/login"}> Login</Link>
//               </Button>
//             )}

//             {/* Mobile menu button */}
//             <div className="ml-2 flex md:hidden">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 aria-expanded={mobileMenuOpen}
//                 className="text-gray-600"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {mobileMenuOpen ? (
//                   <X className="h-6 w-6" aria-hidden="true" />
//                 ) : (
//                   <Menu className="h-6 w-6" aria-hidden="true" />
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
//         {/* Mobile search */}

//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive =
//               pathname === item.href ||
//               (item.href !== "/" && pathname.startsWith(item.href));

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center rounded-md px-3 py-2 text-base font-medium",
//                   isActive
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 )}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <Icon className="mr-3 h-5 w-5" />
//                 {item.title}
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//       {/* Profile Modal */}
//       <ProfileModal
//         isOpen={profileModalOpen}
//         onClose={() => setProfileModalOpen(false)}
//       />
//     </nav>
//   );
// }


"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Star, Home, Menu, X, ChevronDown, LogOut, User, MailQuestion } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useUser } from "../context/UserContext"
import { logout } from "@/services/AuthServices"
import { ProfileModal } from "./ProfileModal"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Reviews",
    href: "/reviews",
    icon: Star,
  },
  {
    title: "About",
    href: "/about",
    icon: MailQuestion,
  },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [profileModalOpen, setProfileModalOpen] = useState(false)

  const { user, setIsLoading } = useUser()

  const handleLogout = async () => {
    // console.log("logout...");
    setIsLoading(true) // প্রথমে loading শুরু করি
    await logout() // async call শেষ না হওয়া পর্যন্ত wait করি
    setIsLoading(false) // তারপর loading false করি
    router.push("/")
  }

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Star className="mr-2 h-6 w-6 text-yellow-500" />
                <span className="text-xl font-semibold text-gray-900">Review Portal</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:ml-10 md:block">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center">
            {/* Notifications */}

            {/* User dropdown or Login button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profileUrl || "https://i.ibb.co.com/KpPWKmwg/user.png" || "/placeholder.svg"}
                        alt="User"
                      />
                      <AvatarFallback>USER</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium text-gray-700 md:inline-block">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => {
                      setProfileModalOpen(true)
                      // Close the dropdown menu when opening the modal
                      document.body.click()
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>

                  {user.role === "ADMIN" ? (
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <Link href={"/admin/dashboard"}>
                        <span> Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <Link href={"/user/dashboard"}>
                        <span> Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => handleLogout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" className="bg-purple-600 ">
                <Link href={"/login"}> Login</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <div className="ml-2 flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                className="text-gray-600"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        {/* Mobile search */}

        <div className="space-y-1 px-2 pb-3 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-base font-medium",
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
      {/* Profile Modal */}
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </nav>
  )
}
