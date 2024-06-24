import type { TreeResponse } from "../tree-response";

 export type GetTreeRowsUsingGetPathParams = {
    /**
     * @description eID
     * @type integer, int64
    */
    eID: number;
};
/**
 * @description OK
*/
export type GetTreeRowsUsingGet200 = TreeResponse[];
/**
 * @description Unauthorized
*/
export type GetTreeRowsUsingGet401 = any;
/**
 * @description Forbidden
*/
export type GetTreeRowsUsingGet403 = any;
/**
 * @description Not Found
*/
export type GetTreeRowsUsingGet404 = any;
/**
 * @description OK
*/
export type GetTreeRowsUsingGetQueryResponse = TreeResponse[];
export type GetTreeRowsUsingGetQuery = {
    Response: GetTreeRowsUsingGetQueryResponse;
    PathParams: GetTreeRowsUsingGetPathParams;
    Errors: GetTreeRowsUsingGet401 | GetTreeRowsUsingGet403 | GetTreeRowsUsingGet404;
};