## 封装分时函数
>场景：在页面插入20000个元素而不卡顿
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
    <body>
        <button class="btn">开始插入</button>

        <script>
            const tasks = Array.from({length:20000},(_,i)=> ()=>{
                const div = document.createElement("div")
                div.innerHTML = i + ''
                document.body.appendChild(div)
            })
            const btn = document.querySelector('.btn');
            btn.onclick = ()=>{
                const sheduler =(chunkTask)=>{
                    setTimeout(()=>{
                        const now = performance.now()
                        chunkTask(()=>(performance.now()- now < 1))
                    },1000)
                }
                idlePerformTasks(tasks)
            }
            function performTasks(tasks,sheduler) {
                if (tasks.length === 0) return
                let i = 0
                function run() {
                    sheduler((goOn)=>{``
                        while(i < tasks.length && goOn() ){
                            tasks[i++]()
                        }
                        run()
                    })
                }
                run()
            }
            function idlePerformTasks(tasks) {
                const sheduler =(chunkTask)=>{
                    requestIdleCallback((idle)=>{
                        chunkTask(()=> (idle.timeRemaining() > 0))
                    })
                }
                performTasks(tasks,sheduler)

            }
        </script>
    </body>
</html>
```