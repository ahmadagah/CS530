"use client";

import { CircleHelp, LogOut, MapPin, Package, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { useUserStore } from "@/store/user";

/** "Login" button when signed out; account menu when signed in. */
export function AccountMenu({ className }: { className?: string }) {
  const { t, price } = useI18n();
  const router = useRouter();
  const loggedIn = useUserStore((s) => s.loggedIn);
  const profile = useUserStore((s) => s.profile);
  const balance = useUserStore((s) => s.walletBalance);
  const openLogin = useUIStore((s) => s.openLogin);

  if (!loggedIn) {
    return (
      <Button variant="ghost" className={cn("h-11 px-3 text-[15px]", className)} onClick={() => openLogin()}>
        {t("header.login")}
      </Button>
    );
  }

  const items = [
    { icon: Package, label: t("nav.orders"), href: "/account#orders" },
    { icon: MapPin, label: t("account.addresses"), href: "/account#addresses" },
    { icon: Wallet, label: `${t("account.wallet")} · ${price(balance)}`, href: "/account#wallet" },
    { icon: CircleHelp, label: t("nav.faq"), href: "/faq" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition hover:bg-muted data-[state=open]:bg-muted",
          className,
        )}
        aria-label={t("header.account")}
      >
        <User className="size-5" />
        <span className="hidden lg:inline">{t("header.account")}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-sm text-foreground">
          {profile.name}
          <span className="block text-xs font-normal text-muted-foreground" dir="ltr">
            {profile.phone}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map(({ icon: Icon, label, href }) => (
          <DropdownMenuItem key={href} onSelect={() => router.push(href)}>
            <Icon className="text-muted-foreground" /> {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            useUserStore.getState().logout();
            toast(t("auth.loggedOut"));
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut /> {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
