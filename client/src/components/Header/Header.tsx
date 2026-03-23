import { Link } from "react-router";
import mainLogo from "../../assets/decent-retro-tool-logo.png";
import IconButton from "../Buttons/IconButton/IconButton";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import "./Header.css";
import Breadcrumbs, {
  type BreadcrumbFragment,
} from "../Breadcrumbs/Breadcrumbs";
import SortMenu, { type SortMenuProps } from "../SortMenu/SortMenu";

export type HeaderProps = {
  onEdit?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onMarkdown?: () => void;
  sortConfig?: SortMenuProps;
} & (
  | {
      breadcrumbs: BreadcrumbFragment[];
      onEntityRename: (newTitle: string) => void;
    }
  | {
      breadcrumbs?: never;
      onEntityRename?: never;
    }
);

const Header = ({
  breadcrumbs,
  onEdit,
  onEntityRename,
  onImport,
  onExport,
  onMarkdown,
  sortConfig,
}: HeaderProps) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/home">
          <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
        </Link>
      </div>
      {breadcrumbs && (
        <Breadcrumbs parts={breadcrumbs} onEdit={onEntityRename} />
      )}
      <div className="menu-buttons">
        {sortConfig && <SortMenu {...sortConfig} />}
        {onEdit && <IconButton icon="edit" onClick={onEdit} />}
        {onMarkdown && <IconButton icon="markdown" onClick={onMarkdown} />}
        <SettingsMenu onImport={onImport} onExport={onExport} />
      </div>
    </div>
  );
};

export default Header;
