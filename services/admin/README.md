


# Microservicio Admin para clon de AirBNB #

## Pasos para levantarlo y que todo funcioen ##
1. Crear el .env con las variables de entorno necesarias. El ejemplo del .env
    se encuentra en la carpeta compartida del proyecto (solo miembros del equipo)  
    **IMPORTANTE**: Remover el BOM (Byte Order Mark) del archivo .env si es que existe.
2. levantar la instance de Kafka desde el root de la carpeta de QUE CONTIENE
TODOS LOS PROYECTOS (no desde el root de admin)
(para que los microservicios puedan comunicarse)
````shell
docker-compose up -d
````

3. Crear el entorno virtual (de no haberlo hecho ya)
````shell
python -m .venv .venv
````
Y activarlo (en Windows)
````shell
.venv\Scripts\activate
````

4. Ejecutar el comando para instalar las dependencias
````shell
pip install -r requirements.txt
````

5. Levantar el microservicio
````shell
python manange.py runserver 
````

6. Levantar el comamnd para el kafka consumer (en una 2da terminal)
````shell
python manage.py run_kafka_consumer
````


### Datos importantes ###
Si no se quita el BOM del .env (como se indica en el paso 2)
hay 2 posibilidades: 
1. Un error salte y que no cree la base de datos)
2. No salte el error pero las tablas se crearan en la base de datos llamada
"postgres" en lugar de la especificada en el .env