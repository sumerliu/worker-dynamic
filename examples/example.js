import WorkerDynamic from '../dist/index'
function test(a){
    console.log("param log:", a);
    return a+1;
}
const dynamicWorker = new WorkerDynamic({target: test});
dynamicWorker.handler(2).then(res=>{
    console.log("worker result : ", res)
})