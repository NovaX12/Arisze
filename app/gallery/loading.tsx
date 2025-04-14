import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section Skeleton */}
      <section className="relative py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-12 w-2/3 mx-auto mb-8" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto mb-10" />
            <div className="flex justify-center">
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-10 w-64" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preferences Panel Skeleton */}
            <div>
              <div className="border rounded-lg p-6 space-y-8">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-40" />
                </div>

                <div>
                  <Skeleton className="h-5 w-40 mb-4" />
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                </div>

                <Skeleton className="h-1 w-full" />

                <div>
                  <Skeleton className="h-5 w-40 mb-4" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <Skeleton className="h-1 w-full" />

                <div>
                  <Skeleton className="h-5 w-40 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-20 rounded-md" />
                    ))}
                  </div>
                </div>

                <Skeleton className="h-1 w-full" />

                <div>
                  <Skeleton className="h-5 w-40 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-6 w-full rounded-md" />
                </div>

                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>

            {/* Results Panel Skeleton */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-64" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-5">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-10 w-28" />
                        <div className="flex gap-2">
                          <Skeleton className="h-9 w-9 rounded-md" />
                          <Skeleton className="h-9 w-9 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
