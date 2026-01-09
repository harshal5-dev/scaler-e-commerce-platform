import { Link } from "react-router-dom"
import {
  IconBell,
  IconSearch,
  IconMenu2,
  IconChevronDown,
  IconUser,
  IconSettings,
  IconKey,
  IconLogout,
  IconCommand,
  IconSparkles,
  IconMoon,
  IconSun,
  IconDeviceDesktop,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

interface HeaderProps {
  onMenuClick: () => void
  user?: {
    name: string
    email: string
    role: string
    avatar?: string
  }
}

export function Header({ onMenuClick, user = { name: "John Doe", email: "john@example.com", role: "Administrator" } }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="h-16 flex items-center justify-between px-4 lg:px-6 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={onMenuClick}
          >
            <IconMenu2 className="w-5 h-5" />
          </Button>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-3 bg-muted/60 hover:bg-muted/80 rounded-xl px-4 py-2.5 w-full max-w-md transition-colors group cursor-pointer border border-transparent hover:border-border">
            <IconSearch className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors flex-1">
              Search clients, users, settings...
            </span>
            <div className="flex items-center gap-1">
              <kbd className="hidden lg:inline-flex h-6 select-none items-center gap-1 rounded-md border border-border bg-background px-2 font-mono text-[11px] font-medium text-muted-foreground shadow-sm">
                <IconCommand className="w-3 h-3" />K
              </kbd>
            </div>
          </div>

          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <IconSearch className="w-5 h-5" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Actions */}
          <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground">
            <IconSparkles className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
              {theme === "dark" ? (
                <IconMoon className="w-5 h-5" />
              ) : theme === "light" ? (
                <IconSun className="w-5 h-5" />
              ) : (
                <IconDeviceDesktop className="w-5 h-5" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <IconSun className="w-4 h-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <IconMoon className="w-4 h-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <IconDeviceDesktop className="w-4 h-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full ring-2 ring-background" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button className="text-xs text-primary hover:underline">Mark all read</button>
                </div>
              </div>
              <div className="py-2">
                <div className="px-3 py-2 hover:bg-muted rounded-md mx-1 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <IconKey className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">New API Key Generated</p>
                      <p className="text-xs text-muted-foreground truncate">Mobile App iOS requested a new key</p>
                      <p className="text-[10px] text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 hover:bg-muted rounded-md mx-1 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-chart-2/10 flex items-center justify-center shrink-0">
                      <IconUser className="w-4 h-4 text-chart-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">New User Registered</p>
                      <p className="text-xs text-muted-foreground truncate">jane@example.com joined your team</p>
                      <p className="text-[10px] text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 border-t border-border">
                <button className="w-full text-sm text-primary hover:underline">View all notifications</button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-border mx-1" />

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 sm:pr-3 rounded-xl hover:bg-muted transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary via-primary to-chart-3 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-primary/25 ring-2 ring-primary/20">
                  {getInitials(user.name)}
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.role}</p>
              </div>
              <IconChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* User Info Header */}
              <div className="px-3 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <IconUser className="w-4 h-4 mr-3" />
                    <div className="flex-1">
                      <span>Profile</span>
                      <p className="text-[10px] text-muted-foreground">Manage your account</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  <IconSettings className="w-4 h-4 mr-3" />
                  <div className="flex-1">
                    <span>Settings</span>
                    <p className="text-[10px] text-muted-foreground">App preferences</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <IconKey className="w-4 h-4 mr-3" />
                  <div className="flex-1">
                    <span>API Keys</span>
                    <p className="text-[10px] text-muted-foreground">Manage access tokens</p>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              {/* Logout */}
              <div className="py-1">
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                  <IconLogout className="w-4 h-4 mr-3" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
