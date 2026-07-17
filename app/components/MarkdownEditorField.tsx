"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditorField({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div data-color-mode='light'>
      <MDEditor
        value={value}
        onChange={(v) => setValue(v || "")}
        height={300}
      />
      {/* Hidden input so this value submits with the surrounding <form> */}
      <input type='hidden' name={name} value={value} />
    </div>
  );
}
