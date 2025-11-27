
#### Author: Sebastian Rengel ####

# API GATEWAY CON APACHE APISIX #

## Aviso ##
API Six ya está configurado, y no quiero tener que volver a hacerlo. Así que no cambiar los archivos dentro de **conf/** o **docker-compose.yml** sin avisarme. Lo digo en serio.

## Para iniciar el api gateway:
```shell
docker-compose -d up
```

Esto iniciará tanto Kafka como la API Gateway

## DATOS IMPORTANTES PARA TRABAJAR CON EL API GATEWAY

Una vez encendida la API Gateway, para poder acceder a los microservicios, se usará la URL base:
```shell
localhost:9000/api/{nombre del microservicio}
```

En este punto, se puede trabajar con las mismas rutas con las que trabajaríamos usualmente.

## Nombres de los microservicios ##
```json
{
    "identity-service" : "localhost:9000/api/identity-service/...",
    "admin-service" : "localhost:9000/api/admin-service/...",
    "admin-payments" : "localhost:9000/api/payments/..."

    ...Por agregar...
}
```
**NOTA IMPORTANTE:** Los Microservicios hecho con Django tienen problemas con los "/" al final de la URL. Configuré APISIX para que no necesiten agregar  ese leading trail "/". Si lo hacen, les retornará un **Http404**. Así que no lo hagan


# Datos que pueden ser utiles #

## Puertos internos en los que estan corriendo los microservicios ##
1. Identity-Service: 5000
2. Admin-Service: 5001
3. Payment-Service: 5002
4. Listing-Service: 5003  

5. Kafka-UI: 7092
5. Kafka: 9092  

6. APISIX: 9000

- Como pueden ver, los puertos internos de los microservicios inician en el 5000 y van de forma ascendente. Tomar en cuenta al crear un nuevo microservicio. **SI 2 MICROSERVICIOS TIENEN EL MISMO PUERTO CONFIGURADO EN SUS RESPECTIVOS PROYECTO, HABRÁ ERROR**

- APISIX está usando el puerto 9000 y Kafka el puerto 9092 (tomar en cuenta que estos puertos no pueden ser ocupados por nuestros microservicios BAJO NINGUNA INSTANCIA)





