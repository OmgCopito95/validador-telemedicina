import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/styles.css";
import logo from "../assets/images/logo.png";

const Formulario = () => {
  const [formData, setFormData] = useState({
    codigoValidacion: "",
    fechaDocumento: "",
    captcha: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const URL_FETCH =
    "https://dev-telemedicina.ms.gba.gov.ar/api/validador-documentos/validate-codigo-documento";

  const navigate = useNavigate();

  // manejo cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // manejo el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("codigoValidacion", formData.codigoValidacion);
      data.append("fechaDocumento", formData.fechaDocumento);
      data.append("h-captcha-response", formData.captcha);

      const response = await fetch(URL_FETCH, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const resultData = await response.json();

      if (resultData.estado === "SUCCESS") {
        navigate("/documento-valido", { state: resultData }); // si esta valido, va a la pagina de valido
      } else {
        navigate("/documento-invalido"); // si no es valido, va a la pagina de invalido
      }
    } catch (err) {
      console.error("Error al validar el documento:", err);
      navigate("/documento-invalido"); // si hay un error, va a invalido
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5 d-flex flex-column justify-content-between">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <img className="img-fluid" src={logo} alt="Logo" />
        </div>
      </div>

      {/* formulario */}
      <div className="row mt-5 px-3 px-md-0 justify-content-center">
        <div className="col-12 col-md-6">
          <form
            onSubmit={handleSubmit}
            className="contenedor-formulario row d-flex flex-column justify-content-between align-items-center"
          >
            {/* inputs */}
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

            {/* captcha */}
            {/* <div className="row p-0 justify-content-center">
              <div className="col-12 col-md-6">
                <div className="captcha d-flex justify-content-center align-items-center text-white">
                  CAPTCHA
                </div>
              </div>
            </div> */}

            {/* boton */}
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
