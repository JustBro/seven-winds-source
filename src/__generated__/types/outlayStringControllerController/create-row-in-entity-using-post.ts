import { OutlayRowRequest } from "../outlay-row-request";
import type { RecalculatedRows } from "../recalculated-rows";

 export type CreateRowInEntityUsingPostPathParams = {
    /**
     * @description eID
     * @type integer, int64
    */
    eID: number;
};
/**
 * @description OK
*/
export type CreateRowInEntityUsingPost200 = RecalculatedRows;
/**
 * @description Created
*/
export type CreateRowInEntityUsingPost201 = any;
/**
 * @description Unauthorized
*/
export type CreateRowInEntityUsingPost401 = any;
/**
 * @description Forbidden
*/
export type CreateRowInEntityUsingPost403 = any;
/**
 * @description Not Found
*/
export type CreateRowInEntityUsingPost404 = any;
/**
 * @description request
*/
export type CreateRowInEntityUsingPostMutationRequest = OutlayRowRequest;
/**
 * @description OK
*/
export type CreateRowInEntityUsingPostMutationResponse = RecalculatedRows;
export type CreateRowInEntityUsingPostMutation = {
    Response: CreateRowInEntityUsingPostMutationResponse;
    Request: CreateRowInEntityUsingPostMutationRequest;
    PathParams: CreateRowInEntityUsingPostPathParams;
    Errors: CreateRowInEntityUsingPost401 | CreateRowInEntityUsingPost403 | CreateRowInEntityUsingPost404;
};