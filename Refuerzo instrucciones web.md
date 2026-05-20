# Refuerzo a instrucciones

# Solicitudes:

1. ## **Mapa interactivo**

Este ejemplo utiliza Streamlit y Pydeck para crear una aplicación web instantánea que visualiza datos geográficos con una estética moderna de "capa de hexágonos" en 3D. El código genera una interfaz donde los números y casos no se ven como simples puntos, sino como estructuras volumétricas que resaltan las zonas de mayor densidad sobre un mapa en modo oscuro, permitiendo al usuario rotar la perspectiva, hacer zoom y filtrar la información de manera fluida y profesional.

Para el mapa de las comunas de la Región Metropolitana de Santiago, la mejor opción es el combo Streamlit \+ Pydeck, una tendencia que permite crear "centros de control" modernos con Python. El stack usa Streamlit para la interfaz interactiva y Pydeck para el motor de mapas 3D con estilo Dark Mode y colores neón, logrando una estética de alta tecnología. El resultado es una aplicación totalmente interactiva donde se puede rotar la ciudad en 3D, visualizar casos como columnas de datos y filtrar información en tiempo real con un diseño limpio y profesional. 

### Ejemplo en python

import streamlit as st  
import pandas as pd  
import pydeck as pdk  
import numpy as np

\# Configuración de la página  
st.set\_page\_config(page\_title="Mapa de Ciudad Interactivo", layout="wide")  
st.title("Visualización Moderna de Casos Urbanos")

\# 1\. Creación de datos ficticios (Sustituye esto por tu Excel o CSV)  
df \= pd.DataFrame(  
    np.random.randn(1000, 2\) / \[50, 50\] \+ \[40.41, \-3.70\], \# Coordenadas (Ej: Madrid)  
    columns=\['lat', 'lon'\]  
)

\# 2\. Configuración de la capa visual (HexagonLayer para efecto 3D)  
layer \= pdk.Layer(  
    "HexagonLayer",  
    df,  
    get\_position=\["lon", "lat"\],  
    auto\_highlight=True,  
    elevation\_scale=50,  
    pickable=True,  
    elevation\_range=\[0, 3000\],  
    extruded=True,  
    coverage=1,  
    upper\_percentile=100,  
    color\_range=\[\[0, 255, 255\], \[0, 128, 255\], \[0, 0, 255\], \[128, 0, 255\], \[255, 0, 255\]\] \# Colores neón  
)

\# 3\. Vista inicial del mapa  
view\_state \= pdk.ViewState(  
    latitude=40.41, longitude=-3.70, zoom=11, pitch=45, bearing=0  
)

\# 4\. Renderizado en Streamlit  
st.pydeck\_chart(pdk.Deck(  
    layers=\[layer\],  
    initial\_view\_state=view\_state,  
    map\_style="mapbox://styles/mapbox/dark-v10", \# Estética moderna oscura  
    tooltip={"text": "Densidad de casos en esta zona"}  
))

### **1.1. Instrucciones Mapa Interactivo:**

**Genera un script de Python usando Streamlit y Pydeck para el mapa solicitado de la Región Metropolitana de Santiago, interactivo y moderno.** El objetivo es mostrar la cobertura geográfica de una encuesta.

* **Estética:** Usa un mapa base de **Mapbox** en Dark Mode. Representa los datos usando una capa de **HexagonLayer o ColumnLayer en 3D** con los colores del proyecto (resaltados para que destaquen mejor).  
* **Interactividad:** El mapa debe permitir rotación, zoom y tener un tooltip (ventana emergente) que muestre el nombre de las comunas y toda la información que ya está, además del número de encuestas aplicadas al pasar el cursor.  
* **Controles:** Añade un **sidebar en Streamlit con un 'slider'** para filtrar la elevación de las columnas y un selector para cambiar entre diferentes capas de datos.  
* **Datos:** Crea un dataframe sintético con las coordenadas de la ciudad de Santiago para que el código sea funcional. 

