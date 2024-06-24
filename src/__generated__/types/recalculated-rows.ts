import { RowResponse } from "./row-response";

 export type RecalculatedRows = {
    /**
     * @type array | undefined
    */
    changed?: RowResponse[];
    current?: RowResponse;
};