"use client"

import { createContext, useState, useCallback, type ReactNode } from "react"

type BackgroundAnimationContextType = {
  animationKey: number
  triggerAnimation: () => void
}

export const BackgroundAnimationContext = createContext<BackgroundAnimationContextType>({
  animationKey: 0,
  triggerAnimation: () => {},
})

export function BackgroundAnimationProvider({ children }: { children: ReactNode }) {
  const [animationKey, setAnimationKey] = useState(0)

  const triggerAnimation = useCallback(() => {
    setAnimationKey((prev) => prev + 1)
  }, [])

  return (
    <BackgroundAnimationContext.Provider value={{ animationKey, triggerAnimation }}>
      {children}
    </BackgroundAnimationContext.Provider>
  )
}
