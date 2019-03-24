import React, { Component } from 'react'
import Imagen from './Imagen';
import Navegacion from './Navegacion';

export class Resultado extends Component {

    mostrarImagenes = () => {
        const imagenes = this.props.imagenes;

        if(imagenes.length === 0) return null;

        return (
            <React.Fragment>
                <div id="resultado" className="col-12 p-5 row">
                    {this.props.imagenes.map(imagen => (
                        <Imagen 
                            key={imagen.id}
                            imagen={imagen}
                        />
                    ))}
                </div>
                <Navegacion 
                    paginaAnterior={this.props.paginaAnterior}
                    paginaSiguiente={this.props.paginaSiguiente}
                />
            </React.Fragment>
        )
        
        
    }

  render() {
    return (
      <React.Fragment>
        {this.mostrarImagenes()}
      </React.Fragment>
    )
  }
}

export default Resultado
