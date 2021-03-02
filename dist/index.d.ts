declare class WorkerDynamic {
    workerURL: string;
    worker: Worker;
    handler: Function;
    isBlob: boolean;
    constructor(option: Option);
    clear(): void;
}
export default WorkerDynamic;
