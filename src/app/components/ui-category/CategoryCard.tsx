export default function CategoryCard(category: { title: string }) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-yellow-200 p-4 flex items-center justify-center">
        <span className="text-xl font-semibold text-zinc-700">
          {category.title}
        </span>
      </div>
      <ul className="divide-y divide-zinc-300">
        <li className="p-4 text-zinc-800 hover:bg-zinc-100 cursor-pointer">
          Animal Health
        </li>
        <li className="p-4 text-zinc-800 hover:bg-zinc-100 cursor-pointer">
          Animal Parks & Zoo
        </li>
        <li className="p-4 text-zinc-800 hover:bg-zinc-100 cursor-pointer">
          Cats & Dogs
        </li>
        <li className="p-4 text-zinc-800 hover:bg-zinc-100 cursor-pointer">
          Horses & Riding
        </li>
        <li className="p-4 text-zinc-800 hover:bg-zinc-100 cursor-pointer">
          Pet Services
        </li>
        <li className="p-4 text-zinc-800 hover:bg-zinc-100 cursor-pointer">
          Pet Stores
        </li>
      </ul>
    </div>
  );
}
