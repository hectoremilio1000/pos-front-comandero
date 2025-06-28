// src/pages/LoginScreen.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");

  const handleClick = (value: string | number) => {
    setPassword((prev) => prev + value.toString());
  };
  const handleLogin = () => {
    if (password === "1234") navigate("/control");
  };

  const handleDelete = () => {
    setPassword("");
  };

  return (
    <div className="p-4 w-full min-h-screen flex flex-col justify-center items-center bg-blue-700  text-gray-800 font-sans">
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="w-full mb-8 col-span-3 md:col-span-3 lg:col-span-2">
          <div className="w-full mt-8 text-white text-lg">
            🕒 {new Date().toLocaleString("es-MX", { hour12: false })}
          </div>
          <div className="py-12">
            <h1 className="font-bold">
              <span className="text-white text-3xl md:text-4xl">
                GrowthSuite
              </span>
              <span className="text-yellow-500 text-3xl md:text-6xl">
                Comandero
              </span>
            </h1>
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="font-semibold text-lg mb-2">
                BEBIDAS MÁS VENDIDAS
              </h2>
              <p>No hay datos para mostrar.</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="font-semibold text-lg mb-2">
                OTROS (PRODUCTOS) MÁS VENDIDOS
              </h2>
              <p>No hay datos para mostrar.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center col-span-3 md:col-span-3 lg:col-span-1">
          <input
            type="password"
            className="w-full border text-center py-2 px-4 rounded shadow bg-white"
            placeholder="CONTRASEÑA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-2 w-full">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3, "🔢", 0, "❌"].map((val, idx) => (
              <button
                key={idx}
                onClick={() =>
                  val === "❌"
                    ? handleDelete()
                    : val === "🔢"
                      ? null
                      : handleClick(val)
                }
                className={`p-4 font-bold text-xl ${
                  val === "❌"
                    ? "bg-red-600 text-white"
                    : "bg-white text-blue-800"
                } rounded shadow`}
              >
                {val}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleLogin()}
            className="bg-yellow-500 text-white text-center justify-center py-2 px-6 rounded w-full shadow text-lg flex items-center gap-2"
          >
            ENTRAR <span>➡️</span>
          </button>
        </div>

        <div className="overflow-auto grid grid-cols-2 md:grid-cols-7 gap-2 col-span-3 text-sm">
          {[
            "CLIENTES",
            "MESEROS",
            "ASISTENCIAS",
            "PROMOCIONES",
            "CONSULTAR PRECIOS",
            "SUSPENDER PRODUCTOS",
            "SALIR DE COMANDERO",
          ].map((label, idx) => (
            <div
              key={idx}
              className="bg-blue-400 text-white py-3 px-2 rounded shadow text-center"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
