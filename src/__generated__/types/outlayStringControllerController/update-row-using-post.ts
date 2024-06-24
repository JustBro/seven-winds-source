import { OutlayRowUpdateRequest } from "../outlay-row-update-request";
import type { RecalculatedRows } from "../recalculated-rows";

 export type UpdateRowUsingPostPathParams = {
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
export type UpdateRowUsingPost200 = RecalculatedRows;
/**
 * @description Created
*/
export type UpdateRowUsingPost201 = any;
/**
 * @description Unauthorized
*/
export type UpdateRowUsingPost401 = any;
/**
 * @description Forbidden
*/
export type UpdateRowUsingPost403 = any;
/**
 * @description Not Found
*/
export type UpdateRowUsingPost404 = any;
/**
 * @description request
*/
export type UpdateRowUsingPostMutationRequest = OutlayRowUpdateRequest;
/**
 * @description OK
*/
export type UpdateRowUsingPostMutationResponse = RecalculatedRows;
export type UpdateRowUsingPostMutation = {
    Response: UpdateRowUsingPostMutationResponse;
    Request: UpdateRowUsingPostMutationRequest;
    PathParams: UpdateRowUsingPostPathParams;
    Errors: UpdateRowUsingPost401 | UpdateRowUsingPost403 | UpdateRowUsingPost404;
};