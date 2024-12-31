import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Select({ options, value, onChange, placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {value || placeholder || 'Select an option'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-2">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

