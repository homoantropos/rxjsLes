class ViewClassBinder {
    createClassPropsDueViewConfig()  {
        return function(viewConfig) {
            if(!Array.isArray(viewConfig)) return;

            const viewConfigLength = viewConfig.length;

            let i = 0;

            while (i < viewConfigLength) {
                const viewConfigItem = viewConfig[i];

                if(typeof viewConfigItem === 'string' && !this[viewConfigItem]) {
                    const reducedViewConfigItem = viewConfigItem.replace('#', '');

                    this[reducedViewConfigItem] = document.querySelector(`${viewConfigItem}`);

                    i++;
                }
            }
        }
    }
}

const viewClassBinder = new ViewClassBinder();

export default viewClassBinder;