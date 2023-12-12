import { useState } from "react";
import {
  getAllClusters,
  getAllRecords,
  setAllClusters,
  setAllRecords,
} from "./api/firebase.js";
import { useEffect } from "react";
import { Acordeone } from "./components/Acordeone.jsx";
import { test } from "./fuctions/index.js";

//grupos
//nombre
//id

//registro
//id
//nombre
//grupo
//portip

function App() {
  const [clusters, setClusters] = useState([]);
  const [records, setRecords] = useState([]);
  const [view, setView] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    cargarData();
  }, [reload]);

  const cargarData = async () => {
    const clus = await getAllClusters();
    setClusters(clus);
    const rec = await getAllRecords();
    setRecords(rec);

    const nombres = [];
    let ref = {};

    for (let i = 0; i < rec.length; i++) {
      const n = rec[i];
      const path =
        "http" + n.ssl
          ? "s"
          : "" + "://" + n.ip + n.port
          ? ":" + n.port
          : "" + "/" + n.complemento;
      const status = await test(path, n.clave);
      const use = { ...n, status };

      if (!nombres.includes(use.grupo)) {
        nombres.push(use.grupo);
        ref = { ...ref, [use.grupo]: [use] };
      } else {
        ref = { ...ref, [use.grupo]: [...ref[use.grupo], use] };
      }
    }

    const retorno = [];

    Object.keys(ref).map((n) => {
      retorno.push({
        nombre: clus.find((m) => m.id.toString() === n)?.nombre,
        registros: ref[n],
      });
    });

    setView(retorno);
  };

  const onSubmitGrupo = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const nombre = formData.get("nombreGrupo");

    if (clusters?.length > 0)
      setAllClusters(
        JSON.stringify([
          ...clusters,
          { nombre, id: clusters[clusters.length - 1].id + 1 },
        ])
      );
    else setAllClusters(JSON.stringify([...clusters, { nombre, id: 1 }]));
    setReload((n) => n + 1);
    form.reset();
    alert("Creado");
  };

  const onSubmitRecors = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const nombre = formData.get("nombreRegistro");
    const ip = formData.get("ip");
    const ssl = formData.get("ssl") === "on";
    const port = formData.get("port");
    const grupo = formData.get("grupo");
    const complemento = formData.get("complemento");
    const clave = formData.get("clave");

    if (records?.length > 0)
      setAllRecords(
        JSON.stringify([
          ...records,
          {
            ssl,
            ip,
            port,
            grupo,
            nombre,
            complemento,
            clave,
            id: records[records.length - 1].id ?? 0 + 1,
          },
        ])
      );
    else
      setAllRecords(
        JSON.stringify([
          ...records,
          {
            ssl,
            ip,
            port,
            grupo,
            nombre,
            complemento,
            clave,
            id: 1,
          },
        ])
      );
    setReload((n) => n + 1);
    form.reset();
    alert("Creado");
  };

  return (
    <main className="min-h-screen w-screen flex flex-col items-center pt-20 pb-40">
      <div className="py-10 flex justify-center items-center">
        <Table registros={view} />
      </div>
      <form
        onSubmit={(e) => onSubmitGrupo(e)}
        className="flex flex-col gap-2 w-[500px] p-2 border border-gray-500 rounded-md m-2"
        method="post"
        action="">
        <label>Nombre de grupo</label>
        <input
          className="border p-2"
          type="text"
          id="nombreGrupo"
          name="nombreGrupo"
        />
        <button className="border p-2 bg-green-500">Crear</button>
      </form>
      <form
        onSubmit={(e) => onSubmitRecors(e)}
        className="flex flex-col gap-2 w-[500px] p-2 border border-gray-500 rounded-md m-2"
        method="post"
        action="">
        <label>Nombre de registro</label>
        <input
          className="border p-2"
          type="text"
          id="nombreRegistro"
          name="nombreRegistro"
        />
        <label>ip</label>
        <input
          className="border p-2"
          type="text"
          id="ip"
          name="ip"
        />
        <label>port</label>
        <input
          className="border p-2"
          type="number"
          id="port"
          name="port"
        />
        <label>Complemento</label>
        <input
          className="border p-2"
          type="string"
          id="complemento"
          name="complemento"
        />
        <label>Clave</label>
        <input
          className="border p-2"
          type="string"
          id="clave"
          name="clave"
        />
        <label>SSL</label>
        <div className="flex justify-start items-center">
          <input
            className="border p-2"
            type="checkbox"
            id="ssl"
            name="ssl"
          />
        </div>
        <label>Grupo</label>
        <select
          className="border p-2"
          type="number"
          id="grupo"
          name="grupo">
          <option value="0">Ninguno</option>
          {clusters &&
            clusters?.map((n, i) => {
              return (
                <option
                  key={i}
                  value={n.id}>
                  {n.nombre}
                </option>
              );
            })}
        </select>
        <button className="border p-2 bg-green-500">Crear</button>
      </form>
    </main>
  );
}

export default App;

const Table = (props) => {
  const { registros } = props;

  return (
    <div className="w-full flex flex-col">
      {registros.map(({ nombre, registros }, i) => {
        return (
          <Acordeone
            key={i}
            title={nombre}>
            <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="min-w-[1400px] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Codigo unico
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    estatus
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    IP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    PORT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Complemento
                  </th>
                </tr>
              </thead>
              <tbody>
                {registros &&
                  registros?.map((n, i) => {
                    return (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {n.id}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <span
                            className={`${
                              n?.status ? "bg-green-500" : "bg-red-500"
                            } px-2 py-1 text-xs text-white rounded-full `}>
                            {n?.status ? "Activo" : "Desactivo"}
                          </span>
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {n.nombre}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {n.ip}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {n.port}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {n?.complemento}
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Acordeone>
        );
      })}
    </div>
  );
};
