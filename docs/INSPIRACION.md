# Be Strong App — Inspiración y dirección para el nuevo look & feel

> Investigación web (nov 2026) más una propuesta concreta para Be Strong: **modo claro/oscuro**, un **mejor diseño** y **slide sheets** (paneles deslizables) para capturar información.
> Antecedentes: [DISENO.md](./DISENO.md) (estado actual y problemas) y [ARQUITECTURA.md](./ARQUITECTURA.md).

---

## 1. Qué hacen las apps de gimnasio modernas

| Referencia | Qué tomar |
|---|---|
| **Gymdesk: Owner Dashboard** ([link](https://gymdesk.com/features/dashboard)) | Un solo tablero con *sesiones en curso, próximas sesiones y reservas de hoy*, un gráfico de asistencia de 7 días y un bloque de **recordatorios**: cumpleaños en los próximos 30 días, miembros que dejaron de venir y tareas pendientes. Los widgets dependen del rol. |
| **Zen Planner: dashboard modernizado** ([link](https://zenplanner.com/blogs/your-business-at-a-glance-the-modernized-zen-planner-dashboard/)) | Tarjetas agrupadas "como piensa el dueño": miembros activos, altas nuevas, **tendencias** y señales tempranas de baja asistencia. Busca menos ruido y más jerarquía. |
| **Comparativa Gymdesk 2026** ([link](https://gymdesk.com/blog/features-best-gym-management-software)) | Argumenta que lo simple le gana a lo cargado de funciones y señala la UI anticuada como el punto débil de los productos más viejos. |
| **Arbox: check-in** ([link](https://www.arboxapp.com/blog/arboxs-gym-check-in-software-simplify-your-visitor-management)) | La vista del día como centro: quién está hoy y en qué clase. |
| **Trainway Gym Web App (Dribbble)** ([link](https://dribbble.com/shots/23665411-Trainway-Gym-Web-App-Redesign)) · **FitTrack (Contra)** ([link](https://contra.com/p/cg2OYRRm-fit-track-gym-management-platform-design)) | Referencias visuales de dashboards de gimnasio: perfil de miembro, asistencia y KPIs en tarjetas. |
| Apps de composición corporal (ej. [Body Stats](https://apps.apple.com/us/app/id6751863280), [Bodly](https://apps.apple.com/app/id6740700700)) | Resumen arriba con el **valor actual grande** de peso, % de grasa y músculo, y debajo el gráfico de progreso. Muestran el dato antes que la tabla. |

**Conclusión para Be Strong:** el Inicio debe responder *"¿qué tengo que hacer hoy?"* (clases de hoy con lista, cumpleaños, quién dejó de venir, a quién le toca medirse), no mostrar dos contadores grandes.

## 2. Slide sheets: cuándo usar sheet, diálogo o página

Las guías de diseño revisadas coinciden:

- **Diálogo** para tareas **cortas** o **destructivas** que exigen una respuesta: confirmar un borrado, por ejemplo. ([Supabase Design System](https://supabase.com/design-system/docs/ui-patterns/modality), [patrón drawer-vs-dialog](https://cdn.jsdelivr.net/npm/@exxatdesignux/ui@0.6.59/consumer-extras/patterns/drawer-vs-dialog-pattern.md))
- **Side sheet** para **formularios de varios campos** cuando **el contexto de atrás importa** (la lista o la ficha del miembro). Permite pasos múltiples. ([Innovaccer Side Sheet](https://design.innovaccer.com/components/sidesheet/usage))
- **Página o ruta** cuando la tarea es larga o necesita su propia URL. Una sheet no reemplaza a una página que debe poder enlazarse.
- **Evitar modales anidados**: hacen perder el contexto. ([Glomopay, Modals 101](https://blog.glomopay.com/modals-101-when-and-how-to-use-them/))
- **Responsive**: lo que en escritorio es *side sheet* se convierte en *bottom sheet* en móvil, que queda al alcance del pulgar y debe subir con el teclado. ([Material: side sheets](https://material.io/components/sheets-side), [bottom sheets](https://material.io/components/sheets-bottom))
- **Accesibilidad**: título visible, foco atrapado dentro, **Escape cierra** y, al cerrar, el foco vuelve al botón que la abrió. Si hay cambios sin guardar, preguntar antes de cerrar.

### Cómo se aplica a Be Strong

| Acción | Hoy | Propuesta |
|---|---|---|
| Nuevo miembro / editar datos | Diálogo con campos ocultos tras "expandir" · edición inline | **Side sheet** "Miembro" con secciones (Datos · Contacto · Plan semanal) |
| Nueva medida / editar medida | Diálogo | **Side sheet** "Medición". Con la ficha visible detrás se puede comparar con la medida anterior; cada campo muestra el valor previo como ayuda. |
| Nueva clase | Diálogo a pantalla completa con editor Markdown de doble panel | **Side sheet ancha** (~640px) con tipo, duración, horarios y descripción con vista previa en tabs (no en doble panel). |
| Pasar lista (asistentes) | Modo inline con +/−, buscador y 💾 | **Side sheet "Pasar lista"** con todos los miembros activos en checkboxes; vienen marcados solo los ya registrados (**sin preselección por plan**, decisión del dueño). Así es un solo flujo, no dos (agregar y quitar). |
| Equipo y categoría | Diálogos y `contentEditable` invisible | **Side sheet** para crear y editar. Renombrar dentro de la misma sheet. |
| Horario nuevo (config) | Diálogo con time picker | Puede seguir siendo un **diálogo** (un solo campo). |
| Eliminar medida, equipo o categoría | Diálogo | Se mantiene el **diálogo** de confirmación con el botón destructivo en rojo. |
| Filtro de rango de medidas | Popover | Se mantiene el **popover**, con *chips* de atajos visibles sin abrirlo. |

**Anatomía de la sheet en Be Strong:** encabezado fijo (título, subtítulo con contexto como "Carlos Jiménez · última medida 03/10" y ✕), cuerpo con scroll, y pie fijo con `Cancelar` y el botón primario a la derecha. En escritorio ancho de 480px (640px la ancha); en móvil, bottom sheet al 92% del alto con la barrita para arrastrar.

## 3. Modo claro / oscuro

### Prácticas recomendadas
- **No usar negro puro** de fondo. La elevación se marca con **superficies progresivamente más claras**, porque las sombras casi no se ven en oscuro. ([superdesign.dev](https://superdesign.dev/styles/dark-mode), [ekolsoft](https://ekolsoft.com/en/b/dark-mode-design-best-practices-guide), [cmarix](https://www.cmarix.com/blog/8-time-tested-dark-theme-design-tips-to-advance-dashboard-development/))
- **Medir el contraste** con WCAG AA (texto ≥ 4.5:1) en ambos modos, en lugar de suponerlo. ([Nhost](https://www.nhost.io/blog/dark-mode), [uxcel](https://uxcel.com/blog/12-principles-of-dark-mode-design-627))
- En los dashboards, **atenuar todo lo secundario** para que los datos destaquen. ([Sumo Logic](https://www.sumologic.com/blog/dark-theme.md))
- Ofrecer **Claro · Oscuro · Sistema**, con *Sistema* como valor por defecto.

### Cómo implementarlo en el stack (MUI)
MUI ya trae soporte nativo para esto ([docs dark mode](https://mui.com/material-ui/customization/dark-mode)):

```ts
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' }, // todo el tema como CSS vars → cambio sin re-render ni parpadeo
  colorSchemes: { light: { palette: {...} }, dark: { palette: {...} } },
});
// <ThemeProvider theme={theme} defaultMode="system">
// toggle: const { mode, setMode } = useColorScheme();   // 'light' | 'dark' | 'system'
// estilos por modo: sx={(t) => ({ bgcolor: 'background.paper', ...t.applyStyles('dark', {...}) })}
```

- **Requiere actualizar MUI.** El proyecto usa `@mui/material ^5.11` y la versión actual es la **9.5** (la 6.5 es la última de v6). `colorSchemes`, `cssVariables` y `useColorScheme` dentro de `createTheme` existen a partir de v6. En v5 solo hay una API experimental. Como de todos modos vamos a reescribir el frontend, conviene actualizar MUI y migrar las fechas en el mismo paso.
- **Condición necesaria:** eliminar los **104 colores hex hardcodeados**. Con un `#fff` suelto en un componente, el modo oscuro no funciona. Todo debe salir de los tokens (`background.paper`, `text.secondary`, `divider`, etc.).
- Chart.js no lee CSS vars: hay que pasarle los colores del tema activo (un hook `useChartTheme()`).
- El modo se guarda por usuario en `localStorage`, que es lo que MUI hace por defecto.

## 4. Dirección visual: dos opciones

Ambas parten de un sistema de tokens con modo claro y oscuro. El problema actual es que **el logo (negro con amarillo dorado) y la UI (naranja salmón) no se parecen**. Hay que elegir uno de los dos caminos:

> **Decisión (2026-11-03): se elige la opción A "Iron"** porque coincide con los colores de la marca (logo negro y amarillo). Preview: [`preview/estilos.html`](./preview/estilos.html).

### Opción A: "Iron" (sale del logo) ✅ elegida
Grafito y negro con **amarillo eléctrico** como acento. Se ve como un gimnasio y en modo oscuro luce mucho.

| Token | Claro | Oscuro |
|---|---|---|
| `bg` | `#F6F6F4` | `#0F0F10` |
| `surface` / `surface-2` | `#FFFFFF` / `#EFEFEC` | `#18181B` / `#222226` |
| `text` / `muted` | `#18181B` / `#5B5B63` | `#F4F4F5` / `#A1A1AA` |
| `border` | `#E2E2DE` | `#2E2E33` |
| `primary` (relleno de botones, con texto negro) | `#FACC15` | `#FACC15` |
| `primary-ink` (links y acentos sobre fondo claro) | `#854D0E` | `#FDE047` |
| `success` / `warning` / `danger` | `#15803D` / `#B45309` / `#B91C1C` | `#4ADE80` / `#FBBF24` / `#F87171` |

El amarillo **nunca** se usa como color de texto sobre blanco (no alcanza el contraste); solo como relleno con texto negro.

### Opción B: "Ember" (mantiene el naranja)
Conserva la familia del naranja actual. Hoy `#FF6E31` con texto blanco da **2.79:1** y no pasa AA. Se ajusta así: botones `#C2410C` con texto blanco (5.18:1); `#EA580C` (3.56:1) solo para texto grande o decoración. Superficies neutras. Requiere rediseñar el logo en naranja para que la marca sea una sola.

Contrastes medidos (WCAG) de la opción A: amarillo sobre negro 11.6:1 · `primary-ink` claro 6.9:1 y oscuro 13.4:1 · `muted` 6.2:1 en claro y 6.9:1 en oscuro · amarillo sobre blanco **1.5:1** (por eso nunca se usa como texto).

### Común a ambas
- **Tipografía**: una display condensada **solo para titulares y números grandes** (se puede conservar *Cabin Condensed* u optar por *Barlow Condensed*) más una sans legible para el cuerpo (*Inter*). Los números de medidas y tablas van con `font-variant-numeric: tabular-nums`.
- **Radios** 8/12/16 (no 20 en todo). Escala de espaciado de 4px.
- **Íconos** de línea de una sola familia (Lucide o Material Symbols Rounded), **sin emojis** en la UI administrativa. Los emojis se pueden quedar en la página pública del miembro, donde el tono es más cercano.
- **Estados**: el chip de clasificación lleva color, ícono y texto, nunca solo color.
- **Avatares** con iniciales y un color derivado del nombre, sin depender de robohash.

## 5. Pantallas clave rediseñadas (wireframes)

**Inicio: "Hoy"**
```
┌ Hoy · martes 3 nov ──────────────────────────── [☀/☾] (T) ┐
│ [Miembros activos 9 ↑1] [Asistencias semana 23] [Clases hoy 2] │
│ ┌ Clases de hoy ───────────────┐ ┌ Recordatorios ────────────┐ │
│ │ 5:30 PM Funcional  4/9 [Pasar lista] │ 🎂 Ana Lucía cumple hoy │ │
│ │ 7:00 PM Funcional  2/9 [Pasar lista] │ ⚠ 3 sin venir +14 días  │ │
│ └──────────────────────────────┘ │ ⚖ 5 sin medir +90 días    │ │
│ ┌ Asistencia últimos 7 días ▁▃▅▂▆▇▃ ┐ └───────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

**Miembros: lista densa** (vista de tarjetas opcional)
```
[🔍 Buscar…] [Activos ▾] [Categoría ▾]                     [+ Nuevo miembro]
 (CJ) Carlos Jiménez Mora   A2   Últ. asistencia hace 0 d   Últ. medida 03/11   ›
 (AL) Ana Lucía Vargas      A1   hace 0 d                   03/11               ›
```

**Detalle de miembro: encabezado más tabs**
```
(CJ) Carlos Jiménez Mora · A2 · Activo        [🔗 Compartir] [✎ Editar] [+ Medición]
[ Resumen | Medidas | Asistencia | Datos ]
Resumen: 6 tarjetas de métrica (valor grande + chip + Δ + sparkline) · asistencia del año (heatmap tipo GitHub)
```

**Pasar lista (side sheet)**
```
┌ Pasar lista ─────────────────────── ✕ ┐
│ Funcional · hoy 5:30 PM               │
│ [🔍 Buscar]   Seleccionados: 4        │
│ ☑ Carlos Jiménez   (plan: L-M-V)      │
│ ☑ Ana Lucía Vargas                    │
│ ☐ Andrés Quesada                      │
├───────────────────────────────────────┤
│              [Cancelar] [Guardar (4)] │
└───────────────────────────────────────┘
```

## 6. Próximos pasos propuestos

1. **Elegir la dirección visual** (A "Iron" o B "Ember").
2. Construir un **prototipo HTML navegable** (local, con toggle claro/oscuro) de Inicio, Miembros, Detalle y la sheet de medición, para validar el look antes de tocar React.
3. Con el diseño validado: actualizar MUI, crear el theme con tokens y los componentes base (`AppSheet`, `ConfirmDialog`, `MetricCard`, `DataTable`, `MemberAvatar`, `ThemeToggle`) y reescribir por feature según el orden de ARQUITECTURA.md §7.
