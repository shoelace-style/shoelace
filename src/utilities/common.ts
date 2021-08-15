/**
 * 获取原始 相对于window top,left 值
 * @param element
 * @returns
 */
function getOffset(element: Element) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;
  return {
    top: rect.top + (win ? win.pageYOffset : 0),
    left: rect.left + (win ? win.pageXOffset : 0)
  };
}
/**
 * 获取el 的当前css 属性值
 * @param el DOM元素
 * @param cssProperty
 * @returns
 */
function getCssValue(el: Element, cssProperty: string) {
  const win = document.defaultView ? document.defaultView : window;
  return win.getComputedStyle(el, null).getPropertyValue(cssProperty);
}

/**
 * 给 DOM 添加 动画class, 返回动画结束promise;
 * @param node  节点
 * @param animation 动画className
 * @param prefix
 * @returns  返回动画结束promise
 */
function animateCss(node: Element, animation: string, prefix = 'animate_') {
  return new Promise<string>(resolve => {
    const animationName = `${animation}`;
    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: Event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
}
/**
 * 给DOM toogle class ,返回动画结束promise
 */
function animateToogleCss(node: Element, cssClass: string) {
  node.classList.toggle(cssClass);
  return new Promise<string>(resolve => {
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: Event) {
      event.stopPropagation();
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
}

/**
 * 给node添加事件
 * @param node 节点
 * @param eventType 事件类型
 * @param hanlder 监听
 * @param useCapture 是否捕获
 * @returns  返回一个object ,能够删除node监听
 */
function addEvent(
  node: Element | Window | Document | DocumentFragment,
  eventType: string,
  hanlder: EventListenerObject | EventListener,
  useCapture:boolean=false
) {
  node.addEventListener(eventType, hanlder,useCapture);
  return {
    dispose: function () {
      node.removeEventListener(eventType, hanlder,useCapture);
    }
  };
}

/**
 * node clone 复制（现在因为大量的webcomponent 组件，复制的时候 ，自定义属性是不会复制的，所以导致复制的组件，跟原始组件展示不一样）
 * @param node
 * @param deepClone 是否深度clone, 如果undefined 则深度复制
 */
function cloneUtils(node: Element, deepClone: boolean = true) {
  const cloneNode = node.cloneNode(deepClone) as Element;

  const iteratorNode = (old: Element, newNode: Element) => {
    if (deepClone) {
      const old_children = old.children;
      if (old_children) {
        const new_children = newNode.children;
        for (let i = 0, j = old_children.length; i < j; i++) {
          iteratorNode(old_children[i], new_children[i]);
        }
      }
    }
  };
  iteratorNode(node, cloneNode);
  return cloneNode;
}
/**
 * 获取所有直接节点
 * @param node 
 * @param cssSelector 子节点类型
 * @returns 
 */
function getChildrenElement(node:Element,cssSelector:string){
  return  Array.from(node.children).filter( item =>{
     return item&&item.matches(cssSelector);
   })
}
/**
 * 模拟jquery closest 
 * @param el 
 * @param selector 
 * @returns 
 */
const closest=(el:Node,selector:string):Element|null =>{
  let node:any=el;
  if(node.nodeType==Node.TEXT_NODE){
     node=node.parentNode;
  }
  while(node!=null&&node.nodeType==Node.ELEMENT_NODE){
    if(node.matches(selector)){
      return node;
    }else if(node.parentElement==null){
      return null;
    }
    node=node.parentNode;
  }
  return null;
}

/**
 * 模拟jquery on 事件
 * @param node 节点
 * @param selector  子选择器
 * @param type 事件类型
 * @param callBack  回调
 * @param userCapture 是否捕获
 * @param context 回调上下文，如果为空，则this 为事件监听的实际节点
 * @returns 
 */
function onEvent(node:Element,selector:string,type:string,callBack:EventListener,userCapture=false,context:unknown){
  const listener=function(e:Event){
    const target=e.target as Node;
    const delegateTarget=closest(target,selector);
    (e as any).delegateTarget=delegateTarget;
    if(delegateTarget){
       callBack.call(context||delegateTarget,e);
    }
  }
  if(type=='mouseenter'||type=='mouseleave'){
     userCapture=true;
  }
  return addEvent(node,type,listener,userCapture);
}
export { getOffset, getCssValue, animateCss,animateToogleCss, addEvent, cloneUtils, getChildrenElement,closest,onEvent };

