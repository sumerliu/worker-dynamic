class WorkerPool {
    workerURL: string;
    worker: Worker;
    handler: Function;
    isBlob: boolean;
    constructor(option: Option) {
        const pendingJobs = {};
        const f = function(executor){
            onmessage = function ({data: {jobId, message}}) {
                var result = executor(message);
                postMessage({ jobId: jobId, result: result });
            };
        }
        this.isBlob = typeof option.target === 'function';
        if ( typeof option.target === 'function') {
            this.workerURL = URL.createObjectURL(new Blob([`var executor = ${option.target.toString()};(${f.toString()})(executor)`]))
        } else {
            this.workerURL = option.target
        }
        const worker = new Worker(
            this.workerURL
        );
        worker.onmessage = ({ data: { result, jobId } }) => {
            // 调用resolve，改变Promise状态
            pendingJobs[jobId](result);
            // 删掉，防止key冲突
            delete pendingJobs[jobId];
        };
        this.handler = (...message) =>
            new Promise(resolve => {
                const jobId = String(Math.random());
                pendingJobs[jobId] = resolve;
                worker.postMessage({ jobId, message });
            });
    }
    clear() {
        if ( this.isBlob) {
            URL.revokeObjectURL(this.workerURL);
        }
        this.worker.terminate()
    }
}