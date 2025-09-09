  
    // ====== Datos de ejemplo de precios ======
    const datosPrecios = [
      {producto: 'Gasolina Regular', tipo:'gasolina', octanaje: 90, precio: 17.29, updated: '2025-09-08 08:00'},
      {producto: 'Gasolina Premium', tipo:'gasolina', octanaje: 95, precio: 19.10, updated: '2025-09-08 08:00'},
      {producto: 'Gasolina Súper', tipo:'gasolina', octanaje: 97, precio: 20.20, updated: '2025-09-08 08:00'},
      {producto: 'Diésel B5 S50', tipo:'diesel', octanaje: '-', precio: 16.80, updated: '2025-09-08 08:00'},
      {producto: 'Diésel Premium', tipo:'diesel', octanaje: '-', precio: 17.40, updated: '2025-09-08 08:00'},
    ];

    const tbody = document.querySelector('#tablaPrecios tbody');
    const filtroTipo = document.getElementById('filtroTipo');
    const buscador = document.getElementById('buscador');
    const btnReset = document.getElementById('btnReset');

    function dibujarTabla(){
      const q = (buscador.value || '').toLowerCase().trim();
      const t = filtroTipo.value;
      tbody.innerHTML = '';
      datosPrecios
        .filter(r => t==='todos' ? true : r.tipo===t)
        .filter(r => !q || [r.producto, String(r.octanaje), r.tipo].join(' ').toLowerCase().includes(q))
        .forEach((r, i) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${r.producto}</td>
            <td><span class="pill">${r.tipo}</span></td>
            <td>${r.octanaje}</td>
            <td class="price">S/ ${r.precio.toFixed(2)}</td>
            <td><small class="tag">${r.updated}</small></td>
            <td><button class="btn secondary" data-i="${i}">Editar</button></td>
          `;
          tbody.appendChild(tr);
        });
    }

    dibujarTabla();

    filtroTipo.addEventListener('change', dibujarTabla);
    buscador.addEventListener('input', dibujarTabla);
    btnReset.addEventListener('click', ()=>{filtroTipo.value='todos'; buscador.value=''; dibujarTabla();});

    // Simular subidas/bajadas rápidas
    const subir = document.getElementById('subir5');
    const bajar = document.getElementById('bajar5');
    function ajustar(delta){
      const ahora = new Date().toLocaleString('es-PE', {hour12:false});
      datosPrecios.forEach(r=>{ r.precio = Math.max(0, r.precio + delta); r.updated = ahora; });
      dibujarTabla();
    }
    subir.addEventListener('click', ()=> ajustar(0.05));
    bajar.addEventListener('click', ()=> ajustar(-0.05));

    // Editar una fila (prompt simple para demo)
    tbody.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-i]');
      if(!btn) return;
      const i = Number(btn.dataset.i);
      const nuevo = prompt(`Nuevo precio para ${datosPrecios[i].producto} (S/):`, datosPrecios[i].precio.toFixed(2));
      if(nuevo===null) return;
      const val = Number(nuevo.replace(',', '.'));
      if(Number.isFinite(val) && val>=0){
        datosPrecios[i].precio = val;
        datosPrecios[i].updated = new Date().toLocaleString('es-PE', {hour12:false});
        dibujarTabla();
      } else {
        alert('Ingresa un número válido.');
      }
    });

    // ====== Formulario ======
    const form = document.getElementById('formContacto');
    const estado = document.getElementById('estadoForm');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      // Simulación de envío
      estado.textContent = 'Enviando…';
      setTimeout(()=>{
        console.log('Formulario:', data);
        estado.textContent = '¡Gracias! Responderemos pronto.';
        form.reset();
      }, 800);
    });

    // ====== Utilidades ======
    document.getElementById('anio').textContent = new Date().getFullYear();

    // Menú móvil
    const hamb = document.getElementById('hamb');
    const menu = document.getElementById('menu');
    hamb.addEventListener('click', ()=>{
      const visible = window.getComputedStyle(menu).display !== 'none';
      menu.style.display = visible ? 'none' : 'flex';
      menu.style.flexDirection = 'column';
      menu.style.gap = '.6rem';
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
