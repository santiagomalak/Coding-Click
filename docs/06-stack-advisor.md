# Stack Advisor — herramienta de recomendación de pack

## Qué es
Un cuestionario corto e interactivo dentro de la web. El visitante responde unas preguntas simples y al final recibe el pack (o combinación de packs) que mejor encaja con su negocio, con un resumen y la posibilidad de enviarlo por WhatsApp o descargarlo.

Objetivo doble:
1. Ayudar al visitante a entender qué necesita, sin tener que leer y comparar todo por su cuenta.
2. Generar un lead calificado: cuando escribe por WhatsApp, ya sabemos qué pack le interesa y por qué.

## Formato (versión inicial, simple)
Cuestionario de **4 a 6 preguntas**, una por pantalla, con opciones para elegir (no texto libre). Debe sentirse rápido: menos de un minuto para completarlo.

### Preguntas sugeridas (ajustar con el catálogo real de `02-packs-y-precios.md`)
1. ¿Tu negocio hoy tiene página web?
   - No tengo nada todavía
   - Tengo una web vieja o que no me convence
   - Tengo web y funciona bien
2. ¿Qué necesitás que haga la web?
   - Mostrar mi negocio y que me contacten
   - Vender productos online (carrito de compras)
   - Algo a medida (sistema, reservas, gestión)
3. ¿Cómo está tu presencia en redes sociales?
   - No tengo o casi no publico
   - Publico de vez en cuando, sin estrategia
   - Publico seguido pero quiero mejorar resultados
   - Ya tengo quien me la maneja
4. ¿Qué tan rápido necesitás tenerlo listo?
   - Lo antes posible
   - En 1 a 2 meses
   - Sin apuro, estoy evaluando
5. (Opcional) ¿Cuál es tu rubro? — para adaptar el ejemplo del resumen final, no para descartar ningún pack.
6. (Opcional) Rango de presupuesto aproximado, con opciones amplias, no un número exacto.

## Lógica de recomendación
Reglas simples tipo árbol de decisión (si → entonces), NO necesita inteligencia artificial ni nada complejo:
- Sin web + quiere mostrar el negocio → **Pack Lanzamiento** (Landing + branding básico + 1 mes de marketing).
- Sin web o web vieja + quiere vender online → **Pack Ventas** (E-commerce + marketing Completo).
- Tiene web y funciona bien + quiere mejorar redes → ofrecer **solo marketing** (Presencia, Crecimiento o Completo según cómo describa sus redes).
- Pide algo a medida → siempre recomendar **A medida**, con nota de que se cotiza por reunión.
- Si eligió "ya tengo quien maneja mis redes" → no ofrecer marketing en el resultado, solo desarrollo.

Dejar esta lógica en un archivo de configuración propio (tabla de reglas), no mezclada con el diseño del componente, para poder ajustarla sin tocar código.

## Qué muestra el resultado final
1. **Pack recomendado** (nombre y para quién es).
2. **Resumen de qué incluye**, en 3-4 líneas, en el mismo tono simple del resto de la web.
3. **Precio estimado o rango**, tomado de `02-packs-y-precios.md` (mismo dato, un solo lugar de la verdad: no duplicar precios entre el Advisor y la página de Servicios).
4. **Dos acciones:**
   - Botón de WhatsApp con mensaje prellenado que incluya el pack recomendado y las respuestas clave (ej.: "Hola! Hice el Stack Advisor y me recomendó el pack Ventas. Quiero más info.").
   - Botón para descargar o recibir un resumen (ver "Entrega del resumen" abajo).
5. Aclaración chica de que es una orientación inicial y que el presupuesto final se confirma por WhatsApp.

## Entrega del resumen (PDF o WhatsApp)
Dos caminos posibles, elegir el más simple de implementar primero:
- **Opción A (más simple): todo por WhatsApp.** El botón abre WhatsApp con el mensaje prellenado que ya incluye el resumen en texto. No requiere generar archivos.
- **Opción B: PDF descargable.** Se genera un PDF corto (1 página) en el momento, con el pack recomendado, qué incluye y el precio estimado, más los datos de contacto de la agencia. Requiere una librería liviana de generación de PDF en el navegador.

Recomendación: arrancar con la **Opción A** para la primera versión (más rápida de construir y de mantener) y dejar la Opción B como mejora posterior si se justifica.

## Datos que NO hay que pedir en esta versión
Nombre, mail o teléfono del visitante antes de mostrar el resultado. El Advisor debe funcionar sin fricción: el contacto llega después, cuando el propio usuario decide escribir por WhatsApp.

## Requisitos técnicos
- Componente propio y liviano, sin dependencias pesadas.
- Datos de precios y packs tomados del mismo archivo de configuración que usa el resto del sitio (una sola fuente de verdad).
- Funciona bien en celular (la mayoría de las visitas van a ser desde ahí): pantalla por pregunta, botones grandes, fácil de volver atrás.
- Guardar el progreso en memoria mientras el usuario navega el cuestionario (si recarga la página, puede reiniciar sin problema; no hace falta persistencia).
- Accesible: se puede completar solo con teclado, textos con buen contraste.
- No usar el resultado del Advisor para bloquear ni ocultar el resto de la web: sigue estando toda la información de packs disponible igual, para quien prefiera no hacer el cuestionario.

## Pendiente a definir con el uso real
- Ajustar las preguntas y las reglas de recomendación con los primeros clientes reales.
- Evaluar si conviene sumar la Opción B (PDF) más adelante.
- Evaluar si conviene guardar (de forma simple y con consentimiento) qué packs recomienda más el Advisor, para saber qué está pidiendo la gente.
