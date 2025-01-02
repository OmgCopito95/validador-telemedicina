import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import "./styles/styles.css";
import logo from "../assets/images/logo.png";

const Formulario = () => {
  const [formData, setFormData] = useState({
    codigoValidacion: "",
    fechaDocumento: "",
    captcha: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const navigate = useNavigate();

  const URL_FETCH =
    "https://misaluddigital.ms.gba.gov.ar/api/validador-documentos/validate-codigo-documento";
  const URL_CALLBACK =
    "https://sistemas.ms.gba.gov.ar/validador-telemedicina/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verificarCaptcha = (value) => {
    setFormData((prev) => ({ ...prev, captcha: value }));
  };

  const validateForm = () => {
    const { codigoValidacion, fechaDocumento, captcha } = formData;
    return (
      codigoValidacion.trim() !== "" &&
      fechaDocumento.trim() !== "" &&
      captcha.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setValidationResult(null);

    if (!validateForm()) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${URL_FETCH}?validationCode=${formData.codigoValidacion}&attentionDate=${formData.fechaDocumento}&captchaResponse=${formData.captcha}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      if (result.estado === "SUCCESS") {
        setValidationResult({
          estado: "SUCCESS",
          descripcion: result.descripcion,
          dniPaciente: result.dniPaciente,
          tipoDocumento: result.tipoDocumento,
          nombreApellidoMedico: result.nombreApellidoMedico,
          matriculaProfesional: result.matriculaProfesional,
        });
      } else {
        setValidationResult({ estado: "FAIL" });
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Hubo un problema en el servidor. Inténtalo nuevamente más tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (validationResult) {
    return (
      <div className="container py-5">
        {validationResult.estado === "SUCCESS" ? (
          <div className="container-valido">
            <h1 className="titulo-valido">Documento válido</h1>
            <p className="texto">El documento es válido</p>
            <div className="informacion-valido">
              <p>{validationResult.descripcion}</p>
              <p>Tipo: DNI {validationResult.dniPaciente}</p>
              <p>{validationResult.tipoDocumento}</p>
              <p>Profesional: {validationResult.nombreApellidoMedico}</p>
              <p>Matrícula: {validationResult.matriculaProfesional}</p>
            </div>
            <a
              className="text-decoration-none text-white btn btn-aceptar mt-1"
              href={URL_CALLBACK}
            >
              Aceptar
            </a>
            <a className="color-link mt-1" href={URL_CALLBACK}>
              Volver atrás
            </a>
          </div>
        ) : (
          <div className="container-invalido">
            <h1 className="titulo-invalido">Documento no válido.</h1>
            <p className="texto">
              El código ingresado no corresponde a un documento válido.
            </p>
            <a
              className="text-decoration-none text-white btn btn-aceptar"
              href={URL_CALLBACK}
            >
              Aceptar
            </a>
            <a className="color-link mt-1" href={URL_CALLBACK}>
              Volver atrás
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <img className="img-fluid" src={logo} alt="Logo" />
        </div>
      </div>

      <div className="row mt-5 px-3 px-md-0 justify-content-center">
        <div className="col-12 col-md-6">
          <form
            onSubmit={handleSubmit}
            className="contenedor-formulario row d-flex flex-column justify-content-between align-items-center"
          >
            <div className="row p-0">
              <div className="col-12 text-center">
                <label htmlFor="codigoValidacion" className="form-label">
                  Código de validación
                </label>
                <input
                  type="text"
                  className="form-control py-3"
                  id="codigoValidacion"
                  name="codigoValidacion"
                  placeholder="Ingresá el código"
                  required
                  minLength={8}
                  maxLength={8}
                  pattern=".{8}"
                  value={formData.codigoValidacion}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center mt-4">
                <label htmlFor="fechaDocumento" className="form-label">
                  Fecha del documento
                </label>
                <input
                  type="date"
                  className="form-control py-3"
                  id="fechaDocumento"
                  name="fechaDocumento"
                  required
                  value={formData.fechaDocumento}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row p-0 justify-content-center">
              <div className="col-12 col-md-6 captcha">
                <HCaptcha
                  sitekey="c84ca460-b2e2-46c0-94c6-91f03be6e746"
                  onVerify={verificarCaptcha}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}

            <div className="row justify-content-center p-0">
              <button
                type="submit"
                className="boton col-8 py-3 btn btn-lg btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
