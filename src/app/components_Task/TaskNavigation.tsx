import { Star, CircleCheckBig, ListTodo } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TooltipDesktop } from "../shared/ui/Tooltip";

const buttons = [
  {
    href: "/task/favorite",
    tooltip: "All your favorite task",
    content: "favorite",
    icon: Star,
    iconClassName: " mr-2",
  },
  {
    href: "/task/completed",
    tooltip: "All your completed task",
    content: "completed",
    icon: CircleCheckBig,
    iconClassName: " mr-2",
  },
  {
    href: "/task",
    tooltip: "All your task",
    content: "All task",
    icon: ListTodo,
    iconClassName: " mr-2",
  },
];

export default function TaskNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row bg-gray-200 rounded-2xl">
      {buttons.map((button) => {
        const Icon = button.icon;
        const isActive = pathname === button.href;

        return (
          <TooltipDesktop key={button.href} content={button.tooltip}>
            <Link
              href={button.href}
              aria-current={isActive ? "page" : undefined}
              className={`
                inline-flex items-center justify-center text-main text-sm whitespace-nowrap
                 rounded-2xl w-[140px] px-4 py-2
                 transition-colors ${isActive ? "bg-sky-200" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              <Icon size={20} className={button.iconClassName} />
              {button.content}
            </Link>
          </TooltipDesktop>
        );
      })}
    </nav>
  );
}
