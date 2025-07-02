import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Tag } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TecladoVirtual from "./TecladoVirtual";
import ComentarioProductoModal from "./ComentarioProductoModal (1)";

type Producto = {
  id: string;
  nombre: string;
  grupo: string;
  subgrupo?: string;
  categoria: "alimentos" | "bebidas" | "otros";
  unidad: string;
  precio: number;
  contieneIVA: boolean;
  areaImpresion: "cocina" | "barra";
  suspendido: boolean;
};

type ProductoSeleccionado = {
  producto: Producto;
  cantidad: number;
  tiempo: string;
  comentario?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  mesa: number;
};

const dummyProductos: Producto[] = [
  {
    id: "1",
    nombre: "Taco al Pastor",
    grupo: "Tacos",
    categoria: "alimentos",
    unidad: "pieza",
    precio: 30,
    contieneIVA: true,
    areaImpresion: "cocina",
    suspendido: false,
  },
  {
    id: "2",
    nombre: "Pizza Llorona",
    grupo: "Pizzas",
    subgrupo: "Especiales",
    categoria: "alimentos",
    unidad: "pieza",
    precio: 120,
    contieneIVA: true,
    areaImpresion: "cocina",
    suspendido: false,
  },
  {
    id: "3",
    nombre: "Agua Mineral",
    grupo: "Refrescos",
    categoria: "bebidas",
    unidad: "botella",
    precio: 25,
    contieneIVA: true,
    areaImpresion: "barra",
    suspendido: false,
  },
];

const CapturaComandaModal: React.FC<Props> = ({ visible, onClose, mesa }) => {
  const [productos] = useState<Producto[]>(
    dummyProductos.filter((p) => !p.suspendido)
  );
  const [comanda, setComanda] = useState<ProductoSeleccionado[]>([]);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState("1er Tiempo");
  const [comentarioIndex, setComentarioIndex] = useState<number | null>(null);
  const [modalComentarioVisible, setModalComentarioVisible] = useState(false);

  const [buscando, setBuscando] = useState<"grupo" | "producto" | null>(null);
  const [busquedaGrupo, setBusquedaGrupo] = useState("");
  const [busquedaProducto, setBusquedaProducto] = useState("");

  const tiempos = ["1er Tiempo", "2do Tiempo", "3er Tiempo", "Sin Tiempo"];
  const grupos = Array.from(new Set(productos.map((p) => p.grupo)));

  const productosFiltrados = productos.filter(
    (p) =>
      (busquedaGrupo === "" ||
        p.grupo.toLowerCase().includes(busquedaGrupo.toLowerCase())) &&
      (busquedaProducto === "" ||
        p.nombre.toLowerCase().includes(busquedaProducto.toLowerCase()))
  );

  const agregarProducto = (producto: Producto) => {
    setComanda((prev) => [
      ...prev,
      {
        producto,
        cantidad: cantidadSeleccionada,
        tiempo: tiempoSeleccionado,
      },
    ]);
  };

  const eliminarProducto = (index: number) => {
    setComanda((prev) => prev.filter((_, i) => i !== index));
  };

  const cambiarComentario = (index: number, texto: string) => {
    const nueva = [...comanda];
    nueva[index].comentario = texto;
    setComanda(nueva);
    setComentarioIndex(null);
    setModalComentarioVisible(false);
  };

  const columnas = [
    { title: "Producto", dataIndex: ["producto", "nombre"] },
    { title: "Cant", dataIndex: "cantidad" },
    {
      title: "Tiempo",
      dataIndex: "tiempo",
      render: (tiempo: string) => <Tag>{tiempo}</Tag>,
    },
    {
      title: "Comentario",
      render: (_: any, __: any, index: number) => (
        <Button
          size="small"
          onClick={() => {
            setComentarioIndex(index);
            setModalComentarioVisible(true);
          }}
        >
          💬 {comanda[index].comentario ? "✔️" : ""}
        </Button>
      ),
    },
    {
      title: "Acción",
      render: (_: any, __: any, index: number) => (
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => eliminarProducto(index)}
        />
      ),
    },
  ];

  return (
    <Modal
      open={visible}
      title={`Captura de productos - MESA: ${mesa}`}
      onCancel={onClose}
      footer={null}
      width={1200}
      style={{ top: 10 }}
    >
      <div className="flex gap-4">
        <div className="w-7/12">
          <div className="w-full gap-2 mb-4">
            <span className="font-bold">Cantidad:</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                type={num === cantidadSeleccionada ? "primary" : "default"}
                onClick={() => setCantidadSeleccionada(num)}
              >
                {num}
              </Button>
            ))}
            <div className="w-full my-2">
              <span className="font-bold">Tiempo:</span>
              {tiempos.map((t) => (
                <Button
                  key={t}
                  type={t === tiempoSeleccionado ? "primary" : "default"}
                  onClick={() => setTiempoSeleccionado(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <Table
            dataSource={comanda}
            columns={columnas}
            rowKey={(_, i) => i?.toString() || ""}
            pagination={false}
          />
          <div className="mt-4 flex justify-between">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => setComanda([])}
            >
              Eliminar todo
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Aceptar comanda
            </Button>
          </div>
        </div>

        <div className="w-5/12 max-h-[650px] overflow-y-auto pr-2">
          <div className="mb-2">
            <div className="mb-1 font-semibold">Buscar grupo</div>
            <input
              readOnly
              value={busquedaGrupo}
              onFocus={() => setBuscando("grupo")}
              onBlur={() => setBuscando(null)}
              className="w-full px-2 py-1 border rounded mb-2"
              placeholder="Toca para buscar grupo..."
            />
            {buscando === "grupo" ? (
              <TecladoVirtual
                onKeyPress={(v) => {
                  setBusquedaGrupo((prev) => prev + v);
                }}
                onBackspace={() => {
                  setBusquedaGrupo((prev) => prev.slice(0, -1));
                }}
                onSpace={() => {
                  setBusquedaGrupo((prev) => prev + " ");
                }}
                onClear={() => {
                  setBusquedaGrupo("");
                }}
              />
            ) : null}

            <div className="mb-1 font-semibold">Buscar producto</div>
            <input
              readOnly
              value={busquedaProducto}
              onFocus={() => setBuscando("producto")}
              onBlur={() => setBuscando(null)}
              className="w-full px-2 py-1 border rounded mb-4"
              placeholder="Toca para buscar producto..."
            />
            {buscando === "producto" ? (
              <TecladoVirtual
                onKeyPress={(v) => {
                  setBusquedaProducto((prev) => prev + v);
                }}
                onBackspace={() => {
                  setBusquedaProducto((prev) => prev.slice(0, -1));
                }}
                onSpace={() => {
                  setBusquedaProducto((prev) => prev + " ");
                }}
                onClear={() => {
                  setBusquedaProducto("");
                }}
              />
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {grupos.map((g) => (
              <Button key={g} onClick={() => setBusquedaGrupo(g)}>
                {g}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {productosFiltrados.map((p) => (
              <button
                key={p.id}
                onClick={() => agregarProducto(p)}
                className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-2 rounded text-sm text-center"
              >
                {p.nombre} <br /> ${p.precio}
              </button>
            ))}
          </div>
        </div>
      </div>

      {comentarioIndex !== null && (
        <ComentarioProductoModal
          visible={true}
          comentarioInicial={comanda[comentarioIndex]?.comentario || ""}
          onClose={() => {
            setModalComentarioVisible(false);
            setComentarioIndex(null);
          }}
          onGuardar={(texto) => cambiarComentario(comentarioIndex, texto)}
        />
      )}
    </Modal>
  );
};

export default CapturaComandaModal;
