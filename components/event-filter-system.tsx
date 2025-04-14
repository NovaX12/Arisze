"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Tag, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface EventFilterSystemProps {
  categories: string[]
  timeframes: string[]
  locations: string[]
  tags: string[]
  onFilterChange: (filters: {
    searchQuery: string
    category: string
    timeframe: string
    location: string
    tags: string[]
  }) => void
  className?: string
}

export function EventFilterSystem({
  categories,
  timeframes,
  locations,
  tags,
  onFilterChange,
  className = "",
}: EventFilterSystemProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTimeframe, setSelectedTimeframe] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagsFilter, setShowTagsFilter] = useState(false)

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Update filters when any value changes
  useEffect(() => {
    onFilterChange({
      searchQuery,
      category: selectedCategory,
      timeframe: selectedTimeframe,
      location: selectedLocation,
      tags: selectedTags,
    })
  }, [searchQuery, selectedCategory, selectedTimeframe, selectedLocation, selectedTags, onFilterChange])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="When" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="Where" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags filter */}
      {tags.length > 0 && (
        <div>
          <Button
            variant="outline"
            onClick={() => setShowTagsFilter(!showTagsFilter)}
            className="mb-4 flex items-center gap-2"
          >
            <Tag className="h-4 w-4" />
            Filter by Tags
            {showTagsFilter ? (
              <ChevronRight className="h-4 w-4 rotate-90 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform" />
            )}
          </Button>

          {showTagsFilter && (
            <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-md">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagToggle(tag)}
                    className="mr-2"
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active filters display */}
      {(searchQuery ||
        selectedCategory !== "All" ||
        selectedTimeframe !== "All" ||
        selectedLocation !== "All" ||
        selectedTags.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchQuery}
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:text-destructive"
                aria-label="Clear search filter"
              >
                &times;
              </button>
            </Badge>
          )}
          {selectedCategory !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory("All")}
                className="ml-1 hover:text-destructive"
                aria-label="Clear category filter"
              >
                &times;
              </button>
            </Badge>
          )}
          {selectedTimeframe !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1">
              When: {selectedTimeframe}
              <button
                onClick={() => setSelectedTimeframe("All")}
                className="ml-1 hover:text-destructive"
                aria-label="Clear timeframe filter"
              >
                &times;
              </button>
            </Badge>
          )}
          {selectedLocation !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Where: {selectedLocation}
              <button
                onClick={() => setSelectedLocation("All")}
                className="ml-1 hover:text-destructive"
                aria-label="Clear location filter"
              >
                &times;
              </button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              Tag: {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:text-destructive"
                aria-label={`Clear ${tag} tag filter`}
              >
                &times;
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              setSelectedTimeframe("All")
              setSelectedLocation("All")
              setSelectedTags([])
            }}
            className="text-xs h-7 px-2"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
