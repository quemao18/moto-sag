# Moto SAG

Aplicación para calcular el SAG (asentamiento de suspensiones) de una moto de forma sencilla y rápida.

URL: <https://moto-sag.web.app/>

## ¿Qué es el SAG?

El SAG es la cantidad que se hunde la suspensión desde su extensión total hasta:

1. El propio peso de la moto (SAG estático / libre).
2. El peso de la moto más el piloto equipado (SAG dinámico / con piloto).

Mantener el SAG dentro de los rangos recomendados ayuda a que la suspensión trabaje correctamente, mejorando agarre, estabilidad y confort.

## Medidas necesarias

Se toman tres medidas delante (F) y tres detrás (R) en milímetros (mm). Usa siempre los mismos puntos de referencia en el chasis y el eje.

| Código | Significado | Condición |
| ------ | ----------- | --------- |
| RA | Rear A | Moto en un banco / caballete (suspensión trasera totalmente extendida) |
| RB | Rear B | Moto en el suelo sin piloto |
| RC | Rear C | Moto con el piloto completo (equipo puesto) |
| FA | Front A | Moto en un banco / rueda delantera descargada |
| FB | Front B | Moto en el suelo sin piloto |
| FC | Front C | Moto con el piloto completo |

## Cálculos

Fórmulas (en mm):

```text
SAG Estático Trasero  = RA - RB
SAG Estático Delantero = FA - FB
SAG Dinámico Trasero   = RA - RC
SAG Dinámico Delantero = FA - FC
```

## Rangos recomendados (orientativos)

| Tipo | Delantero (mm) | Trasero (mm) |
| ---- | -------------- | ------------ |
| SAG Estático | 30 – 40 | 30 – 40 |
| SAG Dinámico | 60 – 70 | 100 – 110 |

Si el SAG es mayor al rango, normalmente se AUMENTA la precarga (apretar el resorte). Si es menor, se DISMINUYE la precarga (aflojar el resorte).

## Interpretación rápida

| Situación | Resultado | Acción típica |
| --------- | --------- | ------------- |
| SAG estático alto | Mucho hundimiento libre | Aumentar precarga |
| SAG estático bajo | Poco hundimiento libre | Disminuir precarga |
| SAG dinámico alto | Mucho hundimiento con piloto | Aumentar precarga (o muelle más duro si extremo) |
| SAG dinámico bajo | Poco hundimiento con piloto | Disminuir precarga (o muelle más blando si extremo) |

## Ejemplos

### Ejemplo 1

```text
RA = 600
RB = 550
RC = 480
SAG Estático Trasero: 600 - 550 = 50 mm  → (Aumentar precarga, apretar resorte)
SAG Dinámico Trasero: 600 - 480 = 120 mm → (Aumentar precarga, apretar resorte)
```

### Ejemplo 2

```text
RA = 600
RB = 580
RC = 530
SAG Estático Trasero: 600 - 580 = 20 mm  → (Quitar precarga, aflojar resorte)
SAG Dinámico Trasero: 600 - 530 = 70 mm  → (Quitar precarga, aflojar resorte)
```

### Ejemplo 3

```text
RA = 600
RB = 565
RC = 495
SAG Estático Trasero: 600 - 565 = 35 mm  → (Precarga correcta)
SAG Dinámico Trasero: 600 - 495 = 105 mm → (Precarga correcta)
```

## Notas

* Comprueba siempre las medidas dos veces.
* Asegúrate de que el piloto lleva TODO el equipo (botas, casco, etc.).
* Si no puedes alcanzar los rangos con la precarga, quizás necesites cambiar el muelle (más duro o más blando).

## Desarrollo

Repositorio y código bajo mejoras continuas. ¡Contribuciones y sugerencias son bienvenidas!

## Licencia

Si no se especifica lo contrario, se asume uso personal / educativo. Añade una licencia explícita si es necesario.
