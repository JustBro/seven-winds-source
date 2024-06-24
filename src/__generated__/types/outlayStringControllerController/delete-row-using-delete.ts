import type { RecalculatedRows } from "../recalculated-rows";

 export type DeleteRowUsingDeletePathParams = {
    /**
     * @description eID
     * @type integer, int64
    */
    eID: number;
    /**
     * @description rID
     * @type integer, int64
    */
    rID: number;
};
/**
 * @description OK
*/
export type DeleteRowUsingDelete200 = RecalculatedRows;
/**
 * @description No Content
*/
export type DeleteRowUsingDelete204 = any;
/**
 * @description Unauthorized
*/
export type DeleteRowUsingDelete401 = any;
/**
 * @description Forbidden
*/
export type DeleteRowUsingDelete403 = any;
/**
 * @description OK
*/
export type DeleteRowUsingDeleteMutationResponse = RecalculatedRows;
export type DeleteRowUsingDeleteMutation = {
    Response: DeleteRowUsingDeleteMutationResponse;
    PathParams: DeleteRowUsingDeletePathParams;
    Errors: DeleteRowUsingDelete401 | DeleteRowUsingDelete403;
};