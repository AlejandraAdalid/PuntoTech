  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
      {
        path: '/home/',
        url: 'home.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var datosGlobal = "";

var db = firebase.firestore();




// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");


});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);






   // Variables
   const carrito = document.querySelector('#carrito');
   const listaCursos = document.querySelector('#lista-cursos');
   const contenedorCarrito = document.querySelector('#lista-carrito tbody');
   const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
   let articulosCarrito = [];
   
   // Listeners
   cargarEventListeners();
   
   function cargarEventListeners() {
        // Dispara cuando se presiona "Agregar Carrito"
        listaCursos.addEventListener('click', agregarCurso);
   
        // Cuando se elimina un curso del carrito
        carrito.addEventListener('click', eliminarCurso);
   
        // Al Vaciar el carrito
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
   
   }
   
   
   
   
   // Funciones
   // Función que añade el curso al carrito
   function agregarCurso(e) {
        e.preventDefault();
        // Delegation para agregar-carrito
        if(e.target.classList.contains('agregar-carrito')) {
             const curso = e.target.parentElement.parentElement;
             // Enviamos el curso seleccionado para tomar sus datos
             leerDatosCurso(curso);
        }
   }
   
   // Lee los datos del curso
   function leerDatosCurso(curso) {
        const infoCurso = {
             imagen: curso.querySelector('img').src,
             titulo: curso.querySelector('h4').textContent,
             precio: curso.querySelector('.precio span').textContent,
             id: curso.querySelector('a').getAttribute('data-id'), 
             cantidad: 1
        }
   
   
        if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
             const cursos = articulosCarrito.map( curso => {
                  if( curso.id === infoCurso.id ) {
                       curso.cantidad++;
                        return curso;
                   } else {
                        return curso;
                }
             })
             articulosCarrito = [...cursos];
        }  else {
             articulosCarrito = [...articulosCarrito, infoCurso];
        }
   
        console.log(articulosCarrito)
   
        
   
        // console.log(articulosCarrito)
        carritoHTML();
   }
   
   // Elimina el curso del carrito en el DOM
   function eliminarCurso(e) {
        e.preventDefault();
        if(e.target.classList.contains('borrar-curso') ) {
             // e.target.parentElement.parentElement.remove();
             const cursoId = e.target.getAttribute('data-id')
             
             // Eliminar del arreglo del carrito
             articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
   
             carritoHTML();
        }
   }
   
   
   // Muestra el curso seleccionado en el Carrito
   function carritoHTML() {
   
        vaciarCarrito();
   
        articulosCarrito.forEach(curso => {
             const row = document.createElement('tr');
             row.innerHTML = `
                  <td>  
                       <img src="${curso.imagen}" width=100>
                  </td>
                  <td>${curso.titulo}</td>
                  <td>${curso.precio}</td>
                  <td>${curso.cantidad} </td>
                  <td>
                       <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                  </td>
             `;
             contenedorCarrito.appendChild(row);
        });
   
   }
   
   // Elimina los cursos del carrito en el DOM
   function vaciarCarrito() {
        // forma lenta
        // contenedorCarrito.innerHTML = '';
   
   
        // forma rapida (recomendada)
        while(contenedorCarrito.firstChild) {
             contenedorCarrito.removeChild(contenedorCarrito.firstChild);
         }
   }
   
   
   // Agregamos el listener para la barra de busqueda
   document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (card) => card.getElement().dataset.etiquetas.includes(busqueda) );
   });
   
   
   
    
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    
    $$('#btnLogin').on('click', fnLogin);
    $$('#btnIndex').on('click', fnRegistro);
    
})


function fnRegistro() {
    em = $$('#emailRegistration').val();
    pa = $$('#passwordRegistration').val();


    firebase.auth().createUserWithEmailAndPassword(em, pa)
        .then( function() {
          alert("registro ok");
          app.popup.close(".popup-registro");
          app.views.main.router.navigate("/home/");
            
        })

        .catch(function(error) {          
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message; 
            if (errorCode == 'auth/weak-password') { 
                alert('Clave muy débil.');
            } else {
                alert(errorCode + "|" + errorMessage);
            }
            console.log(error);
        });
      
        
}


function fnLogin() {
    email = $$('#emailLogin').val();
    password = $$('#passwordLogin').val();

    firebase.auth().signInWithEmailAndPassword(email, password)

      .then((user) => {
        app.views.main.router.navigate("/home/");
        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/user-not-found') { 
                alert('Clave o contraseña incorrecta');
            } else {
                (errorCode == 'auth/invalid-email')
                alert("Por favor escriba bien su Email");
            }
            conso
        alert(errorCode);
      });

}






