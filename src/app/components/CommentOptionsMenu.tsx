import React, { Dispatch, SetStateAction } from 'react';
import { MoreVertical, PencilIcon, TrashIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface OptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ onEdit, onDelete, setIsEditing }) => {
  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <PencilIcon className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <TrashIcon className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
