import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconUser,
  IconAlertCircle,
  IconCircleCheck,
  IconX,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useRegisterMutation } from "../authApi"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

// API Error Response type
interface ApiErrorResponse {
  message: string
  validationErrors?: Record<string, string>
  timestamp?: string
}



// Zod validation schema
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>


export function RegisterForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const [register, { isLoading, error, reset: resetMutation, isSuccess, isError }] =
    useRegisterMutation()

  const apiError = (error as FetchBaseQueryError & { data: ApiErrorResponse })?.data

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  })

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessAlert(true)
      setShowErrorAlert(false)
      form.reset()
      
      // Navigate to login after 2 seconds
      const timer = setTimeout(() => {
        navigate("/login")
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isSuccess, form, navigate])

  // Handle error state
  useEffect(() => {
    if (isError && error) {
      setShowErrorAlert(true)
      setShowSuccessAlert(false)
      
      // Set field-specific validation errors from API
      if (apiError?.validationErrors) {
        Object.entries(apiError.validationErrors).forEach(([field, message]) => {
          if (field in form.getValues()) {
            form.setError(field as keyof RegisterFormValues, {
              type: "server",
              message: String(message),
            })
          }
        })
      }
      
      // Auto-dismiss error alert after 5 seconds
      const timer = setTimeout(() => {
        setShowErrorAlert(false)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [isError, error, apiError, form])

  const dismissAlerts = () => {
    setShowSuccessAlert(false)
    setShowErrorAlert(false)
    resetMutation()
  }

  const password = form.watch("password")

  const passwordRequirements = [
    {
      text: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      text: "One uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      text: "One lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      text: "One number",
      met: /\d/.test(password),
    },
  ]

  const handleSubmit = async (data: RegisterFormValues) => {
    // Clear previous alerts
    setShowSuccessAlert(false)
    setShowErrorAlert(false)
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...payload } = data
    await register(payload)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5" noValidate>
        {/* Success Alert */}
        {showSuccessAlert && (
          <Alert variant="success" className="relative animate-fade-in-down">
            <IconCircleCheck className="h-4 w-4 animate-check-bounce" />
            <AlertTitle>Registration Successful!</AlertTitle>
            <AlertDescription>
              Your account has been created successfully. Redirecting to login...
            </AlertDescription>
            <button
              type="button"
              onClick={dismissAlerts}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50 transition-colors"
              aria-label="Dismiss"
            >
              <IconX className="h-4 w-4" />
            </button>
          </Alert>
        )}

        {/* Error Alert */}
        {showErrorAlert && apiError && (
          <Alert variant="destructive" className="relative animate-fade-in-down">
            <IconAlertCircle className="h-4 w-4" />
            <AlertTitle>Registration Failed</AlertTitle>
            <AlertDescription>
              {apiError.message || "An error occurred during registration. Please try again."}
              {apiError.validationErrors && Object.keys(apiError.validationErrors).length > 0 && (
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {Object.entries(apiError.validationErrors).map(([field, message]) => (
                    <li key={field} className="text-xs">
                      <span className="font-medium capitalize">{field}</span>: {String(message)}
                    </li>
                  ))}
                </ul>
              )}
            </AlertDescription>
            <button
              type="button"
              onClick={dismissAlerts}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-destructive/20 transition-colors"
              aria-label="Dismiss"
            >
              <IconX className="h-4 w-4" />
            </button>
          </Alert>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <IconUser className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="name"
                    placeholder="John Doe"
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <IconMail className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <IconLock className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    aria-invalid={!!fieldState.error}
                    {...field}
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
              </FormControl>
              <FormMessage />

              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1.5">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                          req.met
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <IconCheck className="h-2.5 w-2.5" />
                      </div>
                      <span
                        className={
                          req.met ? "text-primary" : "text-muted-foreground"
                        }
                      >
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <IconLock className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      type="button"
                    >
                      {showConfirmPassword ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 font-semibold text-base mt-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          disabled={isLoading || showSuccessAlert}
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
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  )
}
