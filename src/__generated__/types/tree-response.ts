export type TreeResponse = {
    /**
     * @type array | undefined
    */
    child?: TreeResponse[];
    /**
     * @type integer | undefined, int64
    */
    equipmentCosts?: number;
    /**
     * @type integer | undefined, int64
    */
    estimatedProfit?: number;
    /**
     * @type integer | undefined, int64
    */
    id?: number;
    /**
     * @type integer | undefined, int64
    */
    machineOperatorSalary?: number;
    /**
     * @type integer | undefined, int64
    */
    mainCosts?: number;
    /**
     * @type integer | undefined, int64
    */
    materials?: number;
    /**
     * @type integer | undefined, int64
    */
    mimExploitation?: number;
    /**
     * @type integer | undefined, int64
    */
    overheads?: number;
    /**
     * @type string | undefined
    */
    rowName?: string;
    /**
     * @type integer | undefined, int64
    */
    salary?: number;
    /**
     * @type integer | undefined, int64
    */
    supportCosts?: number;
    /**
     * @type integer | undefined, int32
    */
    total?: number;
};