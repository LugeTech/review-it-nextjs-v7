import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

interface EditorComponentProps {
  onEditorValue: (value: string) => void;
}

const content = "";

export default function Editor({ onEditorValue }: EditorComponentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({
        placeholder: "What did you like or dislike? Be helpful and respectful",
      }),
    ],
    content,
    // triggered on every change
    onUpdate: ({ editor }) => {
      const htmlEditorContent = editor.getHTML();
      // console.log(htmlEditorContent);
      onEditorValue(htmlEditorContent);
    },
  });
  return (
    <div>
      <RichTextEditor editor={editor} >
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}
