import { Link } from "react-router-dom"
import {
  IconShieldLock,
  IconUsers,
  IconKey,
  IconDevices,
  IconArrowRight,
  IconBrandGithub,
  IconLock,
  IconFingerprint,
} from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: IconShieldLock,
    title: "OAuth 2.0 & OpenID Connect",
    description:
      "Industry-standard protocols for secure authorization and authentication flows.",
  },
  {
    icon: IconUsers,
    title: "User Management",
    description:
      "Complete user lifecycle management with roles, permissions, and profile handling.",
  },
  {
    icon: IconKey,
    title: "Token Management",
    description:
      "Secure JWT access tokens, refresh tokens, and configurable token lifetimes.",
  },
  {
    icon: IconDevices,
    title: "Multi-Client Support",
    description:
      "Register and manage multiple client applications with different grant types.",
  },
  {
    icon: IconLock,
    title: "Secure by Default",
    description:
      "PKCE support, secure password hashing, and protection against common vulnerabilities.",
  },
  {
    icon: IconFingerprint,
    title: "Session Management",
    description:
      "Track and manage user sessions with the ability to revoke access anytime.",
  },
]

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <IconShieldLock className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">SecureGate</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <IconBrandGithub className="h-4 w-4" />
              GitHub
            </a>
            <ThemeToggle />
            <Link to="/login" className={cn(buttonVariants())}>
              Sign In
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-chart-2/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <IconShieldLock className="h-4 w-4" />
              Enterprise-Grade Security
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Secure Authentication for{" "}
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Modern Applications
              </span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              A powerful, scalable OAuth 2.0 authorization server built with
              Spring Boot. Manage users, clients, and tokens with ease.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/login" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for authentication
            </h2>
            <p className="text-lg text-muted-foreground">
              Built with security best practices and designed for developer
              experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition-all hover:ring-primary/50 hover:ring-2"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Ready to secure your application?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Sign in to access the dashboard and manage your authentication
            settings.
          </p>
          <Link to="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Sign In to Dashboard
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <IconShieldLock className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-medium">SecureGate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scaler E-Commerce Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
