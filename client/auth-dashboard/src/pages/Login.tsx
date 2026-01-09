import { useState } from "react"
import { Link } from "react-router-dom"
import {
  IconShieldLock,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowLeft,
  IconBrandGoogle,
  IconBrandGithub,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    console.log("Login attempt:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const features = [
    "Single Sign-On (SSO) support",
    "Multi-factor authentication",
    "Role-based access control",
    "API key management",
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Primary gradient background using theme colors */}
        <div className="absolute inset-0 bg-linear-to-br from-chart-5 via-primary to-chart-3" />
        
        {/* Secondary gradient layer for depth */}
        <div className="absolute inset-0 bg-linear-to-tr from-chart-5/60 via-transparent to-chart-1/30" />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.15),transparent_50%)]" />
        </div>

        {/* Floating shapes using theme colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-chart-1/25 blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 h-96 w-96 rounded-full bg-chart-2/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full border border-white/20" />
          <div className="absolute bottom-1/4 left-1/3 h-20 w-20 rounded-full border border-chart-1/30" />
          <div className="absolute top-3/4 right-1/3 h-16 w-16 rounded-full bg-white/5 backdrop-blur-sm" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground w-full">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>

          <div className="space-y-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
              <IconShieldLock className="h-10 w-10" />
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-medium">
                <IconSparkles className="h-4 w-4" />
                Enterprise Security
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Welcome to<br />SecureGate
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-md leading-relaxed">
                Your gateway to secure, seamless authentication across all your applications.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-primary-foreground/90">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <IconCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div className="space-y-1">
                <div className="text-4xl font-bold">99.9%</div>
                <div className="text-sm text-primary-foreground/70">Uptime SLA</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">10M+</div>
                <div className="text-sm text-primary-foreground/70">Daily Auth</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">&lt;50ms</div>
                <div className="text-sm text-primary-foreground/70">Response</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Scaler E-Commerce Platform. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-linear-to-br from-background via-background to-muted/30">
        {/* Theme toggle for right side */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-[420px] space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <IconShieldLock className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">SecureGate</span>
          </div>

          <Card className="border-0 shadow-2xl shadow-black/5 ring-1 ring-border/40 backdrop-blur">
            <CardHeader className="space-y-2 pb-6 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full h-11 font-medium hover:bg-muted/80 transition-all" 
                  type="button"
                >
                  <IconBrandGoogle className="h-5 w-5 text-[#4285F4]" />
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-11 font-medium hover:bg-muted/80 transition-all" 
                  type="button"
                >
                  <IconBrandGithub className="h-5 w-5" />
                  GitHub
                </Button>
              </div>

              <FieldSeparator>or continue with</FieldSeparator>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  {/* Email Field */}
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel>
                      Email address
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <IconMail className="h-4 w-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.email}
                      />
                    </InputGroup>
                    {errors.email && <FieldError>{errors.email}</FieldError>}
                  </Field>

                  {/* Password Field */}
                  <Field data-invalid={!!errors.password}>
                    <div className="flex items-center justify-between">
                      <FieldLabel>
                        Password
                      </FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <InputGroup>
                      <InputGroupAddon>
                        <IconLock className="h-4 w-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.password}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          size="icon-xs"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          {showPassword ? (
                            <IconEyeOff className="h-4 w-4" />
                          ) : (
                            <IconEye className="h-4 w-4" />
                          )}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.password && <FieldError>{errors.password}</FieldError>}
                    <FieldDescription>
                      Must be at least 6 characters
                    </FieldDescription>
                  </Field>

                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold text-base mt-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2 pb-6">
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Create account
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
              <IconLock className="h-3.5 w-3.5 text-primary" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
              <IconShieldLock className="h-3.5 w-3.5 text-primary" />
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}