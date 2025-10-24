import Dropdown from "../Dropdown/Dropdown";
import ExportImport from "../ExportImport/ExportImport";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export interface SettingsMenuProps {
  onImport?: () => void;
  onExport?: () => void;
}

const SettingsMenu = (props: SettingsMenuProps) => {
  const { onImport, onExport } = props;

  return (
    <Dropdown icon="menu">
      <ThemeSwitcher />
      <hr />
      {onExport || onImport ? (
        <>
          <ExportImport onImport={onImport} onExport={onExport} />
          <hr />
        </>
      ) : null}
      <a href="https://github.com/Poler2000/decent-retro-tool">Github</a>
    </Dropdown>
  );
};

export default SettingsMenu;
