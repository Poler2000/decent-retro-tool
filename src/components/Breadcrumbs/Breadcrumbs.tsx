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
  const { parts } = props;
  return (
    <div className="breadcrumbs">
      {parts.map((part, index) => (
        <>
          <span> / </span>
          <a href={part.link} key={index}>
            {part.text}
          </a>
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
