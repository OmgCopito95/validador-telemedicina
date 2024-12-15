import React from 'react';
import './styles/styles.css'; 
import logo from '../assets/images/logo.png';

const DocumentoInvalido = () => {
  return (
    <div className="container py-5 d-flex flex-column justify-content-between">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <img className="img-fluid" src={logo} alt="Logo" />
        </div>
      </div>

      <div className="contendor-texto row px-3 px-md-0 justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <h1 className="titulo-invalido text-center">
            <strong>
              <i>Documento no válido</i>
            </strong>
          </h1>
          <h2 className="text-secondary text-center h3 m-0 mt-4">
            El código ingresado no corresponde a un documento válido
          </h2>
        </div>
      </div>

      <div className="row justify-content-center px-3 px-md-0">
        <button
          type="button"
          className="boton col-12 col-md-3 py-3 btn btn-lg btn-primary"
          onClick={() =>
            window.location.href = "https://www.ms.gba.gov.ar/sitios/misalud/"
          }
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default DocumentoInvalido;
