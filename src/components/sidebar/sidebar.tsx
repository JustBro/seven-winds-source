import { useAppSelector } from '@/store/Hooks.service';
import './Sidebar.style.scss';

const items = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложение',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
];

export const Sidebar = () => {
  const hideSidebar = useAppSelector((state) => state.uiReducer.sidebarHide);

  return (
    <nav className={'sidebar' + (hideSidebar ? ' sidebar--hide' : '')}>
      <ul>
        {items.map((item, i) => (
          <li className={item === 'СМР' ? 'active' : ''} key={i}>
            <i className="icon icon--item"></i>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};
