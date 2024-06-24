import type { EntityResponse } from "../entity-response";

 /**
 * @description OK
*/
export type CreateEntityUsingPost200 = EntityResponse;
/**
 * @description Created
*/
export type CreateEntityUsingPost201 = any;
/**
 * @description Unauthorized
*/
export type CreateEntityUsingPost401 = any;
/**
 * @description Forbidden
*/
export type CreateEntityUsingPost403 = any;
/**
 * @description Not Found
*/
export type CreateEntityUsingPost404 = any;
/**
 * @description OK
*/
export type CreateEntityUsingPostMutationResponse = EntityResponse;
export type CreateEntityUsingPostMutation = {
    Response: CreateEntityUsingPostMutationResponse;
    Errors: CreateEntityUsingPost401 | CreateEntityUsingPost403 | CreateEntityUsingPost404;
};