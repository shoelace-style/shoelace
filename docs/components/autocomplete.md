# Include

[component-header:sl-autocomplete]

The `sl-autocomplete` component provides suggestions while users type into the search field. This is very useful when you need to quickly find and select an item from a list of values.

```html preview
<sl-autocomplete></sl-autocomplete>
```

## Examples

### Remote source for suggestions

You can define a remote source to retrieve a list of data.

```html preview
<sl-autocomplete
  class="autocomplete-remote"
  delay="300"
  min-chars="2"
  max-results="10"
  clearable>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.autocomplete-remote');
  const url = 'https://60db3b45801dcb0017290fdb.mockapi.io/users?name={q}';

  autocomplete.source = search => {
    return fetch(url.replace('{q}', search))
      .then(resp => resp.json())
      .then(data =>
        data.map(d => {
          return {
            text: d.name,
            value: d.id
          };
        })
      );
    };
</script>
```

### Local source for suggestions

The `sl-autocomplete` works also with local data.

```html preview
<sl-autocomplete
  class="autocomplete-local"
  delay="300"
  min-chars="2"
  max-results="10"
  clearable>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.autocomplete-local');

  const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  autocomplete.source = search => {
    return new Promise((resolve, reject) => {
      let filter = countries.filter(name => name.toLowerCase().includes(search.toLowerCase()));
      return resolve(filter.map(d => { return { text: d, value: d } }));
    });
  };
</script>
```

[component-metadata:sl-autocomplete]