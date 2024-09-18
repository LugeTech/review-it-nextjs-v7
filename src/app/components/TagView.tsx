interface iTagViewProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
  count: number;
}

const TagView = ({ tag, isSelected, count, onClick }: iTagViewProps) => {
  return (
    <div
      className={`flex items-start gap-2 cursor-pointer hover:bg-myTheme-primary hover:text-myTheme-dark rounded-md p-2 max-w-full ${
        isSelected ? "bg-myTheme-primary text-myTheme-dark" : ""
      }`}
      onClick={onClick}
    >
      <input
        type="checkbox"
        checked={isSelected}
        value={tag}
        className="flex-shrink-0 w-4 h-4 mt-0.5"
        readOnly
      />
      <span className="text-xs sm:text-base break-all overflow-hidden">
        {tag} {count > 0 ? `(${count})` : ""}
      </span>
    </div>
  );
};

export default TagView;
