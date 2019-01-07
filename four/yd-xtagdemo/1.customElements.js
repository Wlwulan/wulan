window.addEventListener("yd",function(e){
    // console.log(info);
    alert(e.detail.info);
});
class ButtonHelloElement extends HTMLButtonElement {
    constructor() {
        super()
        this.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent("yd",{
                detail:{
                    info:"laoyuan"
                }
            }))
        })
    }
}
customElements.define('button-hello', ButtonHelloElement, {
    extends: 'button'
})

<button is="button-hello">hello world</button>
<!-- <button-hello>hello world</button-hello> -->