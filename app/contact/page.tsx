"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, Send, CheckCircle, Check, X } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// FAQ data
const faqs = [
  {
    question: "How quickly can I expect a response to my inquiry?",
    answer:
      "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate this in your subject line.",
  },
  {
    question: "Can I request a feature for the Arisze platform?",
    answer:
      "We love hearing from our users. You can submit feature requests through this contact form or directly email our product team at product@arisze.com.",
  },
  {
    question: "How do I report a technical issue or bug?",
    answer:
      "For technical issues, please provide as much detail as possible including the device you're using, browser version, and steps to reproduce the issue. Screenshots are also very helpful.",
  },
  {
    question: "Is there a phone number I can call for immediate assistance?",
    answer:
      "While email is our primary support channel, you can reach our support team by phone during business hours (9 AM - 5 PM EST) at +1-800-555-1234.",
  },
]

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  // Formspree integration
  const [state, handleSubmit] = useForm("myzeorjq")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isValid, setIsValid] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return !value.trim() ? "Please enter your name" : undefined
      case "email":
        if (!value.trim()) return "Please enter your email address"
        if (!validateEmail(value)) return "Please enter a valid email address"
        return undefined
      case "subject":
        if (!value.trim()) return "Please enter a subject"
        if (value.length > 100) return "Subject cannot exceed 100 characters"
        return undefined
      case "message":
        if (!value.trim()) return "Please enter your message"
        if (value.length > 999) return "Message cannot exceed 999 characters"
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isFormValid = true

    // Validate each field
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value)
      if (error) {
        newErrors[name as keyof FormErrors] = error
        isFormValid = false
      }
    })

    setErrors(newErrors)
    return isFormValid
  }

  useEffect(() => {
    if (isMounted) {
      const newErrors: FormErrors = {}
      let isFormValid = true

      // Only validate touched fields
      Object.entries(formData).forEach(([name, value]) => {
        if (touched[name]) {
          const error = validateField(name, value)
          if (error) {
            newErrors[name as keyof FormErrors] = error
            isFormValid = false
          }
        }
      })

      // Check if all fields are filled and valid
      const allFieldsFilled = Object.entries(formData).every(([name, value]) => {
        return value.trim() !== "" && !validateField(name, value)
      })

      setErrors(newErrors)
      setIsValid(isFormValid && allFieldsFilled)
    }
  }, [formData, touched, isMounted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // For subject and message, enforce character limits
    if (name === "subject" && value.length > 100) {
      return
    }

    if (name === "message" && value.length > 999) {
      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })

    // Mark field as touched
    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true,
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target

    setTouched({
      ...touched,
      [name]: true,
    })
  }

  const getFieldStatus = (name: keyof FormData) => {
    if (!touched[name]) return "default"
    return errors[name] ? "error" : "success"
  }

  if (state.succeeded) {
    return (
      <div className="flex flex-col w-full">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-20"></div>
          <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Message <span className="gradient-text">Sent!</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Thank you for reaching out! Your message has been sent successfully. We'll get back to you as soon as
                possible.
              </p>
              <Button
                size="lg"
                className="mt-8 group relative overflow-hidden"
                onClick={() => (window.location.href = "/")}
              >
                <span className="relative z-10">Return to Home</span>
                <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient and animated elements */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-20"></div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-arisze-blue/20 dark:bg-arisze-blue/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                x: [0, Math.random() * 30 - 15],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl font-medium gradient-text mb-6">We're Here to Help – Reach Out to Arisze</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Have questions, feedback, or need assistance? Our team is ready to help you make the most of your Arisze
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        Name <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            getFieldStatus("name") === "error"
                              ? "border-red-500 focus-visible:ring-red-500"
                              : getFieldStatus("name") === "success"
                                ? "border-green-500 focus-visible:ring-green-500"
                                : ""
                          }`}
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          required
                        />
                        {getFieldStatus("name") === "success" && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                        {getFieldStatus("name") === "error" && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.name && touched.name && (
                        <p id="name-error" className="text-sm text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        Email <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            getFieldStatus("email") === "error"
                              ? "border-red-500 focus-visible:ring-red-500"
                              : getFieldStatus("email") === "success"
                                ? "border-green-500 focus-visible:ring-green-500"
                                : ""
                          }`}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          required
                        />
                        {getFieldStatus("email") === "success" && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                        {getFieldStatus("email") === "error" && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.email && touched.email && (
                        <p id="email-error" className="text-sm text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="flex items-center justify-between">
                        <span className="flex items-center">
                          Subject <span className="text-red-500 ml-1">*</span>
                        </span>
                        <span
                          className={`text-xs ${formData.subject.length > 90 ? "text-amber-500" : "text-muted-foreground"}`}
                        >
                          {formData.subject.length}/100
                        </span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            getFieldStatus("subject") === "error"
                              ? "border-red-500 focus-visible:ring-red-500"
                              : getFieldStatus("subject") === "success"
                                ? "border-green-500 focus-visible:ring-green-500"
                                : ""
                          }`}
                          aria-invalid={errors.subject ? "true" : "false"}
                          aria-describedby={errors.subject ? "subject-error" : undefined}
                          maxLength={100}
                          required
                        />
                        {getFieldStatus("subject") === "success" && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                        {getFieldStatus("subject") === "error" && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.subject && touched.subject && (
                        <p id="subject-error" className="text-sm text-red-500 mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center justify-between">
                        <span className="flex items-center">
                          Message <span className="text-red-500 ml-1">*</span>
                        </span>
                        <span
                          className={`text-xs ${formData.message.length > 900 ? "text-amber-500" : "text-muted-foreground"}`}
                        >
                          {formData.message.length}/999
                        </span>
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            getFieldStatus("message") === "error"
                              ? "border-red-500 focus-visible:ring-red-500"
                              : getFieldStatus("message") === "success"
                                ? "border-green-500 focus-visible:ring-green-500"
                                : ""
                          }`}
                          aria-invalid={errors.message ? "true" : "false"}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          maxLength={999}
                          required
                        />
                        {getFieldStatus("message") === "success" && (
                          <div className="absolute right-3 top-4">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                        {getFieldStatus("message") === "error" && (
                          <div className="absolute right-3 top-4">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.message && touched.message && (
                        <p id="message-error" className="text-sm text-red-500 mt-1">
                          {errors.message}
                        </p>
                      )}
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>

                    <Button
                      type="submit"
                      className="w-full group relative overflow-hidden"
                      disabled={state.submitting || !isValid}
                    >
                      <span className="relative z-10 flex items-center">
                        {state.submitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-arisze-blue to-arisze-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info and Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeIn}>
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us through any of these channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">kathanchauhan22@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">+1-800-555-1234</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">
                          123 Innovation Way
                          <br />
                          Tech District
                          <br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="border border-border/50 overflow-hidden">
                  <div className="h-64 bg-muted relative">
                    <img
                      src="/placeholder.svg?height=300&width=600&text=Map+View"
                      alt="Office location map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-primary animate-pulse">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about contacting our team.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
