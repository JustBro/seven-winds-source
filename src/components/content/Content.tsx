import './Content.style.scss';
import { useEffect } from 'react';
import { getOutlayRows } from '@/store/OutlayRowsSlice.service';
import { useAppDispatch, useAppSelector } from '@/store/Hooks.service';
import { Row } from '../row/Row';
import { CreateRow } from '../create-row/CreateRow';
import { TreeResponseStore } from '@/types/OutlayRowsSlice.types';

const tableHeaders = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
];

export const Content = () => {
  const rows = useAppSelector((state) => state.outlayRowsReducer.rows);
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
          {rows.map((row: TreeResponseStore) => (
            <Row key={row.id} row={row} />
          ))}

          {rows.length > 0 || <CreateRow />}
        </tbody>
      </table>
    </section>
  );
};
