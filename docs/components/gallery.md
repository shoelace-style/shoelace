# Gallery

[component-header:sl-gallery]

Responsive and flexible carousel component with thumbnail support .

```html preview
<sl-gallery id='galleryDiv' style='--thumb-image-size:100px;--sl-image-transition-time:340ms;' thumb-position='bottom'></sl-gallery>
<sl-button-group id='groupDIV' style='margin:10 pax'>
    <sl-button type='primary' >bottom</sl-button>
    <sl-button  >top</sl-button>
    <sl-button  >left</sl-button>
    <sl-button  >right</sl-button>
</sl-button-group>
<script>
    let galleryDiv=document.querySelector('#galleryDiv');
    let groupDIV=document.querySelector('#groupDIV');
    galleryDiv.images=['https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/5.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/6.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/7.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/8.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/9.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/10.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/11.jpg'];

    galleryDiv.thumb_images=['https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1t.jpg',
'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2t.jpg',
'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3t.jpg',
'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4t.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/5t.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/6t.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/7t.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/8t.jpg',
'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/9t.jpg',
 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/10t.jpg',
'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/11t.jpg'];

   
// galleryDiv.images= galleryDiv.images.slice(0,4);
galleryDiv.image_datas=galleryDiv.images;
galleryDiv.imageRender=(image,index)=>{
    return html`<span> ${image} </span>`;
};
groupDIV.querySelectorAll('sl-button').forEach(item=>{
    item.addEventListener('click',(event)=>{
        galleryDiv.thumbPosition=event.target.textContent;
        groupDIV.querySelectorAll('sl-button').forEach((temp)=>{
            temp.type=temp==event.target?'primary':'default';
        })
    })
})


</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-gallery]
