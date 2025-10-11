# Etapa de construcción
FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /app
COPY demo/pom.xml .
COPY demo/src ./src

RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
