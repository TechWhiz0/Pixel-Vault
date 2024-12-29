import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ChartLine, Pen, PenBox, Trash } from 'lucide-react'

function ProductEditableOption({children}) {
  return (
    <Popover>
    <PopoverTrigger>
       {children}
    </PopoverTrigger>
    <PopoverContent>
        <ul>
            <li className='flex gap-2 hover:bg-slate-100 p-2 cursor-pointer rounded-md' ><PenBox/>Edit</li>
            <li className='flex gap-2 hover:bg-slate-100 p-2 cursor-pointer rounded-md' ><ChartLine/>Analytics</li>
            <li className='flex gap-2 hover:bg-slate-100 p-2 cursor-pointer rounded-md text-red-600' ><Trash/>Delete</li>
        </ul>
    </PopoverContent>
  </Popover>
  )
}

export default ProductEditableOption