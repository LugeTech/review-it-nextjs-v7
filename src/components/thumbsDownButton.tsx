import { Button } from "@/components/ui/button";


interface ThumbsDownButtonProps {
  onClick: () => void;
  count: number;
}

export function ThumbsDownButton({ onClick, count }: ThumbsDownButtonProps) {
  return (
    <Button
      className="flex items-center space-x-1"
      size="sm"
      variant="ghost"
      onClick={onClick}
    >
      <div className="flex items-center space-x-1">
        <ThumbsDownIcon className="w-4 h-4" />
        <span className="font-semibold">Dislike</span>
      </div>
      <span className="text-sm font-medium text-gray-500">{count}</span>
    </Button>
  );
}

function ThumbsDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  )
}
