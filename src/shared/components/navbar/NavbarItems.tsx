// file: components/NavbarItem.tsx

import Link from "next/link";

interface NavbarItemProps {
  href: string;
  title: string;
}

const NavbarItem = ({ href, title }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className="xl:text-2xl text-xl md:text-lg font-normal text-[#F3EFE8CC]"
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
