CREATE DATABASE weather_station;

USE weather_station;

CREATE TABLE status(
    id_status INT NOT NULL AUTO_INCREMENT,
    temperature FLOAT NOT NULL,
    temperaturef FLOAT NOT NULL,
    humidity FLOAT NOT NULL,        
    windspeed FLOAT NOT NULL,
    winddirection VARCHAR(5) NOT NULL,
    primary key (id_status)
);

INSERT INTO status(temperature, temperaturef, humidity, windspeed, winddirection)
VALUES 
(20.60, 69.08, 168.80, 10.0, 'Norte'),
(20.60, 69.08, 170.20, 11.0, 'Norte'),
(20.60, 69.08, 176.40, 9.0, 'Este'),
(20.60, 69.08, 169.80, 9.0, 'Este'),
(20.60, 69.08, 168.80, 9.0, 'Norte'),
(22.2, 71.96, 168.0, 9.0, 'Este'),
(22.2, 71.96, 168.0, 10.0, 'Sur'),
(22.2, 71.96, 168.0, 9.0, 'Sur'),
(22.2, 71.96, 167.80, 11.0, 'Sur'),
(22.2, 71.96, 166.80, 12.0, 'Este'),
(22.2, 71.96, 166.80, 12.0, 'Este');
