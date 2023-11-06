const opcionesFiltros = document.querySelectorAll(".btn-contenedor_filtros button");
const nombreFiltro = document.querySelector(".nom-filtro");

const rangoFiltro = document.querySelector(".rango-filtro");
const valorRango = document.querySelector(".valor-rango");

const fileInput = document.querySelector(".file-input");
const btnElegirImg = document.querySelector(".btn-elegir-img");
const previewImg = document.querySelector(".preview-img");

const rotacionImg = document.querySelectorAll(".contenedor-btn-rotacion-img button")

const btnRestFiltro = document.querySelector(".btn-res-filtro");

const btnGuardarImg = document.querySelector(".btn-guardar-img");

let brillo = 100, saturacion = 100, inversion = 0, escaleDeGrises = 0;
let rotate = 0, horizontal = 1, vertical = 1;

const aplicarFiltro = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical })`;
    previewImg.style.filter = `brightness(${brillo}%) saturate(${saturacion}%) invert(${inversion}%) grayscale(${escaleDeGrises}%)`
}

const cargarImg = ()=>{
    let archivo = fileInput.files[0];

    if(!archivo) return;

    previewImg.src = URL.createObjectURL(archivo); 

    previewImg.addEventListener("load", ()=>{
        document.querySelector(".contenedor").classList.remove("desactivado");
    })
}

opcionesFiltros.forEach(option =>{
    option.addEventListener("click", ()=>{
        document.querySelector(".btn-contenedor_filtros .activado").classList.remove("activado");
        option.classList.add("activado");
       
        nombreFiltro.innerText = option.innerText;

        if(option.id == "brillo"){
            rangoFiltro.max = "200";
            rangoFiltro.value = brillo;
            valorRango.innerText = brillo + "%"
        }
        if(option.id == "saturacion"){
            rangoFiltro.max = "200";
            rangoFiltro.value = saturacion;
            valorRango.innerText = saturacion + "%"
        }
        if(option.id == "inversion"){
            rangoFiltro.max = "100";
            rangoFiltro.value = inversion;
            valorRango.innerText = inversion + "%"
        }
        if(option.id == "escaledegrises"){
            rangoFiltro.max = "100";
            rangoFiltro.value = escaleDeGrises;
            valorRango.innerText = escaleDeGrises + "%"
        }
    })
})

const actuFiltro = ()=>{
    valorRango.innerText = rangoFiltro.value + "%";

    const filtroSelect = document.querySelector(".btn-contenedor_filtros .activado");

    if(filtroSelect.id === "brillo"){

        brillo = rangoFiltro.value;

    }else if(filtroSelect.id === "saturacion"){

        saturacion = rangoFiltro.value;
        
    }else if(filtroSelect.id === "inversion"){
        
        inversion = rangoFiltro.value;

    }else if(filtroSelect.id === "escaledegrises"){
     
        escaleDeGrises = rangoFiltro.value;

    }
    aplicarFiltro();
}

const resetFiltro = () =>{
    brillo = 100, saturacion = 100, inversion = 0, escaleDeGrises = 0;
    rotate = 0, horizontal = 1, vertical = 1;

    opcionesFiltros[0].click();
    aplicarFiltro();
}

const guardarImg = () =>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.filter = `brightness(${brillo}%) saturate(${saturacion}%) invert(${inversion}%) grayscale(${escaleDeGrises}%)`;
    ctx.scale(horizontal, vertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height /2,canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "imagen.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

rotacionImg.forEach(option =>{
    option.addEventListener("click", ()=>{
        if(option.id == "left"){
            rotate -=90;
        }else if(option.id == "right"){
            rotate +=90
        }else if(option.id == "vertical"){
            horizontal = horizontal === 1 ? -1 : 1;
        }else if(option.id == "horizontal"){
            vertical = vertical === 1 ? -1 : 1;
        }
        aplicarFiltro();
    })
})

rangoFiltro.addEventListener("input", actuFiltro);

fileInput.addEventListener("change", cargarImg);

btnElegirImg.addEventListener("click", ()=> fileInput.click());

btnRestFiltro.addEventListener("click", resetFiltro);

btnGuardarImg.addEventListener("click", guardarImg)