import { emit } from "../internal/event";

const map={} as any;
let currentLocal='';
const resouce_changeEvent=`window-resouce-change-event`;
/**
 * 设置组件语言
 * @param locale 
 */
function setLocal(locale:string){
    let oldLocale=getLocal();
    if(!getSuppurtLocals().includes(locale)){
        throw new Error(`不支持的组件语言!支持的语言有${getSuppurtLocals().join(',')}`);
    }
    if(locale!=currentLocal){
        import(`../resources/resource.${locale}.js`).then((ret)=>{
            map[locale]=ret.default;
        })
        currentLocal=locale;
        emit(window,resouce_changeEvent,{
            detail:{
                old:oldLocale,
                new:locale
            }
        });
    }
}
setLocal('zh');
/**
 * 获取组件语言
 * @returns 
 */
function  getLocal(){
    return currentLocal;
}
/**
 * 获取组件支持的语言列表
 * @returns 
 */
function getSuppurtLocals(){
    return ['zh','en'];
}

/**
 * 获取资源数据
 * @param keys 
 * @returns 
 */
function getResouceValue(...keys:string[]){
    let obj=map[getLocal()];
    let result=obj;
    for(let k of keys){
        result=result[k];
    }
    return result;
}

export {setLocal,getLocal,getSuppurtLocals,getResouceValue,resouce_changeEvent}
