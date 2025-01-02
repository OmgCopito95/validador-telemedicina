import React from "react";
import { useLocation } from "react-router-dom";
import "./styles/styles.css";
import logo from "../assets/images/logo.png";

const DocumentoValido = () => {
    const location = useLocation();
    const result = location.state; 

    return (
        <div className="container py-5 d-flex flex-column justify-content-between">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                    <img className="img-fluid" src={logo} alt="Logo" />
                </div>
            </div>

            <div className="contendor-texto row mt-5 px-3 px-md-0 justify-content-center">
                <div className="col-12 col-md-6">
                    <h1 className="titulo text-center">
                        <strong>
                            <i>Documento válido</i>
                        </strong>
                    </h1>
                    <h2 className="text-secondary text-center h3 m-0">
                        El documento es válido
                    </h2>
                    <p className="contenido text-center mt-5">
                        Este documento se emitió en
                        <br />
                        <strong>Mi Salud Digital Bonaerense</strong> para
                        <strong>
                            <br />
                            {result.nombrePaciente} <br />
                            Tipo: {result.tipoDocumento} <br />
                            Documento: {result.numeroDocumento} <br />
                            Profesional: {result.nombreApellidoMedico} <br />
                            Matrícula: {result.matriculaProfesional}
                        </strong>
                    </p>
                </div>
            </div>

            <div className="row justify-content-center px-3 px-md-0 mt-4">
                <button
                    type="button"
                    className="boton col-12 col-md-3 py-3 btn btn-lg btn-primary"
                    onClick={() => window.history.back()}
                >
                    Aceptar
                </button>
            </div>

            <div className="row mt-5 justify-content-center">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <a
                        href="#"
                        className="link-home"
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.back();
                        }}
                    >
                        <i className="bi bi-arrow-return-left"></i> Volver atrás
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DocumentoValido;
