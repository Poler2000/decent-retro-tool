import { Link } from "react-router";
import mainLogo from "../../assets/decent-retro-tool-logo.png";
import IconButton from "../Buttons/IconButton/IconButton";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import "./Header.css";
import Breadcrumbs, {
  type BreadcrumbFragment,
} from "../Breadcrumbs/Breadcrumbs";

export interface HeaderProps {
  breadcrumbs?: BreadcrumbFragment[];
  onEdit?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onSort?: () => void;
}

const Header = (props: HeaderProps) => {
  const { breadcrumbs, onEdit, onImport, onExport, onSort } = props;

  return (
    <div className="header">
      <div>
        <Link to="/home">
          <img src={mainLogo} className="logo" alt="Decent Retro Tool logo" />
        </Link>
      </div>
      {breadcrumbs && <Breadcrumbs parts={breadcrumbs} />}
      <div className="menu-buttons">
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
        {onSort && (
          <IconButton
            icon="sort"
            onClick={onSort}
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
