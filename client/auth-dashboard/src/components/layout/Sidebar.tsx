import { Link, useLocation } from "react-router-dom"
import {
  IconShieldLock,
  IconLayoutDashboard,
  IconUsers,
  IconKey,
  IconSettings,
  IconApps,
  IconChartBar,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconHelpCircle,
  IconMessageCircle,
} from "@tabler/icons-react"

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const mainNavItems = [
  { icon: IconLayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: IconApps, label: "Clients", href: "/dashboard/clients" },
  { icon: IconUsers, label: "Users", href: "/dashboard/users" },
  { icon: IconKey, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: IconChartBar, label: "Analytics", href: "/dashboard/analytics" },
]

const bottomNavItems = [
  { icon: IconSettings, label: "Settings", href: "/dashboard/settings" },
  { icon: IconHelpCircle, label: "Help & Support", href: "/dashboard/help" },
]

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const location = useLocation()

  const isActivePath = (href: string) => {
    return location.pathname === href || (href === "/dashboard" && location.pathname === "/dashboard")
  }

  const NavItem = ({ item, isBottom = false }: { item: typeof mainNavItems[0]; isBottom?: boolean }) => {
    const isActive = isActivePath(item.href)
    return (
      <Link
        key={item.label}
        to={item.href}
        onClick={() => setMobileOpen(false)}
        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        } ${collapsed ? "justify-center" : ""}`}
      >
        <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
        {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
        {collapsed && (
          <div className="absolute left-full ml-3 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
            {item.label}
          </div>
        )}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-card/95 backdrop-blur-xl border-r border-border flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center ${collapsed ? "justify-center px-2" : "justify-between px-4"} border-b border-border`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-chart-3 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 shrink-0 group-hover:shadow-primary/50 transition-shadow">
              <IconShieldLock className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight">SecureGate</span>
                <span className="text-[10px] text-muted-foreground -mt-0.5">OAuth Platform</span>
              </div>
            )}
          </Link>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {!collapsed && (
            <div className="mb-3 px-3 pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Main Menu
              </span>
            </div>
          )}
          {mainNavItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}

          {/* Divider */}
          {!collapsed && (
            <div className="pt-6 pb-2 px-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Support
              </span>
            </div>
          )}
          {collapsed && <div className="py-3" />}
          
          {bottomNavItems.map((item) => (
            <NavItem key={item.label} item={item} isBottom />
          ))}
        </nav>

        {/* Upgrade Card (only when expanded) */}
        {!collapsed && (
          <div className="p-3">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <IconMessageCircle className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">Need Help?</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Contact our support team for assistance with your OAuth setup.
              </p>
              <button className="w-full text-xs font-medium text-primary hover:underline">
                Contact Support →
              </button>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {collapsed ? (
              <IconChevronRight className="w-5 h-5" />
            ) : (
              <>
                <IconChevronLeft className="w-5 h-5" />
                <span className="font-medium text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
