/**
 * 获取原始 相对于window top,left 值
 * @param element 
 * @returns 
 */
 function getOffset(element:Element){
    if (!element.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    const rect = element.getBoundingClientRect();
    const win = element.ownerDocument.defaultView;
    return {
        top: rect.top + (win?win.pageYOffset:0),
        left: rect.left + (win?win.pageXOffset:0),
    };
}
/**
 * 获取el 的当前css 属性值
 * @param el DOM元素
 * @param cssProperty 
 * @returns 
 */
function getCssValue(el:Element,cssProperty:string){
    const win=document.defaultView?document.defaultView:window;
    return win.getComputedStyle(el,null).getPropertyValue(cssProperty);
}

/**
 * 给 DOM 添加 动画class, 返回动画结束promise;
 * @param node  节点
 * @param animation 动画className
 * @param prefix 
 * @returns  返回动画结束promise
 */
function animateCss(node:Element,animation:string,prefix='animate_'){
    return new Promise<string>( (resolve)=>{
        const animationName = `${animation}`;
        node.classList.add(`${prefix}animated`, animationName);
        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event:Event) {
          event.stopPropagation();
          node.classList.remove(`${prefix}animated`, animationName);
          resolve('Animation ended');
        } 
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    })
}

function addEvent(node:Element|Window|Document|DocumentFragment,eventType:string, hanlder:EventListenerObject|EventListener){
    node.addEventListener(eventType,hanlder);
    return {
        dispose:function(){
            node.removeEventListener(eventType,hanlder)
        }
    }
}



export {
    getOffset,getCssValue, animateCss,addEvent
}