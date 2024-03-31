import mongoose from "mongoose";

const beerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Nombre de la cerveza",
    },
    color: {
      type: String,
      required: true,
      enum: [
        "Ambar",
        "Dorado",
        "Marron",
        "Negro",
        "Palido",
        "Rojo",
        "Amarillo",
        "Rosado",
        "Naranja",
      ],
      placeholder: "Color de la cerveza",
    },
    body: {
      type: String,
      required: true,
      enum: ["Complejo", "Ligero", "Medio"],
      placeholder: "Cuerpo",
    },
    flavor: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Perfil de Sabor",
    },
    alcohol: {
      type: Number,
      required: true,
      placeholder: "Graduacion Alcoholica",
    },
    country: {
      type: String,
      required: true,
      enum: [
        "Afganistán",
        "Albania",
        "Alemania",
        "Andorra",
        "Angola",
        "Antigua y Barbuda",
        "Arabia Saudita",
        "Argelia",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaiyán",
        "Bahamas",
        "Bangladés",
        "Barbados",
        "Baréin",
        "Bélgica",
        "Belice",
        "Benín",
        "Bielorrusia",
        "Birmania",
        "Bolivia",
        "Bosnia y Herzegovina",
        "Botsuana",
        "Brasil",
        "Brunéi",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Bután",
        "Cabo Verde",
        "Camboya",
        "Camerún",
        "Canadá",
        "Catar",
        "Chad",
        "Chile",
        "China",
        "Chipre",
        "Ciudad del Vaticano",
        "Colombia",
        "Comoras",
        "Corea del Norte",
        "Corea del Sur",
        "Costa de Marfil",
        "Costa Rica",
        "Croacia",
        "Cuba",
        "Dinamarca",
        "Dominica",
        "Ecuador",
        "Egipto",
        "El Salvador",
        "Emiratos Árabes Unidos",
        "Eritrea",
        "Eslovaquia",
        "Eslovenia",
        "España",
        "Estados Unidos",
        "Estonia",
        "Etiopía",
        "Filipinas",
        "Finlandia",
        "Fiyi",
        "Francia",
        "Gabón",
        "Gambia",
        "Georgia",
        "Ghana",
        "Granada",
        "Grecia",
        "Guatemala",
        "Guyana",
        "Guinea",
        "Guinea ecuatorial",
        "Guinea-Bisáu",
        "Haití",
        "Honduras",
        "Hungría",
        "India",
        "Indonesia",
        "Irak",
        "Irán",
        "Irlanda",
        "Islandia",
        "Islas Marshall",
        "Islas Salomón",
        "Israel",
        "Italia",
        "Jamaica",
        "Japón",
        "Jordania",
        "Kazajistán",
        "Kenia",
        "Kirguistán",
        "Kiribati",
        "Kuwait",
        "Laos",
        "Lesoto",
        "Letonia",
        "Líbano",
        "Liberia",
        "Libia",
        "Liechtenstein",
        "Lituania",
        "Luxemburgo",
        "Madagascar",
        "Malasia",
        "Malaui",
        "Maldivas",
        "Malí",
        "Malta",
        "Marruecos",
        "Mauricio",
        "Mauritania",
        "México",
        "Micronesia",
        "Moldavia",
        "Mónaco",
        "Mongolia",
        "Montenegro",
        "Mozambique",
        "Namibia",
        "Nauru",
        "Nepal",
        "Nicaragua",
        "Níger",
        "Nigeria",
        "Noruega",
        "Nueva Zelanda",
        "Omán",
        "Países Bajos",
        "Pakistán",
        "Palaos",
        "Palestina",
        "Panamá",
        "Papúa Nueva Guinea",
        "Paraguay",
        "Perú",
        "Polonia",
        "Portugal",
        "Reino Unido",
        "República Centroafricana",
        "República Checa",
        "República de Macedonia",
        "República del Congo",
        "República Democrática del Congo",
        "República Dominicana",
        "República Sudafricana",
        "Ruanda",
        "Rumanía",
        "Rusia",
        "Samoa",
        "San Cristóbal y Nieves",
        "San Marino",
        "San Vicente y las Granadinas",
        "Santa Lucía",
        "Santo Tomé y Príncipe",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leona",
        "Singapur",
        "Siria",
        "Somalia",
        "Sri Lanka",
        "Suazilandia",
        "Sudán",
        "Sudán del Sur",
        "Suecia",
        "Suiza",
        "Surinam",
        "Tailandia",
        "Tanzania",
        "Tayikistán",
        "Timor Oriental",
        "Togo",
        "Tonga",
        "Trinidad y Tobago",
        "Túnez",
        "Turkmenistán",
        "Turquía",
        "Tuvalu",
        "Ucrania",
        "Uganda",
        "Uruguay",
        "Uzbekistán",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Yibuti",
        "Zambia",
        "Zimbabue",
      ],
      placeholder: "País de procedencia",
    },
    province: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Provincia de procedencia",
    },
    pairing: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Maridaje",
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Marca de la cerveza",
    },
    class: {
      type: String,
      required: true,
      enum: [
        "Ale Ambar",
        "Ale Dorada",
        "Ale Fuerte",
        "Ale Marron",
        "Ale Roja",
        "Ale de Frutas",
        "Amber Ale",
        "Barley Wine",
        "Belgian Wit",
        "Bock",
        "Coffee Beer",
        "Doppelbock",
        "Dunkelweizen",
        "ESB",
        "Golden Ale",
        "Hefeweizen",
        "IPA",
        "Imperial Stout",
        "Lager",
        "Lager Ambar",
        "Lager Roja",
        "Pale Ale",
        "Pilsner",
        "Porter",
        "Red Ale",
        "Saison",
        "Smoked Beer",
        "Stout",
        "Strong Ale",
        "Trappist",
        "Wheat Beer",
        "White Ale",
      ],
      placeholder: "Clase de cerveza",
    },
    style: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Estilo de cerveza",
    },
    craft: {
      type: String,
      required: true,
      enum: ["Si", "No"],
      placeholder: "Cerveza Artesanal",
    },
    fermentation: {
      type: String,
      required: true,
      enum: ["Alta", "Baja", "Media"],
      placeholder: "Tipo de Fermentación",
    },
    ibus: {
      type: Number,
      required: true,
      placeholder: "Unidades de Amargor",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Descripción de la cerveza",
    },
    popularity: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Popularidad de la cerveza",
    },
    recommendation: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Recomendación de la cerveza",
    },
    brewery: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Cervecería de la cerveza",
    },
    reputation: {
      type: String,
      required: true,
      trim: true,
      placeholder: "Reputación de la cerveza",
    },
  },
  {
    timestamps: true,
  }
);

const Beer = mongoose.model("Beer", beerSchema);

export default Beer;