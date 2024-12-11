import { Link, useLocation } from "react-router-dom";
import { Card } from "./ui/card";
import { MyLink } from "@/types/interfaces/common.interface";
import { cn } from "@/lib/utils";

const links: MyLink[] = [
  { label: "Home", path: "/invoice", active: true },
  { label: "Accounts", path: "/accounts", active: false },
  { label: "Payement", path: "/paymentInfo", active: false },
  { label: "Clients", path: "/clients", active: false },
];

// Create a wrapper component for NavBar that checks the current path
export const NavBarWrapper = () => {
  const location = useLocation();
  const showNavBar = !["/", "/register", "/preview"].includes(
    location.pathname,
  );

  return showNavBar ? <NavBar /> : null;
};
export const NavBar = () => {
  // navigation links array
  return (
    <>
      <div className="fixed w-full px-3 py-1">
        <Card className="flex w-full items-center justify-center 2xl:py-3 xl:gap-5 gap-3 py-2">
          {links.map((link, index) => (
            <Link
              onClick={() => onLinkClick(index)}
              key={index}
              to={link.path}
              className={cn(
                "w-fit rounded-lg 2xl:px-4 2xl:py-1 px-2 py-0.5 font-semibold text-white/60 duration-150 ease-in-out hover:bg-secondary hover:text-white/90 2xl:text-2xl",
                link.active && "bg-primary-foreground text-card",
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

const onLinkClick = (index: number) => {
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
