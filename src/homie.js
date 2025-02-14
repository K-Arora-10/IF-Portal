import { HoveredLink, Menu, MenuItem, ProductItem } from "./Navbar";
import { useState } from "react";
import { cn } from "./lib/utils";
import { BrowserRouter } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import the icon
import LoginModal from "./components/LoginModal";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
            <p className="text-black dark:text-white"></p>
        </div>
    );
}

function Navbar({ className }) {
    const [active, setActive] = useState(null);

    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
                {/* Add Icon */}
                <LoginModal />

            </Menu>
        </div>
    );
}
