import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HeroContent = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [occupiedDates, setOccupiedDates] = useState([
        new Date(2024, 8, 5), // Ejemplo de fechas ocupadas
        new Date(2024, 8, 10),
        new Date(2024, 8, 15),
    ]);

    const isDateOccupied = (date) => {
        return occupiedDates.some((occupiedDate) => {
            return (
                date.getFullYear() === occupiedDate.getFullYear() &&
                date.getMonth() === occupiedDate.getMonth() &&
                date.getDate() === occupiedDate.getDate()
            );
        });
    };

    return (
        <div className="hero-content text-center py-5">
            <div className="container">
                {/* Encabezado principal */}
                <div className="hero-music">
                    <h1 className="display-4 font-weight-bold">
                        TU MÚSICA <br />
                        NUESTRO INSTRUMENTO
                    </h1>
                </div>

                {/* Barra de búsqueda */}
                <div className="search-bar mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3 mb-2">
                            <select className="form-select" defaultValue="">
                                <option value="" disabled>
                                    Instrumento
                                </option>
                                <option value="cuerda">Cuerda</option>
                                <option value="teclado">Teclado</option>
                                <option value="viento">Viento</option>
                                <option value="percusion">Percusión</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-2">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                filterDate={(date) => !isDateOccupied(date)}
                                className="form-control"
                                placeholderText="Fecha de inicio"
                            />
                        </div>
                        <div className="col-md-3 mb-2">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                filterDate={(date) => !isDateOccupied(date)}
                                className="form-control"
                                placeholderText="Fecha de entrega"
                            />
                        </div>
                        <div className="col-md-2 mb-2">
                            <button className="btn btn-primary w-100">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContent;
