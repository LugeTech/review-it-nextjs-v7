import { Button } from "@/components/ui/button";

interface ThumbsUpButtonProps {
  onClick: () => void;
  count: number;
}

export function ThumbsUpButton({ onClick, count }: ThumbsUpButtonProps) {
  return (
    <Button
      className="flex items-center space-x-1"
      size="sm"
      variant="ghost"
      onClick={onClick}
    >
      <div className="flex items-center space-x-1">
        <ThumbsUpIcon className="w-4 h-4" />
        <span className="font-semibold">Like</span>
      </div>
      <span className="text-sm font-medium text-gray-500">{count}</span>
    </Button>
  );
}

function ThumbsUpIcon(props: any) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}
