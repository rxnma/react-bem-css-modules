export default function bemClass(cssModuleStyles) {
    return (className, bemModifiersObject) => createBemClass(cssModuleStyles, className, bemModifiersObject);
}
const createBemClass = (cssModuleStyles, className, bemModifiersObject) => {
    if (!className || className === "") {
        return;
    }
    const extractedClassname = className.split("_").at(1);
    if (!extractedClassname) {
        throw new Error(`Unable to extract className: ${className}`);
    }
    const matchedClasses = [cssModuleStyles[extractedClassname]];
    if (!bemModifiersObject) {
        return matchedClasses.join(" ");
    }
    Object.entries(bemModifiersObject).forEach((arg) => {
        const cssModifier = cssModuleStyles[`${extractedClassname}--${arg[0]}`];
        if (!cssModifier) {
            console.error(`Could not find className ${`${extractedClassname}--${arg}`} in css module styles. The selector '${arg[0]}' might be missing style props.`);
            return;
        }
        if (arg[1]) {
            matchedClasses.push(cssModifier);
        }
    });
    return matchedClasses.join(" ");
};
