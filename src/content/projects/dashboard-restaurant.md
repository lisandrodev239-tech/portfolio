---
title: "Dashboard Administrativo para Restaurant"
description: "Sistema de gestión integral para restaurant con módulos de inventario, ventas, empleados y reportes en tiempo real."
image: ""
demoUrl: ""
githubUrl: ""
status: "completado"
percentage: 100
technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"]
year: 2025
clientType: "PyME"
featured: true
---

## Problema

El cliente, un restaurant mediano, gestionaba su inventario y ventas en planillas de Excel dispersas. 
No tenía visibilidad en tiempo real de:
- Qué productos se agotaban
- Cuál era el ventas diaria
- Cuánto ganaba realmente cada plato
- Quiénes trabajaban y sus horarios

El tiempo dedicado a tareas administrativas superaba las 4 horas diarias.

## Solución

Desarrollé un dashboard web accesible desde cualquier dispositivo (computadora, tablet, celular) que permite:

**Gestión de Inventario:**
- Registro de productos con alertas de stock mínimo
- Historial de entradas y salidas
- Control de mermas

**Punto de Venta (POS):**
- Interfaz táctil optimizada para restaurantes
- Registro rápido de pedidos
- División de cuentas y propinas

**Reportes:**
- Ventas diarias, semanales, mensuales
- Plato más vendido
- Hora punta
- Ganancias netas por período

**Gestión de Empleados:**
- Control de horarios
- Registro de asistenta
- Cálculo automático de nómina

## Stack Utilizado

- **Frontend:** Next.js 14 con App Router, TypeScript, Tailwind CSS
- **Backend:** API Routes de Next.js
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Estado:** React Context + useReducer

## Decisiones Técnicas

1. **Supabase en lugar de backend personalizado**: Redujimos el tiempo de desarrollo en un 40%. 
   La autenticación y base de datos gestionadas por Supabase nos permitieron enfocarnos en la lógica de negocio.

2. **Server Components para reportes**: Los reportes son complejos y requieren muchas consultas. 
   Usar Server Components nos permitió mantener el código del cliente ligero.

3. **UI adaptada a táctil**: Dado que el restaurant usa tablets, optimicé todos los botones 
   y zonas clicables para dedos (mínimo 44px).

4. **Diseño responsive-first**: El dashboard se usa tanto en cocina (tablet desktop) como 
   en mesa del gerente (celular). Tailwind facilitó esto enormemente.

## Resultados

- **Reducción 60%** en tiempo de gestión administrativa
- **Tiempo real** de inventario y ventas
- **ROI en 3 meses** considerando ahorro en horas extras
- Interfaz intuitiva que no requiere capacitación técnicas
- Acceso desde cualquier dispositivo con internet