2. ## **Vitrina Metodológica Interactiva**

Como la base de datos estará disponible el para el próximo año, el dashboard se convierte en una herramienta de transparencia y expectativa. El objetivo es que el usuario explore el "esqueleto" de la investigación. Usando **Streamlit**, puedes crear una interfaz donde el mapa de la región metropolitana no muestre resultados reales, sino la **cobertura geográfica (zonas donde se aplicó) y un catálogo interactivo del instrumento.** Es tendencia porque permite "vender" la calidad de la data antes de liberarla, usando una estética profesional que genera confianza institucional.

Cómo mostrar los dos elementos clave:

1. **El Instrumento (La Encuesta):** En lugar de un PDF estático, usa un **visualizador por secciones**. Puedes dividir la encuesta en módulos usando **pestañas** (st.tabs). Al hacer clic en cada módulo, se despliegan las preguntas con su redacción exacta. Esto permite a los investigadores y prensa conocer el rigor de las preguntas antes de ver los números.  
2. **Listado de Variables Decodificadas:** Aquí es donde brilla la interactividad. Puedes crear un **Diccionario de Datos dinámico**. El usuario selecciona una variable de una lista y la aplicación muestra: el nombre técnico, la etiqueta de la pregunta, el tipo de dato (numérico, categórico) y los posibles valores de respuesta. Es como un "catálogo" interactivo de lo que podrán analizar el próximo año.

### Estructura de código sugerida (Mockup):

python  
import streamlit as st

st.set\_page\_config(page\_title="Pre-lanzamiento Encuesta 2025", layout="wide")

st.title("Explorador Metodológico: Encuesta Ciudadana")  
st.info("Nota: Los resultados y la base de datos estarán disponibles en 2025.")

col1, col2 \= st.columns(\[1, 2\])

with col1:  
    st.subheader("1. El Instrumento")  
    with st.expander("Módulo A: Percepción Urbana"):  
        st.write("P1. ¿Cómo califica la seguridad en su barrio?")  
        st.caption("Opciones: Muy Mala a Muy Buena")  
      
    st.subheader("2. Diccionario de Variables")  
    variable \= st.selectbox("Selecciona una variable para conocer su estructura:",   
                           \["ID\_ZONA", "PER\_SEG\_01", "EDAD\_RANGO"\])  
      
    if variable \== "PER\_SEG\_01":  
        st.code("""  
        Nombre: Percepción Seguridad  
        Tipo: Ordinal (1-5)  
        Pregunta: P1 del cuestionario  
        """)

with col2:  
    st.subheader("Mapa de Cobertura (Zonas Muestreadas)")  
    \# Aquí iría tu mapa de Pydeck mostrando solo los polígonos de la ciudad   
    \# que fueron cubiertos, sin mostrar los resultados finales aún.

    st.image("https://placeholder.com")

### **Instrucciones vitrina metodológica interactiva**

Diseña una **Vitrina Metodológica interactiva en Streamlit** para presentar el diseño de la encuesta antes de liberar su base de datos.

* **Estructura de Pestañas:** Usa st.tabs para dividir la sección en: '1. El Cuestionario' y '2. Diccionario de Variables'.  
* **Visualización del Cuestionario:** En la primera pestaña, usa st.expander para organizar las preguntas por módulos. Cada pregunta debe mostrar su redacción exacta y opciones de respuesta.  
* **Buscador de Variables:** En la segunda pestaña, crea un buscador dinámico donde el usuario seleccione un nombre técnico (ej: VAR\_01) y se despliegue una tarjeta con: Descripción, Tipo de dato, y la pregunta vinculada.  
* **Diseño**: La interfaz debe ser minimalista, con los colores y tipografía clara, espacios amplios, transmitiendo una imagen institucional sólida y transparente. 

3. ## **Buscador integrado al menú**

