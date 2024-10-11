interface iTagViewProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
  count: number;
}

const TagView = ({
  tag,
  onClick,
  isSelected,
  count,
}: {
  tag: string;
  onClick: () => void;
  isSelected: boolean;
  count: number;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
        isSelected
          ? "bg-myTheme-primary text-myTheme-dark"
          : "bg-myTheme-secondary text-myTheme-dark hover:bg-myTheme-primary"
      }`}
    >
      <span className="text-xs sm:text-base break-all overflow-hidden">
        {tag} {isSelected && count > 0 ? `(${count})` : ""}
      </span>
    </button>
  );
};

export default TagView;
