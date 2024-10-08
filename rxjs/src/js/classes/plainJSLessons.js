class PlainJSLessons {
    hugeArray = [];

    executionTimes = new Map();

    loopsMethodsNames = [
        'useFor', 'useForEach', 'useForOf', 'useForIn', 'useMap', 'useFirst', 'useSome', 'useEvery', 'useFilter', 'useReduce', 'useFind'
    ]

    constructor(){
        this.createLargeArray();
    }

    createLargeArray(){
        console.time('createLargeArray');

        this.hugeArray = Array.from({ length: 1_000_000 }, () => Math.random()*100);

        console.log(this.hugeArray.length);

        console.timeEnd('createLargeArray');
    }

    checkLoopsTime() {
        Promise.all(this.loopsMethodsNames.map(
           async (methodName) => await this.setMethodRunTime(methodName)
        ))
            .then(() => {
                this.logMethodsTimes();

                console.log('Done!');
            })
            .catch((error) => console.error(error));
    }

    async setMethodRunTime(methodName) {
        const startTime = performance.now();

        await this[methodName]();

        const endTime = performance.now();

        const elapsedTime = endTime - startTime;

        this.executionTimes.set(methodName, elapsedTime);
    }

    logMethodsTimes() {
        const sortedTimesArray = Array.from(this.executionTimes).sort((a, b) => a.elapsedTime - b.elapsedTime);

        console.log('Sorted Execution Times:', sortedTimesArray);

        this.executionTimes.forEach((item) => {
            console.log(`${item.methodName}: ${item.elapsedTime.toFixed(2)} ms`);
        });
    }

    async useFor() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useFor: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useForEach() {
        try {
            const arr = [];

            this.hugeArray.forEach((i) => arr.push(i));

            console.log('useForEach: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useForOf() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useForOf: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useForIn() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useForIn: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useMap() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useMap: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useFirst() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useFirst: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useSome() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useSome: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useEvery() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useEvery: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useFilter() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useFilter: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useReduce() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useReduce: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useFind() {
        try {
            const arr = [];

            for(let i = 0; i < this.hugeArray.length; i++){
                arr.push(this.hugeArray[i]);
            }

            console.log('useFind: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    destroyComponent(){
        this.hugeArray = [];
    }
}

const plainJSLessons = new PlainJSLessons();

export default plainJSLessons;