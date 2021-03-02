[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">worker-dynamic</h3>

  <p align="center">
    Running js function in worker dynamic
    <br />
    <br />
    <br />
    <a href="https://github.com/sumerliu/worker-dynamic/blob/main/example/">View Demo</a>
    ·
    <a href="https://github.com/sumerliu/worker-dynamic/issues">Report Bug</a>
    ·
    <a href="https://github.com/sumerliu/worker-dynamic/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Features](#Features)
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#license)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project
> Running js function in worker dynamic<br>
> version:  1.0.1<br>
> lastDate: 2021/3/2<br>
> Author:  Sumer Liu<br>


### Built With
* [TypeScript](https://github.com/Microsoft/TypeScript)

## Features
1. 构造中opiton对象提供target属性，允许传入方法函数或者js文件链接
2. worker使用Promise化，多线程异步更加方便

## Installation
npm安装 
```js
    npm install worker-dynamic --save
```

## Usage
1. npm包默认导出WorkerDynamic核心类。
2. WorkerDynamic类接受option参数，目前仅支持传入target为worker中执行对象：
    ```js
    import WorkerDynamic from 'worker-dynamic'
    function test(a){
        console.log("param log:", a);
        return a+1;
    }
    const dynamicWorker = new WorkerDynamic({target: test});
    dynamicWorker.handler(2).then(res=>{
        console.log("worker result : ", res)
    })  
    ```
3. 若需要传入文件链接，文件中需按照固定onmessage完成result的接受工作
    ```js
    onmessage = function ({data: {jobId, message}}) {
        ...
        postMessage({ jobId: jobId, result: result });
        ...
    };
    ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Sumer Liu - 843627979@qq.com

Project Link: [https://github.com/sumerliu/worker-dynamic](https://github.com/sumerliu/worker-dynamic)

[license-shield]: https://img.shields.io/github/license/sumerliu/worker-dynamic.svg?style=flat-square
[license-url]: https://github.com/sumerliu/worker-dynamic/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/%E5%A4%A9%E9%AA%84-%E5%88%98-4038528a/