import { Link } from "react-router-dom"
import {
  IconShieldLock,
  IconArrowLeft,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react"

import { ThemeToggle } from "@/components/theme-toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RegisterForm } from "./RegisterForm"

export function Register() {
  const features = [
    "Instant account activation",
    "Enterprise-grade security",
    "24/7 support available",
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Primary gradient background using theme colors */}
        <div className="absolute inset-0 bg-linear-to-br from-chart-2 via-primary to-chart-4" />

        {/* Secondary gradient layer for depth */}
        <div className="absolute inset-0 bg-linear-to-tr from-chart-2/60 via-transparent to-chart-5/30" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.15),transparent_50%)]" />
        </div>

        {/* Floating shapes using theme colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-chart-3/25 blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 h-96 w-96 rounded-full bg-chart-1/15 blur-3xl" />
          <div
            className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full border border-white/20" />
          <div className="absolute bottom-1/4 left-1/3 h-20 w-20 rounded-full border border-chart-3/30" />
          <div className="absolute top-3/4 right-1/3 h-16 w-16 rounded-full bg-white/5 backdrop-blur-sm" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />

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
                Join Our Platform
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Create Your
                <br />
                Account
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-md leading-relaxed">
                Join thousands of users enjoying secure, seamless access to our
                platform.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-3 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-primary-foreground/90"
                >
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
                <div className="text-sm text-primary-foreground/70">
                  Satisfaction
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">Fast</div>
                <div className="text-sm text-primary-foreground/70">
                  Setup Time
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Scaler E-Commerce Platform. All rights
            reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-linear-to-br from-background via-background to-muted/30">
        {/* Theme toggle for right side */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-115 space-y-8">
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
                Create your account
              </CardTitle>
              <CardDescription className="text-base">
                Get started with your free account today
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Registration Form */}
              <RegisterForm />
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2 pb-6">
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  )
}
