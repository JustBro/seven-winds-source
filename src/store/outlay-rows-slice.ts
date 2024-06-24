import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import {
  OutlayRowRequest,
  RecalculatedRows,
  TreeResponse,
} from "@/__generated__";

export type TreeResponseStore = TreeResponse & {
  level: number;
  parentId: number;
  genealogy: Genealogy;
  lineLevels: number[];
};
export type OutlayRowRequestPost = OutlayRowRequest & {
  id: number;
  level: number;
  genealogy: Genealogy;
  lineLevels: number[];
};
type Genealogy = {
  haveСhildren: boolean;
  isLastChild: boolean;
  number: number;
};

export enum Mode {
  Edit,
  Create,
}

type EditInfo = {
  mode: Mode | null;
  parent: number | null;
  editRow: number | null;
  lastChild: number | null;
  level: number | null;
};

type InitialState = {
  rows: TreeResponseStore[];
  editInfo: EditInfo;
};

const initialState: InitialState = {
  rows: [],
  editInfo: {
    mode: null,
    parent: null,
    editRow: null,
    lastChild: null,
    level: null,
  },
};

export const getOutlayRows = createAsyncThunk(
  "outlayRows/getOutlayRows",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api("/list");

      if (!response.ok) {
        throw new Error(
          "Статус запроса на получение списка строк : " + response.status
        );
      }

      return getRowsLayout(await response.json(), 0);
    } catch (error) {
      return rejectWithValue("Не удалось получить список строк");
    }
  }
);
export const deleteRow = createAsyncThunk(
  "outlayRows/deleteRow",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api(`/${id}/delete`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(
          "Статус запроса на удаление строки : " + response.status
        );
      }

      return id;
    } catch (error) {
      return rejectWithValue("Не удалось удалить строку");
    }
  }
);
export const createRow = createAsyncThunk(
  "outlayRows/createRow",
  async (newRow: OutlayRowRequest, { rejectWithValue }) => {
    try {
      const response = await api("/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      if (!response.ok) {
        throw new Error(
          "Статус запроса на создание строки : " + response.status
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Не удалось создать строку");
    }
  }
);
export const updateRow = createAsyncThunk(
  "outlayRows/updateRow",
  async (newRow: OutlayRowRequestPost, { rejectWithValue }) => {
    try {
      const { id, level, genealogy, lineLevels, ...body } = newRow;

      const response = await api(`/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          "Статус запроса на обновление строки : " + response.status
        );
      }

      const json: RecalculatedRows = await response.json();

      return { ...newRow, ...json.current } as TreeResponseStore;
    } catch (error) {
      return rejectWithValue("Не удалось обновить строку");
    }
  }
);

function getRowsLayout(
  rows: TreeResponse[],
  level: number,
  parentId: number = 0
): TreeResponseStore[] {
  const newRows: TreeResponseStore[] = [];

  rows.forEach((row, i) => {
    const newRow: TreeResponseStore = {
      ...row,
      level: level,
      parentId: parentId,
      genealogy: {
        haveСhildren: false,
        isLastChild: false,
        number: i + 1,
      },
      lineLevels: [],
    };

    if ((newRow.child || []).length > 0) {
      newRow.genealogy.haveСhildren = true;
    }
    if (i === rows.length - 1) {
      newRow.genealogy.isLastChild = true;
    }

    newRows.push(newRow);

    if ((newRow.child || []).length > 0) {
      getRowsLayout(newRow.child!, level + 1, newRow.id).forEach((row) => {
        newRows.push(row);
      });
    }
  });

  return newRows;
}
function findLastChildId(rows: TreeResponseStore[], parentId: number) {
  const childs = rows.filter((row) => row.parentId === parentId);

  if (childs.length > 0) {
    return findLastChildId(rows, childs.slice(-1)[0].id!);
  } else {
    return parentId;
  }
}
function getIdsForDelete(rows: TreeResponseStore[], deletedRowId: number) {
  const result = [deletedRowId];
  const childs = rows.filter((row) => row.parentId === deletedRowId);

  if (childs.length > 0) {
    for (const key in childs) {
      result.push(...getIdsForDelete(rows, childs[key].id!));
    }
  }

  return result;
}
function initGenealogy(rows: TreeResponseStore[], row: TreeResponseStore) {
  const neighbors = rows.filter((item) => item.parentId === row.parentId);

  if (neighbors.length > 0) {
    const lastNeighbor = neighbors.pop();

    if (lastNeighbor) {
      lastNeighbor.genealogy.isLastChild = false;
    }
    row.genealogy.number = (lastNeighbor?.genealogy.number || 0) + 1;
  } else {
    const parent = rows.find((item) => item.id === row.parentId);

    if (parent) {
      parent.genealogy.haveСhildren = true;
    }
  }
}
function fixGenealogy(rows: TreeResponseStore[], id: number) {
  const row = rows.find((item) => item.id === id);

  if (row) {
    const neighborsBottom = rows.filter(
      (item) =>
        item.parentId === row.parentId &&
        item.genealogy.number > row.genealogy.number
    );
    const neighborTop = rows.find(
      (item) =>
        item.parentId === row.parentId &&
        item.genealogy.number === row.genealogy.number - 1
    );

    if (neighborsBottom.length > 0) {
      neighborsBottom.forEach((neighbor) => {
        neighbor.genealogy.number -= 1;
      });
    }

    if (row.genealogy.isLastChild && neighborTop !== undefined) {
      neighborTop.genealogy.isLastChild = true;
    } else if (neighborTop === undefined && neighborsBottom.length === 0) {
      const parent = rows.find((item) => item.id === row.parentId);

      if (parent) {
        parent.genealogy.haveСhildren = false;
      }
    }
  }
}
function initLineLevels(rows: TreeResponseStore[], level: number = 1) {
  const oneLevelRowsIndex: number[] = [];

  rows.forEach((row, i) => {
    if (row.level === level) {
      oneLevelRowsIndex.push(i);
    }
  });

  if (oneLevelRowsIndex.length === 1) {
    initLineLevels(rows, level + 1);
  } else if (oneLevelRowsIndex.length > 1) {
    for (let i = 1; i < oneLevelRowsIndex.length; i++) {
      const rowIndex = oneLevelRowsIndex[i];
      const prevRowIndex = oneLevelRowsIndex[i - 1];
      
      const rowParentId = rows[oneLevelRowsIndex[i]].parentId;
      const prevRowParentId = rows[oneLevelRowsIndex[i - 1]].parentId;

      if (rowIndex - prevRowIndex > 1 && rowParentId === prevRowParentId) {
        const innerRows = rows.filter(
          (row, j) => row.level > level && j > prevRowIndex && j < rowIndex
        );

        innerRows.forEach((innerRow) => {
          innerRow.lineLevels.push(level);
        });
      }
    }
    initLineLevels(rows, level + 1);
  }
}

export const outlayRowsSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setEditInfo: (state, action: PayloadAction<EditInfo>) => {
      state.editInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOutlayRows.fulfilled, (state, action) => {
        const newRows = action.payload;

        initLineLevels(newRows);

        state.rows = newRows;

        if (action.payload.length === 0) {
          state.editInfo = {
            ...state.editInfo,
            mode: Mode.Create,
            level: 0,
          };
        }
      })
      .addCase(getOutlayRows.rejected, (_, action) => {
        console.error(action.payload);
      })
      .addCase(deleteRow.fulfilled, (state, action) => {
        const newRows = [...state.rows];
        const deletedRowId = action.payload;
        const idsForDelete = getIdsForDelete(newRows, deletedRowId);

        fixGenealogy(newRows, deletedRowId);

        idsForDelete.forEach((id) => {
          const index = newRows.findIndex((row) => row.id === id);
          newRows.splice(index, 1);
        });

        newRows.forEach((row) => (row.lineLevels = []));
        initLineLevels(newRows);

        state.rows = newRows;

        if (state.rows.length === 0) {
          state.editInfo = {
            ...state.editInfo,
            mode: Mode.Create,
            level: 0,
          };
        }
      })
      .addCase(deleteRow.rejected, (_, action) => {
        console.error(action.payload);
      })
      .addCase(createRow.fulfilled, (state, action) => {
        const newRow = {
          ...action.payload.current,
          child: [],
          parentId: 0,
          level: 0,
          genealogy: {
            haveСhildren: false,
            isLastChild: true,
            number: 1,
          },
          lineLevels: [],
        };
        const newRows = [...state.rows];
        const parentId = state.editInfo.parent;

        delete newRow.total;
        if (parentId === null) {
          state.rows = [...newRows, newRow];
        } else {
          const parentIndex = newRows.findIndex((row) => row.id === parentId);
          const lastChildId = findLastChildId(newRows, parentId);
          const lastChildIndex = newRows.findIndex(
            (row) => row.id === lastChildId
          );

          newRow.parentId = parentId;
          newRow.level = newRows[parentIndex]!.level + 1;

          initGenealogy(newRows, newRow);

          newRows[parentIndex].child?.push(newRow);
          newRows.splice(lastChildIndex + 1, 0, newRow);

          initLineLevels(newRows);

          state.rows = newRows;
        }

        state.editInfo = {
          mode: null,
          parent: null,
          editRow: null,
          lastChild: null,
          level: null,
        };
      })
      .addCase(createRow.rejected, (_, action) => {
        console.error(action.payload);
      })
      .addCase(updateRow.fulfilled, (state, action) => {
        const newRows = [...state.rows];
        const newRow = { ...action.payload };

        const oldRowIndex = newRows.findIndex((row) => row.id === newRow.id);
        newRows[oldRowIndex] = newRow;

        state.rows = newRows;
        state.editInfo = {
          mode: null,
          parent: null,
          editRow: null,
          lastChild: null,
          level: null,
        };
      })
      .addCase(updateRow.rejected, (_, action) => {
        console.error(action.payload);
      });
  },
});

export const { setEditInfo } = outlayRowsSlice.actions;

export const outlayRowsReducer = outlayRowsSlice.reducer;
