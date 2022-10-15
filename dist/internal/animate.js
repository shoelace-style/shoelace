export function animateTo(el, keyframes, options) {
    return new Promise(resolve => {
        if ((options === null || options === void 0 ? void 0 : options.duration) === Infinity) {
            throw new Error('Promise-based animations must be finite.');
        }
        const animation = el.animate(keyframes, Object.assign(Object.assign({}, options), { duration: prefersReducedMotion() ? 0 : options.duration }));
        animation.addEventListener('cancel', resolve, { once: true });
        animation.addEventListener('finish', resolve, { once: true });
    });
}
export function parseDuration(delay) {
    delay = delay.toString().toLowerCase();
    if (delay.indexOf('ms') > -1) {
        return parseFloat(delay);
    }
    if (delay.indexOf('s') > -1) {
        return parseFloat(delay) * 1000;
    }
    return parseFloat(delay);
}
export function prefersReducedMotion() {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    return query.matches;
}
export function stopAnimations(el) {
    return Promise.all(el.getAnimations().map(animation => {
        return new Promise(resolve => {
            const handleAnimationEvent = requestAnimationFrame(resolve);
            animation.addEventListener('cancel', () => handleAnimationEvent, { once: true });
            animation.addEventListener('finish', () => handleAnimationEvent, { once: true });
            animation.cancel();
        });
    }));
}
export function shimKeyframesHeightAuto(keyframes, calculatedHeight) {
    return keyframes.map(keyframe => (Object.assign(Object.assign({}, keyframe), { height: keyframe.height === 'auto' ? `${calculatedHeight}px` : keyframe.height })));
}
