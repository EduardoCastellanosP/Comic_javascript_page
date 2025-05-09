import { personajes } from './db.js';

class BuscarPersona extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});

        const containergeneral = document.createElement('div');
        const titulo = document.createElement('h1');
        titulo.textContent = 'SuperHeroe';
        containergeneral.appendChild(titulo);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search';
        containergeneral.appendChild(input);

        const boton = document.createElement('button');
        boton.innerHTML = 'Go';
        containergeneral.appendChild(boton);

        const style = document.createElement('style');
        style.textContent = `
            div {
                border: 1px solid rgb(94, 94, 94);
                background-image: url(imagenes/superheroes-de-dc-comics_2400x1350_xtrafondos.com.jpg);
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                color: rgb(255, 255, 255);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            h1 {
                color: rgb(204, 255, 0);
                padding-left: 24px;
                font-weight: 100px;
            }

            input {
                display: flex;
                width: 450px;
                height: 50px;
                margin-top: 10px;
                margin-left: 30px;
                border-radius: 20px;
                font-size: 1rem;
                color: rgb(204, 255, 0);
                background-image: url(imagenes/black-adam-contra-superman_3840x2160_xtrafondos.com.jpg);
                background-size: 470px 100px;
                background-repeat: no-repeat;
                background-position: center;
                text-transform: capitalize;
                padding-left: 15px;
                border: none;
            }

            button {
                height: 40px;
                padding: 0px 15px;
                margin-left: 20px;
                background-color: rgb(204, 255, 0);
                color: black;
                border: none;
                border-radius: 20px;
                font-size: 1rem;
                cursor: pointer;
                margin-top: 10px;
            }

            button:hover {
                background-color: rgb(255, 255, 0);
                color: black;
            }

            @media (max-width: 768px) {
            div {
            
            display:flex;
            flex-direction:column;
            
            }
            h1{
            font-size:50px;
           
            }    
            input {
                    width: 100%;
                    margin-left: 0;
                }
                button {
                    width: 50%;
                    margin-left: 0;
                }
            }


        `;

        shadow.appendChild(containergeneral);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const input = this.shadowRoot.querySelector('input');
        const boton = this.shadowRoot.querySelector('button');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let valorInput = input.value.trim();
                console.log(valorInput);
                this.buscarHeroe(valorInput);
            }
        });

        boton.addEventListener('click', () => {
            const valorInput = input.value.trim();
            this.buscarHeroe(valorInput);
        });
    }

    

    buscarHeroe(valorInput) {
        const contenedorHero = document.querySelector('#contenedorheroe');
        let heroe = personajes.find(personaje => personaje.nombre_personaje.toLowerCase() === valorInput.toLowerCase());
         function recarga() {
         location.reload();
                    }
        
        contenedorHero.innerHTML = '';

        if (heroe) {
            const tarjeta = document.createElement('heroe-card');
            tarjeta.setAttribute('nombreheroe', heroe.nombre_personaje);
            tarjeta.setAttribute('foto', heroe.imagen);
            tarjeta.setAttribute('nombrereal', heroe.nombre_real);
            tarjeta.setAttribute('universo', heroe.casa);
            tarjeta.setAttribute('anioaparicion', heroe.anio_aparicion);
            tarjeta.setAttribute('descripcionbreve', heroe.descripcion_resumen);
             tarjeta.setAttribute('descripcioncompleta', heroe.descripcion_completa);

            // Agregar la tarjeta al contenedor
            contenedorHero.appendChild(tarjeta);
        } else {
            alert("Heroe no encontrado");
            contenedorHero.style.display === 'block';
            recarga();

        }

       
    }
}

customElements.define('buscar-person', BuscarPersona);


class HeroeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/`
      <style>

      .contenedor{
          position: relative;
    overflow: hidden;
    border: 0px;
      }

       .contenedor::before{
        content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('imagenes/Marvel_Studios_Logo_29.png');
    background-size: cover;
    background-position: center;
    filter: blur(8px); /* Aquí aplicas el desenfoque */
    z-index: -1;
      }
        .card {
          width: 500px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 10px  rgba(0,0,0,0.1);
           background-color: rgba(0, 0, 0, 0.67);
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top:30px;
     
         
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          color:rgb(255, 255, 255);
        }

        img {
          width: 500px;
          height: 500px;
          object-fit: contain;
          border-radius: 25px;
          margin-bottom: 10px;
        }

        .info {
          font-size: 1rem;
          color: rgb(255, 255, 255);
          margin: 6px 0;
        }

        button {
          margin-top: 12px;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background-color:rgb(255, 255, 0) ;
          color: black;
          font-size: 1rem;
          cursor: pointer;
         
        }

        button:hover {
          background-color: rgb(255, 5, 5);
        }

        @media (max-width: 768px) {
         
         
         
          .card {
            width: 250px;
          
         
          border-radius: 16px;
          box-shadow: 0 4px 10px  rgba(0,0,0,0.1);
           background-color: rgba(0, 0, 0, 0.67);
          font-family: Arial, sans-serif;
          text-align: center;
          
          }

            img {
          width: 250px;
          height: 500px;
          object-fit: contain;
          border-radius: 25px;
          margin-bottom: 10px;
          border-radius:25px;
        }


        }



        

      </style>
<div class="contenedor"> 
      <div class="card">
        <h2 id="nombreheroe">Nombre del Héroe</h2>
        <img id="foto" src="imagenes/ejemplo.jpg" alt="Nombre del Héroe">
        <div id="nombrereal" class="info"><strong>Nombre real:</strong> Nombre Persona</div>
        <div id="universo" class="info"><strong>Universo:</strong> Marvel o DC</div>
        <div id="anioaparicion" class="info"><strong>Año aparicion:</strong> </div>
        <div id="descripcionbreve" class="info">Descripción breve del personaje.</div>
        <button>Ver más</button>
      </div>
</div>


    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#nombreheroe').textContent = this.getAttribute('nombreheroe');
    this.shadowRoot.querySelector('#foto').src = this.getAttribute('foto');
    this.shadowRoot.querySelector('#nombrereal').textContent = `Nombre real: ${this.getAttribute('nombrereal')}`;
    this.shadowRoot.querySelector('#universo').textContent = `Universo: ${this.getAttribute('universo')}`;
    this.shadowRoot.querySelector('#anioaparicion').textContent = `Año de aparicion: ${this.getAttribute('anioaparicion')}`
    this.shadowRoot.querySelector('#descripcionbreve').textContent = this.getAttribute('descripcionbreve');
    
  this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.mostrarIndividualCard();
    });
  }

  mostrarIndividualCard() {
    
    document.querySelector('buscar-person').style.display = 'none';
    document.querySelector('#contenedorheroe').style.display = 'none';
     document.querySelector('#contenedor-footer').style.display = 'none';

    const individualCard = document.createElement('individual-card');
    individualCard.setAttribute('nombreheroe', this.getAttribute('nombreheroe'));
    individualCard.setAttribute('nombrereal', this.getAttribute('nombrereal'));
    individualCard.setAttribute('universo', this.getAttribute('universo'));
    individualCard.setAttribute('anioaparicion', this.getAttribute('anioaparicion'));
    individualCard.setAttribute('descripcioncompleta', this.getAttribute('descripcioncompleta'));
    individualCard.setAttribute('imagen', this.getAttribute('foto'));
    individualCard.setAttribute('video', 'imagenes/2421545-uhd_3840_2160_30fps.mp4');

    // Insertar el componente en el body o donde desees
    document.body.appendChild(individualCard);
  }
}

customElements.define('heroe-card', HeroeCard);


class individualcard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const nombre = this.getAttribute('nombreheroe');
    const real = this.getAttribute('nombrereal');
    const casa = this.getAttribute('universo');
    const anio = this.getAttribute('anioaparicion');
    const descripcion = this.getAttribute('descripcioncompleta');
    const imagen = this.getAttribute('imagen');
    const video = this.getAttribute('video');

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        #background-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .pagina {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          width: 1000px;
          height: 700px;
          margin: 120px auto;
          padding: 20px;
          border-radius: 16px;
          background-color: rgba(73, 73, 73, 0.5);
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .img {
          width: 400px;
          height: 500px;
          border-radius: 20px;
          margin-left: 30px;
          margin-top: 15px;
          object-fit: cover;
        }

        .nombreheroe {
          display: flex;
          flex-direction: column;
          margin-top: 50px;
          font-size: 5rem;
          padding-right: 60px;
        }

        .ladoizquierdo {
          margin-top: 100px;
          font-size: 1.5rem;
        }

        .nombrereal2 {
          font-size: 3rem;
        }

        .casa, .anioaparicion {
          margin-top: 25px;
        }

        .fulldescription {
          width: 400px;
          margin-top: 5px;
          margin-left: 25px;
          color: white;
          font-size: 1.2rem;
        }


        @media (max-width: 768px) {
          .pagina {
            display:flex;
            flex-direction:column;
              width: 350px;
          height: 500px;
          }

          .img {
            width: 250px;
          height: 450px;
          }

          .nombreheroe {
            padding-right: 0px;
          }

           .fulldescription {
          width: 300px;
          margin-top: 5px;
          margin-left: 10px;
          color: white;
          font-size: 0.8rem;
          text-align:center;
           padding-bottom: 50px;
          
        }

        .casa, .anioaparicion {
          margin-top: 5px;
           padding-bottom: 20px;
        }


        }





      </style>

      <video autoplay muted loop id="background-video">
        <source src="${video}" type="video/mp4">
        Tu navegador no soporta el video en HTML5.
      </video>

      <div class="pagina">
        <img class="img" id="foto" src="${imagen}" alt="Imagen del héroe">
        <h1 class="nombreheroe" id="nombreheroe">${nombre}
          <div class="ladoizquierdo">
            <p class="nombrereal2" id="nombrereal"> ${real}</p>    
            <p class="universo" id="universo"> ${casa}</p>  
            <p class="anioaparicion" id="anioaparicion"> ${anio}</p>
          </div>
        </h1>
        <h3 class="fulldescription" id="descripcionbreve">${descripcion}</h3>
      </div>
    `;
  }
}

customElements.define('individual-card', individualcard);
