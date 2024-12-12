import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHospitalSymbol,
  FaUsers,
  FaCity,
  FaGift,
  FaBookOpen,
} from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdDiscount } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";

import "../styles/sidebar.css";

function SideBar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`sidebar-nav navbar-collapse offcanvas-collapse ${
        isOpen ? "open" : "null"
      }`}
      style={{ zIndex: 10 }}
    >
      <label
        style={{
          padding: ".85rem 0",
          marginBottom: "1px",
          color: "var(--bs-secondary-color)",
          letterSpacing: "1px",
          fontWeight: "600",
        }}
      >
        Menú de navegación
      </label>
      <ul className="metismenu side-menu" id="side-menu">
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <FaHospitalSymbol
              className="sidebarIcons text-muted"
              size="1.25em"
            />{" "}
            Inicio
          </Link>
        </li>
        <li>
          <a
            aria-controls="collapseAgentes"
            aria-expanded="false"
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseAgentes"
            role="button"
          >
            <FaUsers className="sidebarIcons text-muted" size="1.50em" /> Datos
            Personales
          </a>
          <ul className="collapse sub-menu" id="collapseAgentes">
            <li>
              <Link to="/personas/carga-datos" onClick={() => setIsOpen(false)}>
                Buscar Personal
              </Link>
            </li>
            <li>
              <Link
                to="/personas/ver-TramitesPendientes"
                onClick={() => setIsOpen(false)}
              >
                Trámites Pendientes
              </Link>
            </li>
            <li>
              <Link
                to="/personas/ver-TramitesFinalizados"
                onClick={() => setIsOpen(false)}
              >
                Trámites Finalizados
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
