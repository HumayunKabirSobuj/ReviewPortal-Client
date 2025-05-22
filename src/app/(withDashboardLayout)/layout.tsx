/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import type React from "react";

// import { useUser } from "@/components/context/UserContext";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   BarChart3,
//   CalendarRange,
//   Euro,
//   Home,
//   LayoutDashboard,
//   Map,
//   MessageCircle,
//   MessageSquareDiff,
//   Users,
//   Vote,
//   X,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// const sidebarItemsAdmin = [
//   { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
//   //   { icon: Globe, label: "Site", href: "/admin/site" },
//   { icon: Users, label: "Manage Users", href: "/admin/manage-users" },
//   { icon: Map, label: "Manage Reviews", href: "/admin/manage-reviews" },
//   //   { icon: MapPin, label: "Routes", href: "/admin/routes" },
//   //   { icon: Building2, label: "Retailers", href: "/admin/retailers" },
//   //   { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
//   //   { icon: Package, label: "Products", href: "/admin/products" },
//   //   { icon: DollarSign, label: "Profit", href: "/admin/profit" },
//   //   { icon: Plus, label: "Extra", href: "/admin/extra" },
//   //   { icon: Building2, label: "Company", href: "/admin/company" },
//   //   { icon: MapPin, label: "Area", href: "/admin/area" },
//   //   { icon: Settings, label: "Management", href: "/admin/management" },
// ];
// const sidebarItemsUser = [
//   { icon: LayoutDashboard, label: "Dashboard", href: "/user/dashboard" },
//   //   { icon: Globe, label: "Site", href: "/admin/site" },
//   { icon: CalendarRange, label: "Add Reviews", href: "/user/add-reviews" },
//   {
//     icon: MessageSquareDiff,
//     label: "Manage Reviews",
//     href: "/user/manage-reviews",
//   },
//   {
//     icon: MessageCircle,
//     label: "Manage Comment",
//     href: "/user/manage-comment",
//   },
//   { icon: Vote, label: "Manage Vote", href: "/user/manage-vote" },
//   { icon: Euro, label: "My Payment", href: "/user/my-payments" },
//   { icon: Home, label: "Go to Home", href: "/" },
// ];

// const revenueData = [
//   { month: "Jan", revenue: 20000 },
//   { month: "Feb", revenue: 25000 },
//   { month: "Mar", revenue: 30000 },
//   { month: "Apr", revenue: 22000 },
//   { month: "May", revenue: 28000 },
//   { month: "Jun", revenue: 32000 },
//   { month: "Jul", revenue: 38000 },
//   { month: "Aug", revenue: 42000 },
//   { month: "Sep", revenue: 35000 },
//   { month: "Oct", revenue: 40000 },
//   { month: "Nov", revenue: 45000 },
//   { month: "Dec", revenue: 48000 },
// ];

// const productData = [
//   {
//     id: 1,
//     brand: "Big King",
//     name: "Big King",
//     price: "$100",
//     brandName: "Pepsi Cola",
//     quantity: "100",
//     srName: "John Smith",
//   },
//   {
//     id: 2,
//     brand: "Big King",
//     name: "Big King",
//     price: "$100",
//     brandName: "Pepsi Cola",
//     quantity: "100",
//     srName: "John Smith",
//   },
//   {
//     id: 3,
//     brand: "Big King",
//     name: "Big King",
//     price: "$100",
//     brandName: "Pepsi Cola",
//     quantity: "100",
//     srName: "John Smith",
//   },
// ];

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const [activeTab, setActiveTab] = useState("this-week");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const { user, setIsLoading, isLoading } = useUser();

//   const pathname = usePathname();
//   const [activePath, setActivePath] = useState(pathname);

//   // Update active path when route changes
//   useEffect(() => {
//     setActivePath(pathname);
//   }, [pathname]);

