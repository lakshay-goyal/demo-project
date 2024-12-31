import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  from: string
  to: string
  onSelect: (range: { from: string; to: string }) => void
}

export function DateRangePicker({ from, to, onSelect }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {from && to ? `${from} - ${to}` : 'Pick a date range'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: from ? new Date(from) : undefined, to: to ? new Date(to) : undefined }}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              onSelect({
                from: range.from.toISOString().split('T')[0],
                to: range.to.toISOString().split('T')[0]
              })
              setIsOpen(false)
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

