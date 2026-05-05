Aquí tienes el resumen consolidado, listo para pegar:

---

# The Class Project — Estado del proyecto y acuerdos de trabajo

## Contexto del proyecto

Fondecyt de Iniciación N° 11240249, "Class, personal networks and political attitudes". ANID 2024–2027. Investigador principal: Gabriel Otero, Escuela de Sociología, FCSH, Universidad Diego Portales. Marca comunicacional: **The Class Project**. Sitio: theclassproject.org.

Rol operativo: gestionar y producir sitio web, redes sociales, mailing, identidad visual, divulgación y materiales gráficos.

---

## Entorno técnico

- **Producción:** WordPress.com Premium. Tema Anna Lee, intervenido con FSE/Site Editing.
- **Local:** LocalWP en Windows (sitio: theclassproject.local), WordPress 6.9.4, PHP 8.2.29.
- **Editor:** VS Code + GitLens + extensiones instaladas (Prettier, ESLint, PHP Intelephense, WordPress Snippets, Live Server).
- **Node.js:** LTS instalado.
- **GitHub:** configurado, **no sincronizado** con el sitio publicado todavía.
- **WP Pusher:** descartado, incompatible con WordPress.com.

**Flujo de cambios acordado:** Local WP → versionar en GitHub → replicar manualmente en WordPress.com. No hay sync automático ni está planificado por ahora.

---

## Limitaciones de WordPress.com Premium (permanentes)

- **NO** admite plugins de terceros arbitrarios.
- **NO** admite edición de PHP del tema en producción.
- **SÍ** admite: CSS personalizado, Site Editor con bloques nativos (Gutenberg/FSE), bloque HTML personalizado.
- Antes de proponer cualquier solución con plugin, validar compatibilidad. Si no es verificable, decirlo explícitamente.

---

## Estructura del sitio

Cinco páginas: **Inicio, Proyecto, Encuesta, Equipo, Divulgación**.

### Decisiones de estructura acordadas

- **Footer:** se edita desde Apariencia → Editor → Partes del sitio → Footer. Impacta las 5 páginas, por eso se prioriza primero. Guardar tras cada cambio individual.
- **Jerarquía narrativa global:** qué es → por qué importa → cómo se investiga → qué produce.
- **Bloque Columnas:** formato estándar para tarjetas de equipo, características de la encuesta, fases del proyecto y descargas. Siempre con alineación "Ancho amplio".
- **/equipo:** layout de 2 filas × 4 columnas. Cada tarjeta: imagen + nombre (H3) + rol + botón "Ver perfil". Jerarquía uniforme: **todos en H3** (Gabriel no lleva H2 diferenciado, se puede destacar con etiqueta o borde si es necesario).
- **/encuesta:** 5 características en grid 2×3 (una celda vacía o decorativa). Bloque de descargas en Columnas (3). Íconos distintos para cada sección (no repetir el mismo).
- **/proyecto:** fases en Columnas (3), íconos distintos por fase.
- **/divulgacion:** infografías en Columnas (2×2) con título y leyenda por imagen.

---

## Deuda técnica — estado actual

### Completados
- Bloque 1 (Footer): eliminados headings vacíos, corregido "e Humanidades" → "y Humanidades", eliminados íconos de redes sociales (cuentas aún no existen).

### Pendientes por página

**Home**
- Link "más sobre la investigación" apunta a classprojectcl.wordpress.com/proyecto → corregir a theclassproject.org/proyecto.
- Typo en Agenda: "Seminario Observatorio Desigulada des" → "Desigualdades".

**/equipo**
- Layout roto: rearmar como tarjetas en Columnas (4) por fila.
- Typo: "Guilllermo Beck" → "Guillermo Beck".
- Link foto Guillermo Beck → apunta a /alejandro-beck, corregir a perfil correcto.
- Andreas Laffert y Constanza Pérez sin link en imagen: unificar criterio.

**/encuesta**
- 5 características apiladas verticalmente → rearmar en grid.
- Bloque de descargas sin estructura → rearmar en Columnas (3).
- 5 íconos idénticos (forward_15567241-1.png) → reemplazar por 5 distintos.
- Typo: "multi-etápico" → "multietápico".

**/proyecto**
- Párrafo del objetivo general duplicado → eliminar uno.
- "¿Qué se sabe al respecto?" como texto plano → cambiar a H2.
- 3 fases en vertical con ícono repetido → rearmar en Columnas (3) con íconos distintos.

**/divulgacion**
- Publicación Castillo et al. 2023 duplicada → eliminar una.
- 4 infografías sueltas → envolver en Columnas (2×2) con título y leyenda.

**Global**
- Márgenes inconsistentes entre páginas → pendiente definir estándar.
- Links rotos que apuntan al dominio antiguo → pendiente revisión completa.

---

## Identidad visual — estado

- Paleta de colores institucional: **no definida todavía**.
- Tipografías: **no documentadas**.
- Logo: pendiente análisis comunicacional.
- Plantilla visual unificada de infografías: pendiente.
- Hasta que estén definidas, proponer opciones provisionales marcadas explícitamente como tales.

---

## Redes sociales

Las cuentas de Instagram, LinkedIn y otras **aún no existen**. Por eso se eliminaron los íconos del footer en lugar de dejar links rotos. Cuando se creen, se reintegran con links reales.

---

## Relación con Gabriel Otero

- Reunión semanal los miércoles.
- Enviar avances por correo antes de cada reunión.
- Tono: directo, profesional, colega.
- Prioridades de Gabriel: claridad de presentación y fidelidad metodológica.
- Al escribirle: mostrar avance concreto, separar decisiones tomadas / puntos abiertos / preguntas, proponer próximos pasos realistas. Sin sobreexplicar.

---

## Reglas editoriales del proyecto

- Término técnico correcto: **actitudes políticas** (no "posiciones políticas").
- Cero invención de datos, citas, resultados, porcentajes o hipótesis.
- Citas en formato APA estándar.
- Prioridad idioma: terminar el sitio en español. No iniciar versión inglesa salvo solicitud explícita.
- Si algo no tiene respaldo en fuentes verificadas: "no verificable con la información disponible".

---

## Próximos pasos en cola

1. Completar Bloque 2: /equipo (layout, typos, links).
2. Bloque 3: /encuesta (grid, íconos, descargas).
3. Bloque 4: /proyecto (duplicado, H2, fases en columnas).
4. Bloque 5: /divulgacion (duplicado, infografías en grid).
5. Activar GitHub sync cuando primer bloque de cambios esté estable.
6. Sesión específica para definir identidad visual (paleta + tipografías + plantilla infografía).
7. Crear cuentas de redes sociales y reintegrar íconos al footer.
8. Resolver todos los links rotos al dominio antiguo.
9. 