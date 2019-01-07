const observer = new  PerformanceObserver((list) => {
    for(const entry of list.getEntries()){
        console.log(entry)
        console.log("entry执行时间"+entry.startTime+entry.duration)
    }
})
observer.observe({
    entryTypes:["longtask"]
})