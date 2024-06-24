import '@/App.style.scss';
import '@/styles/icons.scss';

import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Content } from '@/components/content/Content';
import { useAppDispatch } from './store/Hooks.service';
import { setEditInfo } from './store/OutlayRowsSlice.service';
import { useEffect } from 'react';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener('keydown', onCancel);

    return () => {
      document.removeEventListener('keydown', onCancel);
    };
  }, []);

  return (
    <main className="main">
      <Header />
      <Sidebar />
      <Content />
    </main>
  );

  function onCancel(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      dispatch(
        setEditInfo({
          mode: null,
          parent: null,
          editRow: null,
          lastChild: null,
          level: null,
        })
      );
    }
  }
}
