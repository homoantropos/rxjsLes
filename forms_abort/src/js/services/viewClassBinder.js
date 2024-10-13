import {logDebug} from "../utils/debugLogger";

class ViewClassBinder {
    createClassPropsDueViewConfig()  {
        return function(viewConfig) {
            if(!Array.isArray(viewConfig)) return;

            const viewConfigLength = viewConfig.length;

            let i = 0;

            while (i < viewConfigLength) {
                const viewConfigItem = viewConfig[i];

                if(typeof viewConfigItem === 'string') {
                    const reducedViewConfigItem = viewConfigItem.replace('#', '');

                    const candidate = document.querySelector(`${viewConfigItem}`);

                    const hasProp = Object.prototype.hasOwnProperty.call(this, reducedViewConfigItem);

                    const doesntHasValue = !this[reducedViewConfigItem];

                    if(candidate && hasProp && doesntHasValue) {
                        this[reducedViewConfigItem] = candidate;
                    } else {
                        !candidate && console.error('Such element is absent in view: ', viewConfigItem);

                        !hasProp && logDebug(`Component doesn\'t have such props: ${viewConfigItem}`);

                        !doesntHasValue && logDebug(`Component prop has value: ${this[reducedViewConfigItem]}`);
                    }
                } else {
                    typeof viewConfigItem !== 'string' && console.error('Value is not string: ', viewConfigItem, i);
                }

                i++;
            }
        }
    }
}

const viewClassBinder = new ViewClassBinder();

export default viewClassBinder;