import { useState } from "react"
import {
  IconUsers,
  IconPlus,
  IconCopy,
  IconEye,
  IconEyeOff,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconExternalLink,
  IconApps,
  IconActivity,
  IconClock,
  IconBook2,
  IconKey,
  IconCheck,
  IconRefresh,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for clients
const clients = [
  {
    id: "1",
    name: "E-Commerce Web App",
    clientId: "ecom_web_abc123xyz789",
    clientSecret: "",
    status: "active",
    grantTypes: ["authorization_code", "refresh_token"],
    redirectUris: ["https://shop.example.com/callback"],
    createdAt: "2024-01-15",
    lastUsed: "2 hours ago",
    requests: "12.4K",
  },
  {
    id: "2",
    name: "Mobile App iOS",
    clientId: "mobile_ios_def456uvw012",
    clientSecret: "",
    status: "active",
    grantTypes: ["authorization_code", "refresh_token", "pkce"],
    redirectUris: ["com.example.app://oauth/callback"],
    createdAt: "2024-02-20",
    lastUsed: "5 mins ago",
    requests: "28.1K",
  },
  {
    id: "3",
    name: "Admin Dashboard",
    clientId: "admin_dash_ghi789rst345",
    clientSecret: "",
    status: "inactive",
    grantTypes: ["client_credentials"],
    redirectUris: ["https://admin.example.com/auth"],
    createdAt: "2024-03-10",
    lastUsed: "3 days ago",
    requests: "4.7K",
  },
]

const stats = [
  { label: "Total Clients", value: "12", icon: IconApps, change: "+2", changeType: "positive" },
  { label: "Active Users", value: "1,234", icon: IconUsers, change: "+15%", changeType: "positive" },
  { label: "Auth Requests", value: "45.2K", icon: IconActivity, change: "24h", changeType: "neutral" },
  { label: "Avg Response", value: "42ms", icon: IconClock, change: "99.9%", changeType: "positive" },
]

export function Dashboard() {
  const [visibleSecrets, setVisibleSecrets] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const toggleSecretVisibility = (clientId: string) => {
    setVisibleSecrets((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }))
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your OAuth clients.~
          </p>
        </div>
        <Button className="shadow-lg shadow-primary/25">
          <IconPlus className="w-4 h-4 mr-2" />
          New Client
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl lg:text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-110 ${
                  stat.changeType === "positive" ? "bg-primary/10" : "bg-muted"
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.changeType === "positive" ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <Badge 
                  variant={stat.changeType === "positive" ? "default" : "secondary"}
                  className="text-xs px-1.5 py-0"
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? "vs last month" : "uptime"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Clients List - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">OAuth Clients</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <IconRefresh className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {clients.map((client) => (
              <Card key={client.id} className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-chart-3/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconApps className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {client.name}
                          <Badge
                            variant={client.status === "active" ? "default" : "secondary"}
                            className="text-[10px] px-1.5"
                          >
                            {client.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-3 mt-1">
                          <span>{client.requests} requests</span>
                          <span>•</span>
                          <span>Last used {client.lastUsed}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 hover:bg-muted cursor-pointer">
                        <IconDotsVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <IconEdit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <IconTrash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* Client ID */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Client ID
                      </label>
                      <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 font-mono text-xs">
                        <span className="flex-1 truncate">{client.clientId}</span>
                        <button
                          onClick={() => copyToClipboard(client.clientId, `${client.id}-id`)}
                          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          {copiedId === `${client.id}-id` ? (
                            <IconCheck className="w-4 h-4 text-primary" />
                          ) : (
                            <IconCopy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Client Secret */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Client Secret
                      </label>
                      <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 font-mono text-xs">
                        <span className="flex-1 truncate">
                          {visibleSecrets[client.id]
                            ? client.clientSecret
                            : "••••••••••••••••••••••••"}
                        </span>
                        <button
                          onClick={() => toggleSecretVisibility(client.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          {visibleSecrets[client.id] ? (
                            <IconEyeOff className="w-4 h-4" />
                          ) : (
                            <IconEye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(client.clientSecret, `${client.id}-secret`)}
                          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          {copiedId === `${client.id}-secret` ? (
                            <IconCheck className="w-4 h-4 text-primary" />
                          ) : (
                            <IconCopy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex flex-wrap gap-2">
                  {client.grantTypes.map((grant) => (
                    <Badge key={grant} variant="outline" className="text-[10px] font-normal">
                      {grant}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-colors text-left group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconPlus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">New Client</p>
                  <p className="text-xs text-muted-foreground">Register OAuth app</p>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted border border-transparent hover:border-border transition-colors text-left group">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconKey className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Generate API Key</p>
                  <p className="text-xs text-muted-foreground">For server access</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted border border-transparent hover:border-border transition-colors text-left group">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconBook2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Documentation</p>
                  <p className="text-xs text-muted-foreground">Integration guides</p>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "New login", client: "E-Commerce Web", time: "2 min ago", type: "success" },
                { action: "Token refreshed", client: "Mobile iOS", time: "15 min ago", type: "info" },
                { action: "Client updated", client: "Admin Dashboard", time: "1 hour ago", type: "warning" },
                { action: "New registration", client: "Partner API", time: "3 hours ago", type: "success" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    activity.type === "success" ? "bg-primary" :
                    activity.type === "warning" ? "bg-yellow-500" :
                    "bg-blue-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.client}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View all activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
