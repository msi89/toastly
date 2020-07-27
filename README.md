# toastly

* Installation
```bash 
npm install @msic89/toastly
```

##### How use basic
```javascript
import Toastly from "@msic89/toastly"

const toastly = new Toastly();
toastly.error("Network error")
```
* Advanced options
```javascript
import Toastly from "@msic89/toastly"

const toastly = new Toastly();
   toastly.success("Hello world", {
    dismissible: false,
    duration: 2000,
})
```

* Custom toast
```javascript
import Toastly from "@msic89/toastly"

const toastly = new Toastly

toastly.show(`Send us <b>an email</b> to get support`, {
    position: "top-center",
    background: "coral",
    color: "#000",
});
```

##### Available methods
* sucess
* info
* error
* show
* warning
