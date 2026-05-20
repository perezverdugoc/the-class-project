genera el código fuente para un Buscador Técnico e Instrumento de Encuesta Interactivo basado en el proyecto de investigación internacional The Class Project. Entrega todo el desarrollo en un único archivo HTML autónomo (con estilos CSS en una etiqueta \<style\> y la lógica JavaScript en \<script\> al final) para probarlo localmente y desplegarlo en GitHub Pages.

La interfaz debe replicar exactamente la estructura visual de filas limpias e independientes. Los requisitos específicos son:

1\. Estética y Maquetación Visual (Fiel a la Imagen):

* Barra Superior de Sugerencias: Incluye un encabezado sutil sobre el buscador que sirva de guía al usuario: Buscador Técnico · busca: desigualdad, red, clase, confianza, módulo...  
* Caja de Entrada: Un input minimalista y elegante que ocupe el ancho del contenedor con el placeholder: 🔍 Escribe para buscar preguntas o variables...  
* Tarjetas de Resultados Extensibles (Accordion Cards): Cada ítem filtrado debe renderizarse como una tarjeta independiente con fondo blanco, bordes redondeados suaves, una sutil sombra y un indicador direccional (►) en el extremo derecho.  
* Etiquetas con Fondos Suaves (Badges):  
  * Si es PREGUNTA: Fondo verde claro pastel con texto verde oscuro y tipografía técnica.  
  * Si es VARIABLE: Fondo azul claro pastel con texto azul oscuro y tipografía técnica.

2\. Lógica de Vinculación Cruzada e Interactividad Expandible:

* Efecto Acordeón: Al hacer clic sobre cualquier tarjeta, esta debe expandirse suavemente hacia abajo para revelar sus metadatos internos, y la flecha derecha (►) debe rotar 90 grados hacia abajo (▼).  
* Scroll Inteligente con Enlace Cruzado:  
  * Dentro de la sección expandida de una PREGUNTA, añade un enlace técnico discreto: Ver Variable Técnica Correspondiente ➜.  
  * Al hacer clic en este enlace, el script debe ejecutar un desplazamiento suave (smooth scroll) que centre en pantalla la tarjeta de la VARIABLE vinculada.  
  * Comportamiento Avanzado: Al aterrizar en la tarjeta destino, esta debe abrirse automáticamente para mostrar sus metadatos y aplicar un breve destello de color (*highlight CSS temporizado*) para capturar la atención del usuario.

3\. Estructura de Datos (Array de Objetos en JavaScript):

Utiliza este array con datos reales del proyecto para alimentar el motor de filtrado en tiempo real (con búsqueda por texto que coincida con títulos, redacciones o códigos):

javascript  
const datosBuscador \= \[  
    {  
        id: "card\_preg\_educ",  
        tipo: "pregunta",  
        titulo: "Nivel educacional más alto alcanzado",  
        id\_vinculo: "card\_var\_educ",  
        metadatos: {  
            modulo: "Módulo A: Capital Social y Educación",  
            redaccion: "¿Cuál es el nivel educacional más alto alcanzado por usted o la persona que aporta el mayor ingreso al hogar?",  
            opciones: "1. Sin estudios | 2\. Básica | 3\. Media | 4\. Técnica | 5\. Universitaria | 6\. Postgrado | 88\. NS/NR"  
        }  
    },  
    {  
        id: "card\_var\_educ",  
        tipo: "variable",  
        titulo: "EDUC\_01: Nivel educacional decodificado",  
        id\_vinculo: "card\_preg\_educ",  
        metadatos: {  
            tipo\_dato: "Integer (Numérico Ordinal)",  
            unidad\_analisis: "Jefe de hogar / Informante calificado",  
            valores\_validos: "1 al 6 (Rango válido estándar)",  
            casos\_perdidos: "0.45% (Missing Values)",  
            notas\_tecnicas: "Variable recodificada a partir del cuestionario original para asegurar comparabilidad internacional (CINE-UNESCO)."  
        }  
    },  
    {  
        id: "card\_preg\_clase",  
        tipo: "pregunta",  
        titulo: "Autoidentificación de clase social",  
        id\_vinculo: "card\_var\_clase",  
        metadatos: {  
            modulo: "Módulo B: Percepción Socioeconómica",  
            redaccion: "En nuestra sociedad, las personas suelen clasificarse en diferentes grupos o clases. ¿A cuál de las siguientes clases sociales diría usted que pertenece?",  
            opciones: "1. Clase Baja | 2\. Clase Media-Baja | 3\. Clase Media | 4\. Clase Media-Alta | 5\. Clase Alta | 99\. No responde"  
        }  
    },  
    {  
        id: "card\_var\_clase",  
        tipo: "variable",  
        titulo: "CLASE\_01: Autoidentificación de clase",  
        id\_vinculo: "card\_preg\_clase",  
        metadatos: {  
            tipo\_dato: "Categorizada (Factor con etiquetas)",  
            unidad\_analisis: "Individuo (Población objetivo ≥ 18 años)",  
            valores\_validos: "1 al 5",  
            casos\_perdidos: "1.12% (No responde)",  
            notas\_tecnicas: "Variable clave para el cruce de brechas de desigualdad percibida versus desigualdad material."  
        }  
    },  
    {  
        id: "card\_preg\_red",  
        tipo: "pregunta",  
        titulo: "Tamaño de la red personal",  
        id\_vinculo: "card\_var\_red",  
        metadatos: {  
            modulo: "Módulo C: Redes de Apoyo y Confianza",  
            redaccion: "Pensando en personas cercanas con las que usted puede contar en caso de una emergencia económica o de salud, ¿con cuántas personas adultas fuera de su hogar directo tiene este nivel de confianza?",  
            opciones: "Valor numérico abierto (Número absoluto de personas)"  
        }  
    },  
    {  
        id: "card\_var\_red",  
        tipo: "variable",  
        titulo: "RED\_TAM: Tamaño de red personal",  
        id\_vinculo: "card\_preg\_red",  
        metadatos: {  
            tipo\_dato: "Continuous (Numérico Continuo)",  
            unidad\_analisis: "Individuo",  
            valores\_validos: "0 a 50 (Truncado en extremos para evitar outliers)",  
            casos\_perdidos: "2.3% (Valores atípicos \> 50 recodificados a la mediana)",  
            notas\_tecnicas: "Variable utilizada como proxy cuantitativo para medir densidad de capital social en el mapa interactivo."  
        }  
    }  
\];

4\. Requisitos de Código y Maquetación de Texto:

* Usa JavaScript puro (Vanilla JS) sin dependencias ni frameworks.  
* Para los metadatos internos expuestos al expandir la tarjeta, dale un diseño limpio utilizando una tipografía monoespaciada pequeña (font-family: monospace) para las etiquetas técnicas (ej. Tipo de dato:, Casos perdidos:), lo que reforzará la precisión científica ante los auditores del fondo de financiamiento."

