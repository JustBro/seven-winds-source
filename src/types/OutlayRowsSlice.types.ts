import { OutlayRowRequest, TreeResponse } from '@/__generated__';
import { Mode } from '@/store/OutlayRowsSlice.service';

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

export type Genealogy = {
  haveСhildren: boolean;
  isLastChild: boolean;
  number: number;
};

export type EditInfo = {
  mode: Mode | null;
  parent: number | null;
  editRow: number | null;
  lastChild: number | null;
  level: number | null;
};

export type InitialState = {
  rows: TreeResponseStore[];
  editInfo: EditInfo;
};
