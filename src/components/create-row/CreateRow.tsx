import { useAppDispatch, useAppSelector } from '@/store/Hooks.service';
import { useState } from 'react';
import { OutlayRowRequest } from '@/__generated__';
import {
  Mode,
  TreeResponseStore,
  createRow,
  updateRow,
} from '@/store/OutlayRowsSlice.service';

const defaultData = ({
  rowName: '',
  salary: '0',
  equipmentCosts: '0',
  overheads: '0',
  estimatedProfit: '0',
} as unknown) as TreeResponseStore;

type Props = {
  row?: TreeResponseStore;
};

export const CreateRow = ({ row = defaultData }: Props) => {
  const editInfo = useAppSelector((state) => state.outlayRowsReducer.editInfo);
  const dispatch = useAppDispatch();

  const [fields, setFields] = useState({
    rowName: row.rowName,
    salary: String(row.salary),
    equipmentCosts: String(row.equipmentCosts),
    overheads: String(row.overheads),
    estimatedProfit: String(row.estimatedProfit),
  });

  const onSubmit = (evt: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (evt.key === 'Enter') {
      const newRow: OutlayRowRequest = {
        equipmentCosts: Number(fields.equipmentCosts),
        estimatedProfit: Number(fields.estimatedProfit),
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: Number(fields.overheads),
        parentId: editInfo.parent || undefined,
        rowName: (fields.rowName || '').trim(),
        salary: Number(fields.salary),
        supportCosts: 0,
      };

      if (editInfo.mode === Mode.Create || !row.id) {
        dispatch(createRow(newRow));
      } else {
        dispatch(
          updateRow({
            ...newRow,
            id: row.id,
            level: row.level,
            genealogy: row.genealogy,
            lineLevels: row.lineLevels,
          })
        );
      }
    }
  };
  
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setFields((fields) => ({ ...fields, [name]: value }));
  };

  return (
    <tr
      className={'table-row' + (editInfo.mode !== null ? ' table-row--edit' : '')}
      onKeyDown={onSubmit}
    >
      <td>
        <div
          className="table-row__btns"
          style={{ marginLeft: 20 * (editInfo.level || 0) + 'px' }}
        >
          <button className="btn table-row__add">
            <i className="icon icon--doc"></i>
          </button>
        </div>
      </td>
      <td>
        <input
          type="text"
          name="rowName"
          value={fields.rowName}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="salary"
          value={fields.salary}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="equipmentCosts"
          value={fields.equipmentCosts}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="overheads"
          value={fields.overheads}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="estimatedProfit"
          value={fields.estimatedProfit}
          onChange={onChange}
        />
      </td>
    </tr>
  );
};
