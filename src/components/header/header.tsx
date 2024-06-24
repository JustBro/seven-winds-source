import './Header.style.scss';
import { useAppDispatch, useAppSelector } from '@/store/Hooks.service';
import { setSidebarHide } from '@/store/UiSlice.service';

export const Header = () => {
  const dispatch = useAppDispatch();
  const hideSidebar = useAppSelector((state) => state.uiReducer.sidebarHide);

  const changeSidebarState = () => {
    dispatch(setSidebarHide(!hideSidebar));
  };

  return (
    <header className="header">
      <div className="header__top">
        <button className="btn">
          <i className="icon icon--menu"></i>
        </button>
        <button className="btn">
          <i className="icon icon--back"></i>
        </button>
        <button className="btn active">Просмотр</button>
        <button className="btn">Управление</button>
      </div>
      <div className="header__bottom">
        <button
          className={
            'header__spoiler-btn btn' +
            (hideSidebar ? ' header__spoiler-btn--hide' : '')
          }
          onClick={changeSidebarState}
        >
          <span>Название проекта</span>
          <span className="header__small-text">Аббревиатура</span>
          <i className="icon icon--arrow"></i>
        </button>
        <h1 className="header__title">Строительно-монтажные работы</h1>
      </div>
    </header>
  );
};
