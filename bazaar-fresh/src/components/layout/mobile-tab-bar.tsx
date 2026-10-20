"use client";

import { House, LayoutGrid, Search, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartCountBadge } from "@/components/cart/cart-button";
import { useCart } from "@/hooks/use-cart";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function MobileTabBar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const { count } = useCart();

  const tabs = [
    { href: "/", label: t("nav.home"), icon: House, active: pathname === "/" },
    {
      href: "/categories",
      label: t("nav.categories"),
      icon: LayoutGrid,
      active: pathname.startsWith("/categor") || pathname === "/deals",
    },
    { href: "/search", label: t("nav.search"), icon: Search, active: pathname === "/search" },
    { href: "/cart", label: t("nav.cart"), icon: ShoppingBasket, active: pathname === "/cart" || pathname === "/checkout" },
    { href: "/account", label: t("nav.account"), icon: User, active: pathname.startsWith("/account") || pathname.startsWith("/orders") },
  ];

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgb(0_0_0/0.05)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        {tabs.map(({ href, label, icon: Icon, active }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {active && <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-primary" />}
              <span className="relative">
                <Icon className={cn("size-[22px] transition-transform", active && "scale-110")} strokeWidth={active ? 2.4 : 2} />
                {href === "/cart" && <CartCountBadge count={count} className="absolute -end-2.5 -top-1.5" />}
              </span>
              <span className="max-w-full truncate px-1">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
