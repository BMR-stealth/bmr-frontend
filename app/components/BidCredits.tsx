import { Button } from "@/components/ui/button"
import { Icons } from "@/app/components/icons"
import { useRouter } from 'next/navigation'

type BidCreditsProps = {
  credits: number
}

export function BidCredits({ credits }: BidCreditsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
      <Icons.gem className="mr-2 h-5 w-5 text-blue-500 text-xs" />
      <h1 className="text-blue-1000 text-sm">{credits} CREDITS</h1>
      <Button
        variant="primary" // Changed from "secondary" to "primary" for higher prominence
        size="sm"
        className="ml-3 font-bold" // Added `font-bold` to make the text bold
        onClick={() => router.push('/buy-credits')} // Adjust the route as necessary
      >
        Buy More
      </Button>
    </div>
  )
}
