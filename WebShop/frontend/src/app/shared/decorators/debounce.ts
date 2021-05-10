export function Debounce(ms: number): Function {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        let isCooldown = false;
        const originalMethod = descriptor.value;

        descriptor.value = function() {
            if (isCooldown) return;

            isCooldown = true;
            originalMethod.apply(this, arguments);
            setTimeout(() => isCooldown = false, ms);
        }
    }
}