Buscador del Sitio (Navegación): Se queda en el encabezado o menú. Es para quien busca "quiénes somos", "contacto" o "informe técnico". Es un buscador institucional. 

### **3.3. Instrucciones para un Buscador Integrado (Barra lateral o Menú)**

**Genera un componente de buscador integrado en HTML y CSS puro para la barra lateral del sitio web.**

- **Diseño:** Debe ser una barra de búsqueda minimalista con un icono de lupa sutil, que combine con una estética institucional seria (fondos blancos, gris muy claro y tipografía profesional).  
- **Comportamiento:** En lugar de abrir un modal gigante, quiero que al escribir, los resultados aparezcan en un menú desplegable pequeño (dropdown) justo debajo de la barra.  
- **Contenido:** Debe filtrar una lista estática de las secciones del sitio (ej: 'Metodología', 'Cuestionario’, 'Ficha Técnica').  
- **Código:** Proporciónalo como un bloque que pueda insertar en un \<div\> existente.

4. ## **Buscador técnico**

## Buscador Técnico (Encuesta/Diccionario): Se ubica dentro del cuerpo de la página o del dashboard. Es una herramienta de trabajo de campo. Permite buscar por palabra clave (ej. "desigualdad") y encontrar tanto la pregunta en el cuestionario como su variable técnica en el diccionario. 

### **4.4 Instrucciones buscador técnico**

## Genera un Explorador de Variables e Instrumento en un solo archivo HTML/JS.

- ## **El Buscador:** Debe filtrar simultáneamente dos listas: una con las preguntas del cuestionario y otra con el diccionario de variables.

- ## **Resultados Cruzados:** Si busco 'Desigualdad', el resultado debe mostrar la Pregunta P15 (´PREGUNTA EXACTA´) y la Variable 'DES\_01' (“DES\_01” es un ejemplo. Usar la codificación que aparece en la encuesta) al mismo tiempo.

- ## **Estética:** Diseño **'Data-Rich'** pero limpio. Usa una tabla o **lista de tarjetas con etiquetas de colores (badges)** para diferenciar si el resultado es una 'Pregunta' o una 'Variable'.

- ## Interactividad: Al hacer clic, debe expandir la información completa de ese ítem con un efecto suave.

\<\!DOCTYPE html\>  
\<html lang="es"\>  
\<head\>  
    \<meta charset="UTF-8"\>  
    \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
    \<title\>Buscador Técnico \- Encuesta 2027\</title\>  
    \<style\>  
        :root {  
            \--primary: \#007AFF;  
            \--bg-glass: rgba(255, 255, 255, 0.1);  
            \--border-glass: rgba(255, 255, 255, 0.2);  
            \--text-dark: \#1d1d1f;  
        }

        body {  
            font-family: \-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;  
            background: linear-gradient(135deg, \#f5f7fa 0%, \#c3cfe2 100%);  
            height: 100vh;  
            margin: 0;  
            display: flex;  
            flex-direction: column;  
            justify-content: center;  
            align-items: center;  
        }

        /\* Botón de Activación Elegante \*/  
        .search-trigger {  
            padding: 12px 24px;  
            background: white;  
            border: 1px solid \#d1d1d6;  
            border-radius: 12px;  
            cursor: pointer;  
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);  
            transition: all 0.2s;  
            display: flex;  
            align-items: center;  
            gap: 12px;  
            font-size: 1rem;  
        }

        .search-trigger:hover {  
            transform: translateY(-2px);  
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);  
        }

        .kbd {  
            background: \#f4f4f4;  
            border-radius: 4px;  
            padding: 2px 6px;  
            font-size: 0.8em;  
            border: 1px solid \#ccc;  
        }

        /\* Modal con Glassmorphism \*/  
        \#searchModal {  
            display: none;  
            position: fixed;  
            top: 0;  
            left: 0;  
            width: 100%;  
            height: 100%;  
            background: var(--bg-glass);  
            backdrop-filter: blur(12px);  
            \-webkit-backdrop-filter: blur(12px);  
            z-index: 999;  
            justify-content: center;  
            padding-top: 15vh;  
        }

        /\* Caja de Command Palette \*/  
        .command-palette {  
            background: white;  
            width: 90%;  
            max-width: 650px;  
            border-radius: 16px;  
            box-shadow: 0 25px 50px \-12px rgba(0, 0, 0, 0.25);  
            border: 1px solid var(--border-glass);  
            overflow: hidden;  
            animation: appear 0.2s ease-out;  
        }

        @keyframes appear {  
            from { transform: scale(0.95); opacity: 0; }  
            to { transform: scale(1); opacity: 1; }  
        }

        .search-input {  
            width: 100%;  
            padding: 20px;  
            border: none;  
            border-bottom: 1px solid \#f2f2f7;  
            font-size: 1.2rem;  
            outline: none;  
            color: var(--text-dark);  
        }

        .results-list {  
            max-height: 400px;  
            overflow-y: auto;  
            padding: 12px;  
        }

        .result-item {  
            padding: 14px 18px;  
            border-radius: 10px;  
            cursor: pointer;  
            display: flex;  
            flex-direction: column;  
            gap: 4px;  
            transition: background 0.2s;  
        }

        .result-item:hover {  
            background: \#f5f5f7;  
        }

        .badge {  
            font-size: 0.7em;  
            text-transform: uppercase;  
            font-weight: bold;  
            padding: 2px 8px;  
            border-radius: 4px;  
            width: fit-content;  
        }

        .badge-variable { background: \#E3F2FD; color: \#1976D2; }  
        .badge-seccion { background: \#F3E5F5; color: \#7B1FA2; }

        .item-title { font-weight: 500; color: var(--text-dark); }  
        .item-desc { font-size: 0.85em; color: \#86868b; }  
    \</style\>  
\</head\>  
\<body\>

    \<button class="search-trigger" onclick="toggleSearch()"\>  
        🔍 Buscar variables o secciones... \<span class="kbd"\>Ctrl \+ K\</span\>  
    \</button\>

    \<div id="searchModal" onclick="toggleSearch()"\>  
        \<div class="command-palette" onclick="event.stopPropagation()"\>  
            \<input type="text" id="searchInput" class="search-input" placeholder="Escribe para buscar..." onkeyup="filterResults()"\>  
            \<div id="resultsList" class="results-list"\>  
                \<\!-- Datos de ejemplo \--\>  
                \<div class="result-item" data-type="variable"\>  
                    \<span class="badge badge-variable"\>Variable\</span\>  
                    \<span class="item-title"\>SATIS\_URB\_01: Nivel de Satisfacción\</span\>  
                    \<span class="item-desc"\>Mide la percepción de limpieza en espacios públicos.\</span\>  
                \</div\>  
                \<div class="result-item" data-type="variable"\>  
                    \<span class="badge badge-variable"\>Variable\</span\>  
                    \<span class="item-title"\>EDAD\_RANGO: Rango Etario\</span\>  
                    \<span class="item-desc"\>Categorización de participantes por grupos de edad.\</span\>  
                \</div\>  
                \<div class="result-item" data-type="seccion"\>  
                    \<span class="badge badge-seccion"\>Sección\</span\>  
                    \<span class="item-title"\>Módulo de Percepción de Seguridad\</span\>  
                    \<span class="item-desc"\>Instrumento aplicado en zonas de alta densidad.\</span\>  
                \</div\>  
                \<div class="result-item" data-type="seccion"\>  
                    \<span class="badge badge-seccion"\>Sección\</span\>  
                    \<span class="item-title"\>Metodología y Ficha Técnica\</span\>  
                    \<span class="item-desc"\>Detalles del muestreo y margen de error 2027.\</span\>  
                \</div\>  
            \</div\>  
        \</div\>  
    \</div\>

    \<script\>  
        const modal \= document.getElementById('searchModal');  
        const input \= document.getElementById('searchInput');

        function toggleSearch() {  
            const isVisible \= modal.style.display \=== 'flex';  
            modal.style.display \= isVisible ? 'none' : 'flex';  
            if (\!isVisible) input.focus();  
        }

        function filterResults() {  
            const filter \= input.value.toLowerCase();  
            const items \= document.querySelectorAll('.result-item');  
              
            items.forEach(item \=\> {  
                const text \= item.innerText.toLowerCase();  
                item.style.display \= text.includes(filter) ? 'flex' : 'none';  
            });  
        }

        // Atajos de teclado  
        document.addEventListener('keydown', (e) \=\> {  
            if (e.key \=== 'k' && (e.ctrlKey || e.metaKey)) {  
                e.preventDefault();  
                toggleSearch();  
            }  
            if (e.key \=== 'Escape' && modal.style.display \=== 'flex') {  
                toggleSearch();  
            }  
        });  
    \</script\>  
\</body\>  
\</html\>

5. ## **“Command Palette" en JS Puro**

Este buscador no es un cuadro de texto común en la cabecera, sino un modal flotante que aparece con un botón elegante. Se construye con **JS** puro para asegurar que no haya dependencias que caduquen o pesen, manteniendo el sitio "limpio" y rápido para los evaluadores internacionales.

* **Estética**: Fondo con efecto *Glassmorphism* (desenfoque sutil), tipografía técnica y bordes definidos.  
* **Funcionalidad**: Filtro instantáneo de las variables y secciones de la encuesta que mencionaste antes.

**Este buscador permite:**

1. **Excelente rendimiento:** Al ser JS puro, la página carga instantáneamente (puntuación alta en Google PageSpeed).  
2. **Arquitectura:** Separa la visualización (Streamlit/Python) de la interfaz de usuario (HTML/JS), demostrando un desarrollo estructurado.  
3. **Preparación:** Muestra que el sitio está listo para escalar cuando la base de datos esté disponible el próximo año (2027).

### Ejemplo de implementación (HTML/CSS/JS):

**El efecto Glassmorphism** (o efecto esmerilado) es una de las tendencias más fuertes en diseño de interfaces modernas porque aporta profundidad y jerarquía visual sin saturar la pantalla.

Para lograrlo, se utiliza una propiedad de CSS llamada backdrop-filter: blur(). Aquí tienes cómo se aplica exactamente al código del buscador para que se vea profesional y sólido:

### El Código CSS Clave

Debes aplicar estos estilos al contenedor del modal para que el fondo de la página se "desenfoque" suavemente al abrir el buscador:

css

\#searchModal {

    /\* Fondo con transparencia blanca o oscura muy sutil \*/

    background: rgba(255, 255, 255, 0.1); 

    

    /\* EL EFECTO: Desenfoque de lo que está detrás \*/

    backdrop-filter: blur(12px);

    \-webkit-backdrop-filter: blur(12px); /\* Soporte para Safari \*/

    

    /\* Borde fino para dar sensación de cristal \*/

    border: 1px solid rgba(255, 255, 255, 0.2);

    

    /\* Centrado y capas \*/

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    z-index: 999;

    display: flex;

    justify-content: center;

    align-items: start;

    padding-top: 10vh;

}

1. **Jerarquía Visual:** Al desenfocar el mapa o el contenido de fondo, el usuario se concentra automáticamente en el buscador, eliminando distracciones visuales.  
2. **Modernidad:** Es el estilo característico de sistemas operativos premium (como iOS o Windows 11), lo que transmite que el sitio cuenta con tecnología de punta.  
3. **Elegancia:** Permite que los colores del mapa se "asomen" de forma artística a través del buscador, manteniendo la coherencia estética en toda la navegación.

### Instrucciones "Command Palette" 

Genera el código para un buscador interno tipo 'Command Palette'. El objetivo es mostrar el catálogo de variables de una encuesta que se lanzará el próximo año.

Entrega todo en un único archivo HTML independiente (que incluya CSS y JS dentro) para poder probarlo localmente. Los requisitos son:

1. **Estética de Alto Nivel:** El fondo del modal debe tener un efecto Glassmorphism (desenfoque sutil con backdrop-filter: blur) que transmita modernidad y solidez.  
2. **Interactividad:** Debe activarse con un botón elegante   
3. **Funcionalidad de Búsqueda:** Incluye un buscador que filtre en tiempo real una lista de ejemplo con:  
   * **Variables** (ej: 'Nivel de Satisfacción', 'Rango Etario').  
   * **Secciones del instrumento** (ej: 'Módulo de Percepción', 'Metodología').  
4. **Código Limpio:** Usa JavaScript puro (Vanilla JS), sin librerías externas, para asegurar que el sitio sea rápido y fácil de mantener.  
5. **Diseño Responsivo:** Que se vea perfecto tanto en monitores grandes como en dispositivos móviles."

\<\!DOCTYPE html\>  
\<html lang="es"\>  
\<head\>  
    \<meta charset="UTF-8"\>  
    \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
    \<title\>Buscador Técnico \- Encuesta 2027\</title\>  
    \<style\>  
        :root {  
            \--primary: \#007AFF;  
            \--bg-glass: rgba(255, 255, 255, 0.1);  
            \--border-glass: rgba(255, 255, 255, 0.2);  
            \--text-dark: \#1d1d1f;  
        }

        body {  
            font-family: \-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;  
            background: linear-gradient(135deg, \#f5f7fa 0%, \#c3cfe2 100%);  
            height: 100vh;  
            margin: 0;  
            display: flex;  
            flex-direction: column;  
            justify-content: center;  
            align-items: center;  
        }

        /\* Botón de Activación Elegante \*/  
        .search-trigger {  
            padding: 12px 24px;  
            background: white;  
            border: 1px solid \#d1d1d6;  
            border-radius: 12px;  
            cursor: pointer;  
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);  
            transition: all 0.2s;  
            display: flex;  
            align-items: center;  
            gap: 12px;  
            font-size: 1rem;  
        }

        .search-trigger:hover {  
            transform: translateY(-2px);  
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);  
        }

        .kbd {  
            background: \#f4f4f4;  
            border-radius: 4px;  
            padding: 2px 6px;  
            font-size: 0.8em;  
            border: 1px solid \#ccc;  
        }

        /\* Modal con Glassmorphism \*/  
        \#searchModal {  
            display: none;  
            position: fixed;  
            top: 0;  
            left: 0;  
            width: 100%;  
            height: 100%;  
            background: var(--bg-glass);  
            backdrop-filter: blur(12px);  
            \-webkit-backdrop-filter: blur(12px);  
            z-index: 999;  
            justify-content: center;  
            padding-top: 15vh;  
        }

        /\* Caja de Command Palette \*/  
        .command-palette {  
            background: white;  
            width: 90%;  
            max-width: 650px;  
            border-radius: 16px;  
            box-shadow: 0 25px 50px \-12px rgba(0, 0, 0, 0.25);  
            border: 1px solid var(--border-glass);  
            overflow: hidden;  
            animation: appear 0.2s ease-out;  
        }

        @keyframes appear {  
            from { transform: scale(0.95); opacity: 0; }  
            to { transform: scale(1); opacity: 1; }  
        }

        .search-input {  
            width: 100%;  
            padding: 20px;  
            border: none;  
            border-bottom: 1px solid \#f2f2f7;  
            font-size: 1.2rem;  
            outline: none;  
            color: var(--text-dark);  
        }

        .results-list {  
            max-height: 400px;  
            overflow-y: auto;  
            padding: 12px;  
        }

        .result-item {  
            padding: 14px 18px;  
            border-radius: 10px;  
            cursor: pointer;  
            display: flex;  
            flex-direction: column;  
            gap: 4px;  
            transition: background 0.2s;  
        }

        .result-item:hover {  
            background: \#f5f5f7;  
        }

        .badge {  
            font-size: 0.7em;  
            text-transform: uppercase;  
            font-weight: bold;  
            padding: 2px 8px;  
            border-radius: 4px;  
            width: fit-content;  
        }

        .badge-variable { background: \#E3F2FD; color: \#1976D2; }  
        .badge-seccion { background: \#F3E5F5; color: \#7B1FA2; }

        .item-title { font-weight: 500; color: var(--text-dark); }  
        .item-desc { font-size: 0.85em; color: \#86868b; }  
    \</style\>  
\</head\>  
\<body\>

    \<button class="search-trigger" onclick="toggleSearch()"\>  
        🔍 Buscar variables o secciones... \<span class="kbd"\>Ctrl \+ K\</span\>  
    \</button\>

    \<div id="searchModal" onclick="toggleSearch()"\>  
        \<div class="command-palette" onclick="event.stopPropagation()"\>  
            \<input type="text" id="searchInput" class="search-input" placeholder="Escribe para buscar..." onkeyup="filterResults()"\>  
            \<div id="resultsList" class="results-list"\>  
                \<\!-- Datos de ejemplo \--\>  
                \<div class="result-item" data-type="variable"\>  
                    \<span class="badge badge-variable"\>Variable\</span\>  
                    \<span class="item-title"\>SATIS\_URB\_01: Nivel de Satisfacción\</span\>  
                    \<span class="item-desc"\>Mide la percepción de limpieza en espacios públicos.\</span\>  
                \</div\>  
                \<div class="result-item" data-type="variable"\>  
                    \<span class="badge badge-variable"\>Variable\</span\>  
                    \<span class="item-title"\>EDAD\_RANGO: Rango Etario\</span\>  
                    \<span class="item-desc"\>Categorización de participantes por grupos de edad.\</span\>  
                \</div\>  
                \<div class="result-item" data-type="seccion"\>  
                    \<span class="badge badge-seccion"\>Sección\</span\>  
                    \<span class="item-title"\>Módulo de Percepción de Seguridad\</span\>  
                    \<span class="item-desc"\>Instrumento aplicado en zonas de alta densidad.\</span\>  
                \</div\>  
                \<div class="result-item" data-type="seccion"\>  
                    \<span class="badge badge-seccion"\>Sección\</span\>  
                    \<span class="item-title"\>Metodología y Ficha Técnica\</span\>  
                    \<span class="item-desc"\>Detalles del muestreo y margen de error 2027.\</span\>  
                \</div\>  
            \</div\>  
        \</div\>  
    \</div\>

    \<script\>  
        const modal \= document.getElementById('searchModal');  
        const input \= document.getElementById('searchInput');

        function toggleSearch() {  
            const isVisible \= modal.style.display \=== 'flex';  
            modal.style.display \= isVisible ? 'none' : 'flex';  
            if (\!isVisible) input.focus();  
        }

        function filterResults() {  
            const filter \= input.value.toLowerCase();  
            const items \= document.querySelectorAll('.result-item');  
              
            items.forEach(item \=\> {  
                const text \= item.innerText.toLowerCase();  
                item.style.display \= text.includes(filter) ? 'flex' : 'none';  
            });  
        }

        // Atajos de teclado  
        document.addEventListener('keydown', (e) \=\> {  
            if (e.key \=== 'k' && (e.ctrlKey || e.metaKey)) {  
                e.preventDefault();  
                toggleSearch();  
            }  
            if (e.key \=== 'Escape' && modal.style.display \=== 'flex') {  
                toggleSearch();  
            }  
        });  
    \</script\>  
\</body\>  
\</html\>

