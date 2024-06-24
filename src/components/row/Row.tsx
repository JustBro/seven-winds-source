import './Row.style.scss';
import { deleteRow } from '@/store/OutlayRowsSlice.service';
import { useAppDispatch, useAppSelector } from '@/store/Hooks.service';
import { CreateRow } from '@/components/create-row/CreateRow';
import {
  Mode,
  TreeResponseStore,
  setEditInfo,
} from '@/store/OutlayRowsSlice.service';

type Props = {
  row: TreeResponseStore;
};

export const Row = ({ row }: Props) => {
  const dispatch = useAppDispatch();

  const rows = useAppSelector((state) => state.outlayRowsReducer.rows);
  const editInfo = useAppSelector((state) => state.outlayRowsReducer.editInfo);

  const isEdit = editInfo.mode !== null;

  const onDelete = () => {
    dispatch(deleteRow(row.id!));
  };

  const onAdd = () => {
    if (editInfo.mode === Mode.Edit || !row.id) return;

    const newEditInfo = { ...editInfo };

    newEditInfo.mode = Mode.Create;
    newEditInfo.parent = row.id;
    newEditInfo.lastChild = findLastChild(row.id);
    newEditInfo.level = row.level + 1;

    dispatch(setEditInfo(newEditInfo));
  };

  const onEdit = () => {
    if (!row.id) return;

    const newEditInfo = { ...editInfo };

    newEditInfo.mode = Mode.Edit;
    newEditInfo.editRow = row.id;
    newEditInfo.level = row.level;
    newEditInfo.parent = row.parentId;

    dispatch(setEditInfo(newEditInfo));
  };

  const findLastChild = (parentId: number): number => {
    const childs = rows.filter(
      (row: TreeResponseStore) => row.parentId === parentId
    );

    if (childs.length > 0) {
      return findLastChild(childs[childs.length - 1].id!);
    }

    return parentId;
  };

  return (
    <>
      {editInfo.editRow !== row.id && (
        <tr
          className={'row' + (isEdit ? ' row--edit' : '')}
          onDoubleClick={onEdit}
        >
          <td>
            <div
              className="row__btns"
              style={{ marginLeft: 20 * row.level + 'px' }}
            >
              <button className="btn row__add" title="Добавить" onClick={onAdd}>
                <i className="icon icon--doc"></i>
                {row.genealogy.isLastChild && (
                  <div className="row__branch row__branch--last-child"></div>
                )}
              </button>

              {!isEdit && (
                <button
                  className="btn row__delete"
                  title="Удалить"
                  onClick={onDelete}
                >
                  <i className="icon icon--trash"></i>
                </button>
              )}
            </div>

            {row.lineLevels.map((level) => (
              <div
                className="row__branch row__branch--level"
                style={{
                  left: level * 20 + 4 + 'px',
                }}
                key={(row.id || 0) + Math.random()}
              ></div>
            ))}

            {row.genealogy.isLastChild || (
              <div
                className="row__branch row__branch--child"
                style={{
                  left: row.level * 20 + 4 + 'px',
                }}
              ></div>
            )}

            {row.genealogy.haveСhildren && (
              <div
                className="row__branch row__branch--have-children"
                style={{
                  left: row.level * 20 + 24 + 'px',
                }}
              ></div>
            )}
          </td>
          <td>{row.rowName}</td>
          <td>{row.salary}</td>
          <td>{row.equipmentCosts}</td>
          <td>{row.overheads}</td>
          <td>{row.estimatedProfit}</td>
        </tr>
      )}

      {(editInfo.lastChild === row.id || editInfo.editRow === row.id) && (
        <CreateRow row={editInfo.mode === Mode.Edit ? row : undefined} />
      )}
    </>
  );
};
