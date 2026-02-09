import {
  LayoutDashboard,
  Receipt,
  Landmark,
  GitMerge,
  FileText,
  AlertTriangle,
  Cog,
  ScrollText,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Remittances", url: "/remittances", icon: Receipt },
  { title: "Deposits", url: "/deposits", icon: Landmark },
  { title: "Matching", url: "/matching", icon: GitMerge },
  { title: "Payment Lines", url: "/payment-lines", icon: FileText },
  { title: "Watchlist", url: "/watchlist", icon: AlertTriangle },
  { title: "Rules", url: "/rules", icon: Shield },
  { title: "Settings", url: "/settings", icon: Cog },
  { title: "Audit Log", url: "/audit-log", icon: ScrollText },
];

const roleLabels: Record<string, string> = {
  admin: "Admin",
  operator: "Operator",
  readonly: "Read-only",
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
          B
        </div>
        {!collapsed && <span className="font-semibold text-sidebar-accent-foreground tracking-tight">Broker OS</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {user && !collapsed && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-accent-foreground truncate">{user.name}</p>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-sidebar-border text-sidebar-muted">
                {roleLabels[user.role]}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-sidebar-muted hover:text-sidebar-accent-foreground" onClick={logout}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-7 text-sidebar-muted hover:text-sidebar-accent-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}
