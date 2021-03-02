var WorkerDynamic = /** @class */ (function () {
    function WorkerDynamic(option) {
        var pendingJobs = {};
        var f = function (executor) {
            onmessage = function (_a) {
                var _b = _a.data, jobId = _b.jobId, message = _b.message;
                var result = executor.apply(void 0, message);
                postMessage({ jobId: jobId, result: result });
            };
        };
        this.isBlob = typeof option.target === 'function';
        if (typeof option.target === 'function') {
            this.workerURL = URL.createObjectURL(new Blob(["var executor = " + option.target.toString() + ";(" + f.toString() + ")(executor)"]));
        }
        else {
            this.workerURL = option.target;
        }
        var worker = new Worker(this.workerURL);
        worker.onmessage = function (_a) {
            var _b = _a.data, result = _b.result, jobId = _b.jobId;
            // 调用resolve，改变Promise状态
            pendingJobs[jobId](result);
            // 删掉，防止key冲突
            delete pendingJobs[jobId];
        };
        this.handler = function () {
            var message = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                message[_i] = arguments[_i];
            }
            return new Promise(function (resolve) {
                var jobId = String(Math.random());
                pendingJobs[jobId] = resolve;
                worker.postMessage({ jobId: jobId, message: message });
            });
        };
    }
    WorkerDynamic.prototype.clear = function () {
        if (this.isBlob) {
            URL.revokeObjectURL(this.workerURL);
        }
        this.worker.terminate();
    };
    return WorkerDynamic;
}());
export default WorkerDynamic;
//# sourceMappingURL=index.js.map