import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function strAddr(addr) {
  return addr.substring(0,4) + "..." + addr.substring(addr.length - 4)
}