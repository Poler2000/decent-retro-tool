import { useState } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import "./Breadcrumbs.css";

export interface BreadcrumbFragment {
  link: string;
  text: string;
}

export interface BreadcrumbsProps {
  parts: BreadcrumbFragment[];
  onEdit(newTitle: string): void;
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { parts, onEdit } = props;

  const [isEditing, setIsEditing] = useState(false);
  const partsCount = parts.length;

  const renderPart = (part: BreadcrumbFragment, index: number) => (
    <>
      <span> / </span>
      <a href={part.link} key={index}>
        {part.text}
      </a>
    </>
  );

  return (
    <div className="breadcrumbs">
      {isEditing ? (
        <>
          {parts
            .slice(0, partsCount - 1)
            .map((part, index) => renderPart(part, index))}
          <span> / </span>
          <input
            className="breadcrumb-title-input"
            type="text"
            defaultValue={parts[partsCount - 1].text}
            onBlur={(event) => {
              setIsEditing(false);
              onEdit(event.target.value);
            }}
            autoFocus={true}
            maxLength={20}
          />
        </>
      ) : (
        parts.map((part, index) => renderPart(part, index))
      )}
      <IconButton
        additionalClass="title-edit-button"
        icon="edit"
        onClick={() => setIsEditing(!isEditing)}
        colors={{
          background: "var(--primary-background-colour)",
          text: "var(--primary-text-colour)",
        }}
      />
    </div>
  );
};

export default Breadcrumbs;
