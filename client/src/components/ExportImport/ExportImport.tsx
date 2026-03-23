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
        {onExport && <IconButton icon="download" onClick={onExport} />}
        {onImport && <IconButton icon="upload" onClick={onImport} />}
      </div>
    </div>
  );
};

export default ExportImport;
