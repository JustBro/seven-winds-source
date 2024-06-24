import "./content.scss";
import { useEffect } from "react";
import { getOutlayRows } from "@/store/outlay-rows-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Row } from "@/components/row/row";
import { CreateRow } from "../create-row/create-row";

export const Content = () => {
  const rows = useAppSelector((state) => state.outlayRowsReducer.rows);
  const tableHeaders = [
    "Уровень",
    "Наименование работ",
    "Основная з/п",
    "Оборудование",
    "Накладные расходы",
    "Сметная прибыль",
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOutlayRows());
  }, []);

  return (
    <section className="content">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((title, i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Row key={row.id} row={row} />
          ))}
          {rows.length > 0 || <CreateRow />}
        </tbody>
      </table>
    </section>
  );
};
