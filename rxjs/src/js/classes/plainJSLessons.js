class PlainJSLessons {
    hugeArray = [];

    executionTimes = new Map();

    loopsMethodsNames = [
        'useWhile', 'useDoWhile', 'useFor', 'useForEach', 'useForOf', 'useForIn', 'useMap', 'useSome', 'useEvery', 'useFilter', 'useReduce', 'useFind'
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
        const startTime = Date.now();

        this[methodName] && (await this[methodName]());

        const endTime = Date.now();

        const elapsedTime = endTime - startTime;

        this.executionTimes.set(methodName, elapsedTime);
    }

    logMethodsTimes() {
        const sortedTimesArray = Array.from(this.executionTimes).sort((a, b) => a[1] - b[1]);

        sortedTimesArray.forEach((item) => {
            console.log(`${item[0]}: ${item[1].toFixed(2)} ms`);
        });
    }

    async useFor() {
        try {
            const arr = [];

            const arrLength = this.hugeArray.length;

            let i = 0;

            for(i; i < arrLength; i++){
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

            for(let i of this.hugeArray) {
                arr.push(this.hugeArray[i]);
            }

            console.log('useForOf: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useForIn() {
        try {
            // const arr = [];
            //
            // for(let i = 0; i < this.hugeArray.length; i++){
            //     arr.push(this.hugeArray[i]);
            // }
        } catch(e) {
            console.error(e);
        }
    }

    async useMap() {
        try {
            const arr = this.hugeArray.map((value) => value);

            console.log('useMap: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useWhile() {
        try {
            const arr = [];

            let i = 0;

            const arrLength = this.hugeArray.length;

            while(i < arrLength){
                arr.push(this.hugeArray[i]);
                i++;
            }

            console.log('useWhile: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useDoWhile() {
        try {
            const arr = [];

            let i = 0;

            const arrLength = this.hugeArray.length;

            do {
                arr.push(this.hugeArray[i]);
                i++;
            } while(i < arrLength);

            console.log('useDoWhile: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useSome() {
        try {
            const arr = [];

            this.hugeArray.some((value) => {
                arr.push(value);

                return false;
            });

            console.log('useSome: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useEvery() {
        try {
            const arr = [];

            this.hugeArray.every((value) => {
                arr.push(value);

                return false;
            });

            console.log('useEvery: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useFilter() {
        try {
            const arr = this.hugeArray.filter((item) => true);

            console.log('useFilter: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useReduce() {
        try {
            const arr = this.hugeArray.reduce((acc, value) => {
                acc.push(value);
                return acc;
            }, []);

            console.log('useReduce: ', arr.length);
        } catch(e) {
            console.error(e);
        }
    }

    async useFind() {
        try {
            const arr = [];

            this.hugeArray.find((value) => {
                arr.push(value);

                return false;
            });

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