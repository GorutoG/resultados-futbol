
import { useState } from "react";
import "./App.css";

function App() {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [equipoVisitanteSeleccionado, setEquipoVisitanteSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [partidos, setPartidos] = useState([]);
  const [filtroEquipo, setFiltroEquipo] = useState("");

  const equipos = [
    {
      nombre: "Barcelona",
      id: 1,
      ciudad: "Barcelona",
      estadio: "Camp Nou",
      escudo: "https://thumb.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/500px-FC_Barcelona_%28crest%29.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
    },
    {
      nombre: "Real Madrid",
      id: 2,
      ciudad: "Madrid",
      estadio: "Santiago Bernabéu",
      escudo: "https://thumb.wikimedia.org/wikipedia/sco/thumb/5/56/Real_Madrid_CF.svg/500px-Real_Madrid_CF.svg.png?utm_source=sco.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
    },
    {
      nombre: "Atlético de Madrid",
      id: 3,
      ciudad: "Madrid",
      estadio: "Riyadh Air Metropolitano",
      escudo: "https://upload.wikimedia.org/wikipedia/an/f/f4/Atletico_Madrid_2017_logo.svg?utm_source=an.wikipedia.org&utm_campaign=index&utm_content=original"
    },
    {
      nombre: "Manchester City",
      id: 4,
      ciudad: "Manchester",
      estadio: "Etihad Stadium",
      escudo: "https://thumb.wikimedia.org/wikipedia/sco/thumb/e/eb/Manchester_City_FC_badge.svg/3840px-Manchester_City_FC_badge.svg.png?utm_source=sco.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
    },
    {
      nombre: "Arsenal",
      id: 5,
      ciudad: "Londres",
      estadio: "Emirates Stadium",
      escudo: "https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png?utm_source=hif.wikipedia.org&utm_campaign=index&utm_content=original"
    },
    {
      nombre: "Bayern Munich",
      id: 6,
      ciudad: "Munich",
      estadio: "Allianz Arena",
      escudo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1280px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
    }
  ];

  const equiposFiltrados = equipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const partidosFiltrados = partidos.filter((partido) =>
    filtroEquipo === "" ||
    partido.equipoLocal === Number(filtroEquipo) ||
    partido.equipoVisitante === Number(filtroEquipo)
  );

  const registrarPartido = () => {
    if (
      equipoSeleccionado === null ||
      equipoVisitanteSeleccionado === null
    ) {
      alert("Debes seleccionar los dos equipos");
      return;
    }

    if (equipoSeleccionado === equipoVisitanteSeleccionado) {
      alert("Los equipos deben ser diferentes");
      return;
    }

    if (
      golesLocal.trim() === "" ||
      golesVisitante.trim() === "" ||
      !Number.isInteger(Number(golesLocal)) ||
      !Number.isInteger(Number(golesVisitante)) ||
      Number(golesLocal) < 0 ||
      Number(golesVisitante) < 0
    ) {
      alert("Ingresa goles enteros y no negativos para ambos equipos");
      return;
    }

    const nuevoPartido = {
      id: Date.now(),
      equipoLocal: Number(equipoSeleccionado),
      equipoVisitante: Number(equipoVisitanteSeleccionado),
      golesLocal: Number(golesLocal),
      golesVisitante: Number(golesVisitante)
    };

    setPartidos([...partidos, nuevoPartido]);
    setEquipoSeleccionado(null);
    setEquipoVisitanteSeleccionado(null);
    setGolesLocal("");
    setGolesVisitante("");

    alert("¡Partido registrado correctamente!");
  };

  const eliminarPartido = (id) => {
    setPartidos(partidos.filter((partido) => partido.id !== id));
  };

  // Calcular las estadísticas de cada equipo
  const tablaPosiciones = equipos
    .map((equipo) => {
      const estadisticas = {
        ...equipo,
        PJ: 0,
        PG: 0,
        PE: 0,
        PP: 0,
        GF: 0,
        GC: 0,
        DG: 0,
        PTS: 0
      };

      partidos.forEach((partido) => {
        if (
          partido.equipoLocal !== equipo.id &&
          partido.equipoVisitante !== equipo.id
        ) {
          return;
        }

        estadisticas.PJ++;

        let golesEquipo;
        let golesRival;

        if (partido.equipoLocal === equipo.id) {
          golesEquipo = partido.golesLocal;
          golesRival = partido.golesVisitante;
        } else {
          golesEquipo = partido.golesVisitante;
          golesRival = partido.golesLocal;
        }

        estadisticas.GF += golesEquipo;
        estadisticas.GC += golesRival;

        if (golesEquipo > golesRival) {
          estadisticas.PG++;
          estadisticas.PTS += 3;
        } else if (golesEquipo === golesRival) {
          estadisticas.PE++;
          estadisticas.PTS++;
        } else {
          estadisticas.PP++;
        }
      });

      estadisticas.DG = estadisticas.GF - estadisticas.GC;

      return estadisticas;
    })
    .sort(
      (a, b) =>
        b.PTS - a.PTS ||
        b.DG - a.DG ||
        b.GF - a.GF
    );

  return (
    <div className="app">
      <header className="header">
        <h1>⚽ FútbolStats</h1>
        <p>
          Registra partidos, consulta resultados y revisa
          la tabla de posiciones.
        </p>

        <nav>
          <a href="#teams">Equipos</a>
          <a href="#registro">Registrar partido</a>
          <a href="#historial">Historial</a>
          <a href="#posiciones">Posiciones</a>
        </nav>
      </header>

      <main>
        <section id="registro" className="seccion">
          <h2>Registrar partido</h2>

          <div className="controles">
            <select
              value={equipoSeleccionado ?? ""}
              onChange={(e) =>
                setEquipoSeleccionado(
                  e.target.value === ""
                    ? null
                    : Number(e.target.value)
                )
              }
            >
              <option value="">Selecciona equipo local</option>

              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="0"
              step="1"
              placeholder="Goles local"
              value={golesLocal}
              onChange={(e) => setGolesLocal(e.target.value)}
            />

            <span>VS</span>

            <input
              type="number"
              min="0"
              step="1"
              placeholder="Goles visitante"
              value={golesVisitante}
              onChange={(e) => setGolesVisitante(e.target.value)}
            />

            <select
              value={equipoVisitanteSeleccionado ?? ""}
              onChange={(e) =>
                setEquipoVisitanteSeleccionado(
                  e.target.value === ""
                    ? null
                    : Number(e.target.value)
                )
              }
            >
              <option value="">Selecciona equipo visitante</option>

              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>

            <button onClick={registrarPartido}>
              Registrar resultado
            </button>
          </div>
        </section>

        <section id="teams" className="seccion">
          <h2>Equipos participantes</h2>

          <input
            type="text"
            placeholder="Buscar equipo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="equipos-grid">
            {equiposFiltrados.map((equipo) => (
              <article className="equipo-card" key={equipo.id}>
                <img
                  src={equipo.escudo}
                  alt={`Escudo de ${equipo.nombre}`}
                />
                <h3>{equipo.nombre}</h3>
                <p>Ciudad: {equipo.ciudad}</p>
                <p>Estadio: {equipo.estadio}</p>
              </article>
            ))}

            {equiposFiltrados.length === 0 && (
              <p>No se encontraron equipos.</p>
            )}
          </div>
        </section>

        <section id="historial" className="seccion">
          <h2>Historial de resultados</h2>

          <label htmlFor="filtroEquipo">
            Filtrar por equipo:
          </label>

          <select
            id="filtroEquipo"
            value={filtroEquipo}
            onChange={(e) => setFiltroEquipo(e.target.value)}
          >
            <option value="">Todos los equipos</option>

            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>

          {partidosFiltrados.length === 0 ? (
            <p>No hay partidos para mostrar.</p>
          ) : (
            <div className="historial-lista">
              {partidosFiltrados.map((partido) => {
                const local = equipos.find(
                  (equipo) => equipo.id === partido.equipoLocal
                );

                const visitante = equipos.find(
                  (equipo) => equipo.id === partido.equipoVisitante
                );

                return (
                  <article
                    className="partido-card"
                    key={partido.id}
                  >
                    <div className="equipo-partido">
                      <img src={local.escudo} alt="" />
                      <span>{local.nombre}</span>
                    </div>

                    <strong className="marcador">
                      {partido.golesLocal} - {partido.golesVisitante}
                    </strong>

                    <div className="equipo-partido">
                      <img src={visitante.escudo} alt="" />
                      <span>{visitante.nombre}</span>
                    </div>

                    <button
                      onClick={() => eliminarPartido(partido.id)}
                    >
                      Eliminar resultado
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section id="posiciones" className="seccion">
          <h2>Tabla de posiciones</h2>

          <p>
            Clasificación actualizada según los partidos registrados.
          </p>

          <div className="tabla-contenedor">
            <table className="tabla-posiciones">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Equipo</th>
                  <th>PJ</th>
                  <th>PG</th>
                  <th>PE</th>
                  <th>PP</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DG</th>
                  <th>PTS</th>
                </tr>
              </thead>

              <tbody>
                {tablaPosiciones.map((equipo, index) => (
                  <tr key={equipo.id}>
                    <td>{index + 1}</td>

                    <td className="nombre-equipo-tabla">
                      <img src={equipo.escudo} alt="" />
                      {equipo.nombre}
                    </td>

                    <td>{equipo.PJ}</td>
                    <td>{equipo.PG}</td>
                    <td>{equipo.PE}</td>
                    <td>{equipo.PP}</td>
                    <td>{equipo.GF}</td>
                    <td>{equipo.GC}</td>
                    <td>
                      {equipo.DG > 0
                        ? `+${equipo.DG}`
                        : equipo.DG}
                    </td>
                    <td><strong>{equipo.PTS}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {partidos.length === 0 && (
            <p>
              Todavía no hay partidos registrados. Registra un
              resultado para comenzar a calcular las estadísticas.
            </p>
          )}
        </section>
      </main>

      <footer>
        <p>FútbolStats © 2026 — Panel de resultados de fútbol</p>
      </footer>
    </div>
  );
}

export default App;
