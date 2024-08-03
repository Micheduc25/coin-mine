import "@/styles/navbaritem.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBarItem({ children, text, textSize, href }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center nav-bar-item rounded-lg shadow-sm py-1 px-4 text-gray-300 hover:text-white mx-1 ${
        isActive ? "active" : ""
      }`}
    >
      <span className="nav-icon">{children}</span>
      <span
        className={`${
          textSize || "text-3xs sm:text-2xs lg:text-sm"
        } font-bold uppercase`}
      >
        {text}
      </span>
    </Link>
  );
}
