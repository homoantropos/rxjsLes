class ViewClassBinder {
    createClassPropsDueViewConfig()  {
        return function(viewConfig) {
            if(!Array.isArray(viewConfig)) return;

            const viewConfigLength = viewConfig.length;

            let i = 0;

            while (i < viewConfigLength) {
                let viewConfigItem = viewConfig[i];

                if(typeof viewConfigItem === 'string') {
                    viewConfigItem = viewConfigItem.replace('#', '');

                    this[viewConfig[i]] = document.querySelector(`#${viewConfig[i]}`);

                    i++;
                }
            }
        }
    }
}

const viewClassBinder = new ViewClassBinder();

export default viewClassBinder;