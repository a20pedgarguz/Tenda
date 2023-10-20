import { getProductes } from "./communicationManager.js";
const { createApp } = Vue;

createApp({
    data() {
        return {
            divActiu:"portada",
            productes:[],
            total:0,
            productesComprats: [],
            nombre: "",
            email:"",
            localStorageSetted: false
        };
    },
    methods: {
        mostrarDiv(id){
            this.divActiu = id;
        },

        estaActiu(id){
            if (id == this.divActiu) {
                return true
            }else{
                return false
            }
        },
        
        sumarCarret(producte){
            if (this.productesComprats.indexOf(producte) == -1) {
                this.productesComprats.push(producte);
            }
            producte.cantidad = producte.cantidad + 1;
            this.total = Math.round(this.total + producte.precio);
        },

        eliminarProducte(id){
            this.total = Math.round(this.total - (this.productesComprats[id].precio * this.productesComprats[id].cantidad));
            this.productesComprats[id].cantidad = 0;
            this.productesComprats.splice(id, 1);
        },

        treureCantitat(id){
            this.total = Math.round(this.total - this.productesComprats[id].precio);
            this.productesComprats[id].cantidad = this.productesComprats[id].cantidad-1;
        },
        guardarLocalStorage(){
            localStorage.setItem('nombre',this.nombre);
            localStorage.setItem('email',this.email);
        },
        getLocalStorage(){
            this.nombre=localStorage.getItem('nombre');
            this.email=localStorage.getItem('email');
        },
        borrarLocalStorage(){
            localStorage.removeItem('nombre');
            localStorage.removeItem('email');

            this.nombre="";
            this.email="";
        }
    },
    created(){
        if (localStorage.getItem('nombre') && localStorage.getItem('email')) {
            this.getLocalStorage('nombre');
            this.getLocalStorage('email');
            this.localStorageSetted = true;  
        }else{
            this.localStorageSetted = false;  
        }
        getProductes().then(data =>  {
           this.productes=data
        },
        
    );
        
    }
}).mount('#app')