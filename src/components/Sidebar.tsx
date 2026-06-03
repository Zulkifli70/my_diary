import type { View } from "../types/diary";
import {
  LuBookOpen,
  LuCalendarDays,
  LuClock3,
} from "react-icons/lu";

type SidebarProps = {
  activeView: View;
  onViewChange: (view: View) => void;
  streak: number;
  totalWords: number;
};

const navItems: Array<{
  view: View;
  label: string;
  icon: typeof LuBookOpen;
}> = [
  { view: "editor", label: "Journal", icon: LuBookOpen },
  { view: "calendar", label: "Calendar", icon: LuCalendarDays },
  { view: "timeline", label: "Timeline", icon: LuClock3 },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Quiet Moments navigation">
      <div className="sidebar-top">
        <div className="profile-block">
          <div>
            <strong>Quiet Moments</strong>
            <span>Reflecting daily</span>
          </div>
        </div>

        <button
          className="new-entry-button"
          onClick={() => onViewChange("editor")}
          type="button"
        >
          Write a Page
        </button>
      </div>

      <nav className="nav-tabs" aria-label="Primary">
        {navItems.map(({ view, label, icon: Icon }) => (
          <button
            className={activeView === view ? "active" : ""}
            key={view}
            onClick={() => onViewChange(view)}
            type="button"
          >
            <Icon aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
