(function () {
  const root = document.getElementById("mapa-rm");
  if (!root || !window.L) return;

  const N_TOTAL = 1250;
  const fmt = new Intl.NumberFormat("es-CL");
  let map;
  let geoLayer;
  let labelLayer;
  let features = [];
  let zoneMap = new Map();
  let activeLayer = null;
  let activeZone = null;
  let currentView = "comuna";

  function percent(n, base = N_TOTAL) {
    return `${((n / base) * 100).toFixed(1).replace(".", ",")}%`;
  }

  function communeTooltip(feature) {
    const p = feature.properties;
    const zone = zoneMap.get(p.zona);
    return `
      <strong>${p.comuna}</strong><br>
      ${p.zona}<br>
      n=${fmt.format(p.n)} · ${percent(p.n)} del total<br>
      ${zone ? percent(p.n, zone.n) : ""} de su zona
    `;
  }

  function styleFeature(feature) {
    const zone = zoneMap.get(feature.properties.zona);
    const n = Number(feature.properties.n || 0);
    const zoneN = zone ? zone.n : N_TOTAL;
    const opacity = currentView === "zona"
      ? 0.78
      : Math.max(0.34, Math.min(0.88, 0.32 + (n / Math.max(1, zoneN)) * 1.2));
    const dim = activeZone && feature.properties.zona !== activeZone;
    return {
      fillColor: zone ? zone.color : "#8B8B8B",
      fillOpacity: dim ? 0.16 : opacity,
      color: "#FFFFFF",
      weight: dim ? 0.7 : 1,
      opacity: 1
    };
  }

  function renderZoneList() {
    const list = document.querySelector("#zone-list");
    if (!list) return;
    list.innerHTML = "";
    [...zoneMap.values()]
      .sort((a, b) => b.n - a.n)
      .forEach((zone) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.className = `zone-button${activeZone === zone.nombre ? " is-active" : ""}`;
        button.innerHTML = `
          <span class="zone-dot" style="background:${zone.color}"></span>
          <span class="zone-name">${zone.nombre.replace("Zona ", "")}</span>
          <span class="zone-n">n=${fmt.format(zone.n)}</span>
        `;
        button.addEventListener("click", () => selectZone(zone.nombre));
        li.appendChild(button);
        list.appendChild(li);
      });
  }

  function renderCommuneTable(communes) {
    const table = document.querySelector("#commune-table");
    if (!table) return;
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    communes
      .sort((a, b) => b.properties.n - a.properties.n)
      .forEach((feature) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${feature.properties.comuna}</td><td>${fmt.format(feature.properties.n)}</td>`;
        tbody.appendChild(tr);
      });
    table.hidden = false;
  }

  function clearCommuneTable() {
    const table = document.querySelector("#commune-table");
    if (table) table.hidden = true;
  }

  function setStat(value, label) {
    const stat = document.querySelector("#stat-pct");
    if (!stat) return;
    stat.textContent = value;
    stat.nextElementSibling.textContent = label;
  }

  function updatePanelForOverview() {
    activeZone = null;
    document.querySelector("#panel-label").textContent = "Resumen territorial";
    document.querySelector("#panel-title").textContent = "Región Metropolitana";
    document.querySelector("#panel-meta").textContent = "Selecciona una zona o comuna para ver el detalle de la muestra.";
    document.querySelector("#stat-n").textContent = fmt.format(N_TOTAL);
    setStat("10", "zonas de muestreo");
    clearCommuneTable();
    renderZoneList();
    if (geoLayer) geoLayer.setStyle(styleFeature);
    updateLabels();
  }

  function selectZone(zoneName) {
    activeZone = zoneName;
    const zone = zoneMap.get(zoneName);
    const zoneFeatures = features.filter((feature) => feature.properties.zona === zoneName);
    document.querySelector("#panel-label").textContent = "Zona seleccionada";
    document.querySelector("#panel-title").textContent = zoneName;
    document.querySelector("#panel-meta").textContent = `${zoneFeatures.length} comunas en esta zona de muestreo.`;
    document.querySelector("#stat-n").textContent = fmt.format(zone.n);
    setStat(percent(zone.n), "de la muestra");
    renderZoneList();
    renderCommuneTable(zoneFeatures);
    if (geoLayer) {
      geoLayer.setStyle(styleFeature);
      const layers = [];
      geoLayer.eachLayer((layer) => {
        if (layer.feature.properties.zona === zoneName) layers.push(layer);
      });
      if (layers.length) {
        map.fitBounds(L.featureGroup(layers).getBounds(), { padding: [28, 28], maxZoom: 11 });
      }
    }
    updateLabels();
  }

  function selectCommune(layer) {
    if (activeLayer) geoLayer.resetStyle(activeLayer);
    activeLayer = layer;
    activeZone = layer.feature.properties.zona;
    const p = layer.feature.properties;
    const zone = zoneMap.get(p.zona);
    document.querySelector("#panel-label").textContent = "Comuna seleccionada";
    document.querySelector("#panel-title").textContent = p.comuna;
    document.querySelector("#panel-meta").textContent = `${p.zona}. ${percent(p.n, zone.n)} de los casos de su zona.`;
    document.querySelector("#stat-n").textContent = fmt.format(p.n);
    setStat(percent(p.n), "de la muestra");
    renderZoneList();
    renderCommuneTable(features.filter((feature) => feature.properties.zona === p.zona));
    layer.setStyle({ weight: 2.6, color: "#1C1C1E", fillOpacity: 0.92 });
    layer.bringToFront();
    updateLabels();
  }

  function getUrbanCoreLayers() {
    const coreZones = new Set(["Zona Centro", "Zona Norte", "Zona Oriente", "Zona Poniente", "Zona Sur"]);
    const coreCommunes = new Set(["Puente Alto", "San Bernardo", "Maipú"]);
    const layers = [];
    geoLayer.eachLayer((layer) => {
      const p = layer.feature.properties;
      if (coreZones.has(p.zona) || coreCommunes.has(p.comuna)) layers.push(layer);
    });
    return layers;
  }

  function fitUrbanView() {
    const layers = getUrbanCoreLayers();
    const group = L.featureGroup(layers.length ? layers : geoLayer.getLayers());
    map.fitBounds(group.getBounds(), { padding: [12, 12], maxZoom: 10.85 });
  }

  function fitFullView() {
    map.fitBounds(geoLayer.getBounds(), { padding: [18, 18], maxZoom: 10.2 });
  }

  function updateLabels() {
    if (!labelLayer || !geoLayer) return;
    labelLayer.clearLayers();
    const zoom = map.getZoom();
    if (zoom < 10.45) {
      const overviewLabels = new Set([
        "Zona Centro",
        "Zona Norte",
        "Zona Oriente",
        "Zona Poniente",
        "Zona Sur",
        "Zona Chacabuco",
        "Zona Maipo",
        "Zona Talagante"
      ]);
      const visibleZones = [...zoneMap.values()].filter((zone) => overviewLabels.has(zone.nombre));
      visibleZones.forEach((zone) => {
        const layers = [];
        geoLayer.eachLayer((layer) => {
          if (layer.feature.properties.zona === zone.nombre) layers.push(layer);
        });
        if (!layers.length) return;
        const center = L.featureGroup(layers).getBounds().getCenter();
        const icon = L.divIcon({
          className: "zone-map-label",
          html: `<span class="zone-map-label__inner"><strong>${zone.nombre.replace("Zona ", "")}</strong><span>n=${fmt.format(zone.n)}</span></span>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        });
        L.marker(center, { icon, interactive: false }).addTo(labelLayer);
      });
      return;
    }
    geoLayer.eachLayer((layer) => {
      const p = layer.feature.properties;
      if (activeZone && p.zona !== activeZone && zoom < 11.15) return;
      const icon = L.divIcon({
        className: "sample-label",
        html: `<span class="sample-label__inner"><strong>${fmt.format(p.n)}</strong><span>${percent(p.n)}</span></span>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
      L.marker(layer.getBounds().getCenter(), { icon, interactive: false }).addTo(labelLayer);
    });
  }

  function initMap(geojson, muestra) {
    muestra.zonas.forEach((zone) => zoneMap.set(zone.nombre, zone));
    features = geojson.features.filter((feature) => feature.properties && feature.properties.zona);
    map = L.map("mapa-rm", {
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
      minZoom: 8.2,
      maxZoom: 12.6
    });
    labelLayer = L.layerGroup().addTo(map);
    geoLayer = L.geoJSON(geojson, {
      style: styleFeature,
      onEachFeature(feature, layer) {
        layer.bindTooltip(communeTooltip(feature), { sticky: true });
        layer.on({
          mouseover() {
            if (layer !== activeLayer) layer.setStyle({ weight: 2, color: "#1C1C1E" });
          },
          mouseout() {
            if (layer !== activeLayer) geoLayer.resetStyle(layer);
          },
          click() {
            selectCommune(layer);
          }
        });
      }
    }).addTo(map);
    fitUrbanView();
    map.on("zoomend moveend", updateLabels);
    document.querySelector("#fit-urban").addEventListener("click", fitUrbanView);
    document.querySelector("#fit-all").addEventListener("click", fitFullView);
    document.querySelectorAll(".view-toggle button").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".view-toggle button").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        currentView = button.dataset.view;
        if (geoLayer) geoLayer.setStyle(styleFeature);
      });
    });
    renderZoneList();
    updateLabels();
  }

  Promise.all([
    fetch("../data/comunas-rm.geojson").then((response) => response.json()),
    fetch("../data/muestra-rm.json").then((response) => response.json())
  ])
    .then(([geojson, muestra]) => initMap(geojson, muestra))
    .catch((error) => {
      root.innerHTML = `<p style="padding:24px;color:#C9524F">No se pudo cargar el mapa: ${error.message}</p>`;
    });
})();
