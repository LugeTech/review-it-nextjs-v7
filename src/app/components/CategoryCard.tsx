export default function Component() {
  return (
    <div className="max-w-sm rounded-lg bg-yellow-100 p-6">
      <div className="flex flex-col items-center space-y-4">
        <PawPrintIcon className="text-yellow-600 h-8 w-8" />
        <h2 className="text-xl font-semibold">Animals & Pets</h2>
        <div className="w-full border-t border-gray-300" />
        <ul className="w-full space-y-3">
          <li className="text-lg">Animal Health</li>
          <div className="w-full border-t border-gray-300" />
          <li className="text-lg">Animal Parks & Zoo</li>
          <div className="w-full border-t border-gray-300" />
          <li className="text-lg">Cats & Dogs</li>
          <div className="w-full border-t border-gray-300" />
          <li className="text-lg">Horses & Riding</li>
          <div className="w-full border-t border-gray-300" />
          <li className="text-lg">Pet Services</li>
          <div className="w-full border-t border-gray-300" />
          <li className="text-lg">Pet Stores</li>
        </ul>
      </div>
    </div>
  );
}

function PawPrintIcon(props: any) {
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
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}
