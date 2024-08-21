interface iTagViewProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

const TagView = ({ tag, isSelected, onClick }: iTagViewProps) => {
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer hover:bg-myTheme-primary hover:text-myTheme-dark rounded-md px-2 py-1 ${
        isSelected ? "bg-myTheme-primary text-myTheme-dark" : ""
      }`}
      onClick={onClick}
    >
      <input
        type="checkbox"
        checked={isSelected}
        value={tag}
        className="w-4 h-4"
        readOnly
      />
      <span>{tag}</span>
    </div>
  );
};

export default TagView;
