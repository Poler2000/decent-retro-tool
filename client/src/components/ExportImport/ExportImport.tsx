import IconButton from "../Buttons/IconButton/IconButton";
import "./ExportImport.css";

export interface ExportImportProps {
  onImport?: () => void;
  onExport?: () => void;
}

const ExportImport = (props: ExportImportProps) => {
  const { onImport, onExport } = props;

  return (
    <div className="export-import-container">
      <span>Export / Import:</span>
      <div className="export-import-buttons">
        {onExport && (
          <IconButton
            icon="download"
            onClick={() => {
              onExport();
            }}
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
          />
        )}
        {onImport && (
          <IconButton
            icon="upload"
            onClick={onImport}
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ExportImport;
