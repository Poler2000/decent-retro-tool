import { Link } from "react-router";
import mainLogo from "../../assets/decent-retro-tool-logo.png";
import IconButton from "../Buttons/IconButton/IconButton";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import "./Header.css";
import Breadcrumbs, {
  type BreadcrumbFragment,
} from "../Breadcrumbs/Breadcrumbs";
import SortMenu, { type SortMenuProps } from "../SortMenu/SortMenu";

export interface HeaderProps {
  breadcrumbs?: BreadcrumbFragment[];
  onEdit?: () => void;
  onEntityRename?: (newTitle: string) => void;
  onImport?: () => void;
  onExport?: () => void;
  sortConfig?: SortMenuProps;
}

const Header = (props: HeaderProps) => {
  const {
    breadcrumbs,
    onEdit,
    onEntityRename,
    onImport,
    onExport,
    sortConfig,
  } = props;

  return (
    <div className="header">
      <div>
        <Link to="/home">
          <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
        </Link>
      </div>
      {breadcrumbs && (
        <Breadcrumbs parts={breadcrumbs} onEdit={onEntityRename!} />
      )}
      <div className="menu-buttons">
        {sortConfig && <SortMenu {...sortConfig} />}
        {onEdit && (
          <IconButton
            icon="edit"
            onClick={onEdit}
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
          />
        )}
        <SettingsMenu onImport={onImport} onExport={onExport} />
      </div>
    </div>
  );
};

export default Header;