//   // Handle responsive sidebar
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(false);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   return (
//     <div>
//       <div className="flex min-h-screen bg-gray-50  overflow-y-hidden">
//         {/* Mobile sidebar overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 z-40 bg-black/50 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//             aria-hidden="true"
//           />
//         )}

//         {/* Sidebar */}
//         <div
//           className={cn(
//             "fixed inset-y-0 left-0 z-50 w-64 transform bg-white h-screen transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           )}
//         >
//           <div className="flex h-16 items-center justify-between px-4 border-b">
//             <span className="text-lg font-semibold flex items-center gap-2">
//               <BarChart3 className="h-5 w-5" />
//               {user?.role}
//             </span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <X className="h-5 w-5" />
//               <span className="sr-only">Close sidebar</span>
//             </Button>
//           </div>
//           <div className="flex-1 overflow-auto py-2">
//             <nav className="grid gap-1 px-2">
//               {/* check if user is admin then map sidebarItemsAdmin, and if the user is normal user then map over sidebarItemsUser */}
//               {user?.role === "ADMIN"
//                 ? sidebarItemsAdmin?.map((item, index) => {
//                     // Use the usePathname hook to get the current path
//                     // const pathname = window.location.pathname;
//                     const isActive = activePath === item.href;

//                     return (
//                       <Link
//                         key={index}
//                         href={item.href}
//                         className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
//                           isActive
//                             ? "bg-blue-50 text-blue-600"
//                             : "text-gray-600 hover:bg-gray-100"
//                         }`}
//                         onClick={() => isMobile && setSidebarOpen(false)}
//                       >
//                         <item.icon className="h-4 w-4" />
//                         {item.label}
//                       </Link>
//                     );
//                   })
//                 : sidebarItemsUser?.map((item, index) => {
//                     // Use the window.location.pathname to get the current path
//                     // const pathname = window.location.pathname;
//                     const isActive = activePath === item.href;

//                     return (
//                       <Link
//                         key={index}
//                         href={item.href}
//                         className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
//                           isActive
//                             ? "bg-blue-50 text-blue-600"
//                             : "text-gray-600 hover:bg-gray-100"
//                         }`}
//                         onClick={() => isMobile && setSidebarOpen(false)}
//                       >
//                         <item.icon className="h-4 w-4" />
//                         {item.label}
//                       </Link>
//                     );
//                   })}
//             </nav>
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

'use client';

import type React from 'react';

import { useUser } from '@/components/context/UserContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	BarChart3,
	CalendarRange,
	Euro,
	Home,
	LayoutDashboard,
	Loader,
	Map,
	MessageCircle,
	MessageSquareDiff,
	Users,
	Vote,
	X,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const sidebarItemsAdmin = [
	{ icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
	//   { icon: Globe, label: "Site", href: "/admin/site" },
	{ icon: Users, label: 'Manage Users', href: '/admin/manage-users' },
	{ icon: Map, label: 'Manage Reviews', href: '/admin/manage-reviews' },
	{ icon: Home, label: 'Go to Home', href: '/' },
];
const sidebarItemsUser = [
	{ icon: LayoutDashboard, label: 'Dashboard', href: '/user/dashboard' },
	{ icon: CalendarRange, label: 'Add Reviews', href: '/user/add-reviews' },
	{
		icon: MessageSquareDiff,
		label: 'Manage Reviews',
		href: '/user/manage-reviews',
	},
	{
		icon: MessageCircle,
		label: 'Manage Comment',
		href: '/user/manage-comment',
	},
	{ icon: Vote, label: 'Manage Vote', href: '/user/manage-vote' },
	{ icon: Euro, label: 'My Payment', href: '/user/my-payments' },
	{ icon: Home, label: 'Go to Home', href: '/' },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { user, setIsLoading, isLoading } = useUser();

	const pathname = usePathname();
	const [activePath, setActivePath] = useState(pathname);

	// Update active path when route changes
	useEffect(() => {
		setActivePath(pathname);
	}, [pathname]);

	// Handle responsive sidebar
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setSidebarOpen(false);
			}
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	return (
		<div>
			<div className="flex min-h-screen bg-gray-50 overflow-y-hidden">
				{/* Mobile sidebar overlay */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
						onClick={() => setSidebarOpen(false)}
						aria-hidden="true"
					/>
				)}

				{/* Sidebar */}
				<div
					className={cn(
						'fixed inset-y-0 left-0 z-50 w-64 transform bg-white h-screen transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0',
						sidebarOpen ? 'translate-x-0' : '-translate-x-full ',
					)}
				>
					<div className="flex h-16 items-center justify-between px-4  border-b">
						<span className="text-lg font-semibold flex items-center gap-2">
							<BarChart3 className="h-5 w-5" />
							{user?.role || 'Dashboard'}
						</span>
						<Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
							<X className="h-5 w-5" />
							<span className="sr-only">Close sidebar</span>
						</Button>
					</div>
					<div className="flex-1 overflow-auto py-2">
						<nav className="grid gap-1 px-2">
							{/* check if user is admin then map sidebarItemsAdmin, and if the user is normal user then map over sidebarItemsUser */}
							{user?.role === 'ADMIN'
								? sidebarItemsAdmin?.map((item, index) => {
										const isActive = activePath === item.href;

										return (
											<Link
												key={index}
												href={item.href}
												className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
													isActive
														? 'bg-blue-50 text-blue-600'
														: 'text-gray-600 hover:bg-gray-100'
												}`}
												onClick={() => isMobile && setSidebarOpen(false)}
											>
												<item.icon className="h-4 w-4" />
												{item.label}
											</Link>
										);
									})
								: sidebarItemsUser?.map((item, index) => {
										const isActive = activePath === item.href;

										return (
											<Link
												key={index}
												href={item.href}
												className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
													isActive
														? 'bg-blue-50 text-blue-600'
														: 'text-gray-600 hover:bg-gray-100'
												}`}
												onClick={() => isMobile && setSidebarOpen(false)}
											>
												<item.icon className="h-4 w-4" />
												{item.label}
											</Link>
										);
									})}
						</nav>
					</div>
				</div>
				<div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
					<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
						<Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
							<BarChart3 className="h-5 w-5" />
							<span className="sr-only">Open sidebar</span>
						</Button>
						<div className="w-full">
							<h1 className="text-lg font-semibold flex justify-end items-center py-4">
								{user?.role === 'ADMIN' ? 'Admin Dashboard' : 'User Dashboard'}
							</h1>
						</div>
					</header>
					<Suspense
						fallback={
							<div className="w-full h-[100vh] flex items-center justify-center">
								<Loader className="w-[80px] h-12 animate-spin" />
							</div>
						}
					>
						{children}
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
