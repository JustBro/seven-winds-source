import { useAppSelector } from "@/store/hooks";
import "./sidebar.scss";

export const Sidebar = () => {
  const hideSidebar = useAppSelector((state) => state.uiReducer.sidebarHide);

  const items = [
    "По проекту",
    "Объекты",
    "РД",
    "МТО",
    "СМР",
    "График",
    "МиМ",
    "Рабочие",
    "Капвложение",
    "Бюджет",
    "Финансирование",
    "Панорамы",
    "Камеры",
    "Поручения",
    "Контрагенты",
  ];

  return (
    <nav className={"sidebar" + (hideSidebar ? " sidebar--hide" : "")}>
      <ul>
        {items.map((item, i) => (
          <li className={item === "СМР" ? "active" : ""} key={i}>
            <i className="icon icon--item"></i>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};
