import { useState } from "react";
import { Button, Card, Select, Pagination } from "antd";
import { FaTable } from "react-icons/fa";
import RegistroMesaModal from "@/components/RegistroMesaModal";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdPointOfSale, MdTableBar } from "react-icons/md";
import { GiForkKnifeSpoon } from "react-icons/gi";

const { Option } = Select;

const AREAS = ["Todas", "Comedor", "Terraza", "1er Piso"];

const ControlComandero: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mesas, setMesas] = useState<any[]>([
    { nombre: "G5", personas: 5, area: "Comedor" },
    { nombre: "S15", personas: 1, area: "Terrazas" },
    { nombre: "L45", personas: 1, area: "Terrazas" },
    { nombre: "POY45", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
    { nombre: "MESA 05", personas: 1, area: "Terrazas" },
  ]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("Todas");
  const [paginaActual, setPaginaActual] = useState(1);
  const viewPaginate = 10;
  const mesasFiltradas =
    areaSeleccionada === "Todas"
      ? mesas
      : mesas.filter((m) => m.area === areaSeleccionada);

  const mesasPaginadas = mesasFiltradas.slice(
    (paginaActual - 1) * viewPaginate,
    paginaActual * viewPaginate
  );

  return (
    <>
      <div className="w-full bg-blue-800 px-4 py-2">
        <h1 className="font-bold">
          <span className="text-white text-3xl">GrowthSuite</span>
          <span className="text-yellow-500 text-3xl">Comandero</span>
        </h1>
      </div>
      <div className="p-6 bg-gray-200 min-h-screen">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-5">
            <div className="flex items-center mb-4 gap-4">
              <Button
                type="primary"
                className="bg-blue-800"
                onClick={() => setModalVisible(true)}
              >
                <MdTableBar /> Abrir Mesa
              </Button>
              <Button
                className="bg-blue-800"
                // onClick={() => setModalVisible(true)}
              >
                <MdPointOfSale /> Mis ventas
              </Button>
              <Button
                className="bg-blue-800"
                // onClick={() => setModalVisible(true)}
              >
                <GiForkKnifeSpoon /> Monitoreo de pedidos
              </Button>
            </div>
            <div className="filter my-4">
              <Select
                defaultValue="Todas"
                value={areaSeleccionada}
                onChange={setAreaSeleccionada}
                className="w-40"
              >
                {AREAS.map((area) => (
                  <Option key={area} value={area}>
                    {area}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mesasPaginadas.map((mesa, i) => (
                <Card key={i} className="text-center shadow">
                  <FaTable className="text-4xl text-blue-500 mx-auto" />
                  <p className="font-bold mt-2">{mesa.nombre}</p>
                  <p>{mesa.personas} personas</p>
                  <p className="text-sm text-gray-500">{mesa.area}</p>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Pagination
                current={paginaActual}
                total={mesasFiltradas.length}
                pageSize={15}
                onChange={setPaginaActual}
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-6 bg-gray-100 p-4">
            <Card title="Mesero" bordered className="w-40 text-center w-full">
              <p className="text-lg font-bold">Jampier Me</p>
            </Card>
            <div className="w-full">
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-bold flex items-center gap-2 ">
                <FaMapLocationDot /> Mapa de mesas
              </button>
            </div>
          </div>
        </div>

        <RegistroMesaModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onRegistrar={(mesa) => {
            setMesas([...mesas, mesa]);
            setModalVisible(false);
          }}
        />
      </div>
    </>
  );
};

export default ControlComandero;
