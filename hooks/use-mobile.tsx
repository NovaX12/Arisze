"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  // Initialize with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // Set initial value after component mounts
    setIsMobile(window.innerWidth < 768)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Return false as default during SSR
  return isMobile === null ? false : isMobile
}
