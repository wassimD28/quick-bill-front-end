import { Link, useLocation } from "react-router-dom";
import { Card } from "./ui/card";
import { MyLink } from "@/types/interfaces/common.interface";
import { cn } from "@/lib/utils";

const links: MyLink[] = [
  { label: "Home", path: "/home", active: true },
  { label: "Preview", path: "/preview", active: false },
  { label: "Profile", path: "/profile", active: false },
  { label: "Accounts", path: "/accounts", active: false },
  { label: "Payement", path: "/paymentInfo", active: false },
  { label: "Clients", path: "/clients", active: false },
];

// Create a wrapper component for NavBar that checks the current path
export const NavBarWrapper = () => {
  const location = useLocation();
  const showNavBar = !["/", "/register","/preview"].includes(location.pathname);
  
  return showNavBar ? <NavBar /> : null;
};
export const NavBar = () => {
  // navigation links array
  return (
    <>
      <div className="w-full py-2 px-3 fixed">
        <Card className="w-full">
          {links.map((link, index) => (
            <Link
              onClick={() => onLinkClick(index)}
              key={index}
              to={link.path}
              className={cn(
                "w-fit text-gray-600 hover:text-gray-800",
                link.active && "font-bold text-blue-500",
              )}
            >
              {link.label}
            </Link>
          ))}
        </Card>
      </div>
    </>
  );
};

const onLinkClick = (index : number) => {
    // locate the clicked link
    // and set the active property to true for that link
    // and set the active property to false for all other links
    links.forEach((link, i) => {
      if (i === index) {
        link.active = true;
      } else {
        link.active = false;
      }
    });
};