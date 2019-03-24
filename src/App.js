import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import './App.css'

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false
  }

  consultarAPI = async () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=11728625-e30c9b644d1b7dc736aa789bc&q=${termino}&per_page=30&page=${pagina}`;
   
    await fetch(url)
          .then(respuesta => {
            this.setState({
              cargando: true
            });
            return respuesta.json()
          })
          .then(resultado => {
            setTimeout(() => {
              this.setState({
                imagenes: resultado.hits,
                cargando: false
              })
            }, 2000);
          })
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina: 1
    }, () => {
      this.consultarAPI();
    }) 
  }

  paginaAnterior = () => {
    // Leemos el state
    let pagina = this.state.pagina;
    // Si es la pagina 1, ya no podemos retroceder
    if (pagina === 1) return null;


    // Restar a la pagina actual
    pagina--;

    // Agregar al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    })
    
  }

  paginaSiguiente = () => {
    // Leemos el state
    let pagina = this.state.pagina;

    // Incrementar la pagina actual
    pagina++;

    // Agregar al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    })
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  render() {

    const cargando = this.state.cargando;

    let resultado;
    

    if (cargando) {
      resultado = <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
    } else {
      resultado = <Resultado
                    imagenes={this.state.imagenes}
                    paginaAnterior={this.paginaAnterior}
                    paginaSiguiente={this.paginaSiguiente}
                  />
    }

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>

        <div className="row justify-content-center">
          {resultado}
        </div>

      </div>
    );
  }
}

export default App;
