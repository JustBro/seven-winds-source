import "@/app.style.scss";
import "@/styles/icons.scss";

import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Content } from "@/components/content/content";
import { useAppDispatch } from "./store/hooks";
import { setEditInfo } from "./store/outlay-rows-slice";
import { useEffect } from "react";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener("keydown", onCancel);

    return () => {
      document.removeEventListener("keydown", onCancel);
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
    if (evt.key === "Escape") {
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
