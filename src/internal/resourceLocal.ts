import {  ReactiveElement } from 'lit';
import { addEvent } from '../utilities/common';
import { resouce_changeEvent } from '../utilities/getResouce';

export default function resourceLocal() {
  return function(target:any){
    debugger;
    (target as typeof ReactiveElement).addInitializer((element:ReactiveElement)=>{
      let result:{
        dispose:()=>void
      };
      element.addController({
          hostConnected(){
            result=addEvent(window,resouce_changeEvent,()=>{
              element.requestUpdate();
            })
          },
          hostDisconnected(){
             result.dispose();
          }
      });
    });
  } 
}
