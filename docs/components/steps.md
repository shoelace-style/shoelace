# Steps

[component-header:sl-steps]

A description of the component goes here.

```html preview
<style>

    sl-step{
        min-width:150px;
    }
    sl-step::part(step-description){
        color:rgb(var(--sl-color-gray-500));
    }
</style>
<sl-steps id="sl-steps">
    <sl-step title='EasyTrack 6' description='2011年7月'></sl-step>
    
    <sl-step title='EasyTrack 9' icon='star-fill' description='2016年7'></sl-step>
    <sl-step title='EasyTrack 10' description='2019 年 7'></sl-step>
    <sl-step title='EasyTrack 11' description='规划建设中'>
        <div slot='step-description'>规划建设中<br>
            ### Second Example<br>
            <sl-button>Menu</sl-button><br>
            ### Second Example<br>
            ### Second Example<br>
            ### Second Example<br>
            
        </div>
    </sl-step>
</sl-steps>
<div style='margin-top:10px;'></div>
<sl-button id='changeStepVertial'>水平/竖直</sl-button>
<sl-button id='changeStep'>+1</sl-button>
<script >
    document.querySelector('#changeStepVertial').addEventListener('click',()=>{
       const stepObj= document.querySelector('#sl-steps');
       stepObj.vertical=!stepObj.vertical;
    });

     document.querySelector('#changeStep').addEventListener('click',()=>{
       const stepObj= document.querySelector('#sl-steps');
       const steps=stepObj.childStep;
       if(stepObj.current+1<steps.length){
         stepObj.current=stepObj.current+1;
       }else{
           stepObj.current=0;
       }
       
    })

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-steps]
