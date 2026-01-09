import { useState } from "react"
import {
  IconUser,
  IconMapPin,
  IconBuilding,
  IconEdit,
  IconCamera,
  IconCheck,
  IconX,
  IconKey,
  IconBell,
  IconLock,
  IconDevices,
  IconHistory,
  IconTrash,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Mock user data
const userData = {
  id: "usr_123456",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: null,
  role: "Administrator",
  status: "active",
  emailVerified: true,
  phoneVerified: true,
  twoFactorEnabled: true,
  createdAt: "2024-01-15",
  lastLogin: "2 hours ago",
  address: {
    street: "123 Innovation Drive",
    apartment: "Suite 456",
    city: "San Francisco",
    state: "California",
    country: "United States",
    zipCode: "94102",
  },
  company: {
    name: "TechCorp Inc.",
    position: "Senior Developer",
    department: "Engineering",
  },
}

const recentSessions = [
  { device: "MacBook Pro", location: "San Francisco, US", time: "Current session", current: true },
  { device: "iPhone 15 Pro", location: "San Francisco, US", time: "1 hour ago", current: false },
  { device: "Windows Desktop", location: "New York, US", time: "2 days ago", current: false },
]

const tabs = [
  { id: "profile", label: "Profile", icon: IconUser },
  { id: "security", label: "Security", icon: IconLock },
  { id: "sessions", label: "Sessions", icon: IconDevices },
  { id: "activity", label: "Activity", icon: IconHistory },
]

export function Profile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    street: userData.address.street,
    apartment: userData.address.apartment,
    city: userData.address.city,
    state: userData.address.state,
    country: userData.address.country,
    zipCode: userData.address.zipCode,
    company: userData.company.name,
    position: userData.company.position,
    department: userData.company.department,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      street: userData.address.street,
      apartment: userData.address.apartment,
      city: userData.address.city,
      state: userData.address.state,
      country: userData.address.country,
      zipCode: userData.address.zipCode,
      company: userData.company.name,
      position: userData.company.position,
      department: userData.company.department,
    })
    setIsEditing(false)
  }

  return (
    <>
      {/* Profile Header Card */}
      <div className="mb-8">
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-chart-3 to-primary" />
          
          <CardContent className="relative pt-0 pb-6">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-card border-4 border-background shadow-xl flex items-center justify-center overflow-hidden">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center text-white text-4xl font-bold">
                      {userData.firstName[0]}{userData.lastName[0]}
                    </div>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                  <IconCamera className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="ml-0 sm:ml-40 pt-20 sm:pt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
                  <Badge variant="default" className="text-xs">
                    {userData.role}
                  </Badge>
                  <Badge variant="outline" className="text-xs text-primary border-primary/30">
                    <IconCheck className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">{userData.email}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <IconBuilding className="w-4 h-4" />
                    {userData.company.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconMapPin className="w-4 h-4" />
                    {userData.address.city}, {userData.address.state}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      <IconX className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <IconCheck className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <IconEdit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconUser className="w-5 h-5 text-primary" />
                  Basic Information
                </CardTitle>
                <CardDescription>Your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                          <span className="text-sm">{formData.email}</span>
                          <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                            <IconCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                          <span className="text-sm">{formData.phone}</span>
                          <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                            <IconCheck className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconMapPin className="w-5 h-5 text-primary" />
                  Address Information
                </CardTitle>
                <CardDescription>Your primary address details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    {isEditing ? (
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.street}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apt/Suite (Optional)</Label>
                    {isEditing ? (
                      <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.apartment}</p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    {isEditing ? (
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    {isEditing ? (
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.zipCode}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  {isEditing ? (
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.country}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconBuilding className="w-5 h-5 text-primary" />
                  Company Information
                </CardTitle>
                <CardDescription>Your organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    {isEditing ? (
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.company}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    {isEditing ? (
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.position}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm py-2 px-3 bg-muted/50 rounded-lg">{formData.department}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">{userData.createdAt}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium">{userData.lastLogin}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <span className="text-xs font-mono text-muted-foreground">{userData.id}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconKey className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Change Password</p>
                    <p className="text-xs text-muted-foreground">Update your password</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left">
                  <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                    <IconBell className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Notifications</p>
                    <p className="text-xs text-muted-foreground">Manage alerts</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left">
                  <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <IconLock className="w-5 h-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Two-Factor Auth</p>
                    <p className="text-xs text-muted-foreground">
                      {userData.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </button>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                  <IconTrash className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconKey className="w-5 h-5 text-primary" />
                Password
              </CardTitle>
              <CardDescription>Manage your password settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-medium">Current Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconLock className="w-5 h-5 text-primary" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      {userData.twoFactorEnabled ? "Enabled and active" : "Not configured"}
                    </p>
                  </div>
                </div>
                <Button variant={userData.twoFactorEnabled ? "outline" : "default"}>
                  {userData.twoFactorEnabled ? "Manage" : "Enable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="space-y-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IconDevices className="w-5 h-5 text-primary" />
                Active Sessions
              </CardTitle>
              <CardDescription>Devices where you're currently logged in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSessions.map((session, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${
                  session.current ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      session.current ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <IconDevices className={`w-5 h-5 ${session.current ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-muted-foreground">{session.location} • {session.time}</p>
                    </div>
                  </div>
                  {session.current ? (
                    <Badge variant="default">Current</Badge>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                Sign Out All Other Sessions
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconHistory className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your account activity history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Logged in", detail: "Chrome on MacBook Pro", time: "2 hours ago", type: "login" },
              { action: "Password changed", detail: "Security update", time: "30 days ago", type: "security" },
              { action: "API key generated", detail: "Production key", time: "2 months ago", type: "api" },
              { action: "Profile updated", detail: "Changed email address", time: "3 months ago", type: "profile" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === "login" ? "bg-primary/10" :
                  activity.type === "security" ? "bg-chart-3/10" :
                  activity.type === "api" ? "bg-chart-2/10" :
                  "bg-muted"
                }`}>
                  {activity.type === "login" && <IconUser className="w-5 h-5 text-primary" />}
                  {activity.type === "security" && <IconLock className="w-5 h-5 text-chart-3" />}
                  {activity.type === "api" && <IconKey className="w-5 h-5 text-chart-2" />}
                  {activity.type === "profile" && <IconEdit className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}
