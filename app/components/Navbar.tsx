"use client"; // Ensure this component is a Client Component
import "@/app/globals.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon, GearIcon } from "@radix-ui/react-icons";
import styles from "./Navbar.module.css"; // Import the CSS module
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig" // Adjust the import path as necessary
import { Icons } from "@/app/components/icons"
import { BidCredits } from "@/app/components/BidCredits"

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Function to determine if the link is active
  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/auth') // Redirect to auth page after sign out
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Placeholder for bid credits; replace with actual data as needed
  const bidCredits = 25;

  return (
    <nav className="bg-background p-4 shadow-md">
      <div className="nav-container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">BMR Logo</span>
          <NavigationMenu>
            <NavigationMenuList className="flex items-start gap-6">
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <a
                    className={`${styles.navLink} ${
                      isActive("/dashboard") ? styles.active : styles.inactive
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/available-leads" legacyBehavior passHref>
                  <a
                    className={`${styles.navLink} ${
                      isActive("/available-leads")
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    Available Leads
                  </a>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/active-leads" legacyBehavior passHref>
                  <a
                    className={`${styles.navLink} ${
                      isActive("/active-leads")
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    Active Bids
                  </a>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          {/* Bid Credits Display */}
          <BidCredits credits={bidCredits} />
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-2 py-1"
            />
            <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <GearIcon className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <Icons.exit className="mr-2 h-[50px] w-[10px]" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
