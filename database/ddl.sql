CREATE DATABASE weather_station;

USE weather_station;

CREATE TABLE status(
    id_status INT NOT NULL AUTO_INCREMENT,
    temperature FLOAT NOT NULL,
    temperaturef FLOAT NOT NULL,
    humidity FLOAT NOT NULL,        
    windspeed FLOAT NOT NULL,
    winddirection VARCHAR(5) NOT NULL,
    brightness INT NOT NULL,
    date_time DATETIME NOT NULL,
    primary key (id_status)
);

INSERT INTO status (temperature, temperaturef, humidity, windspeed, winddirection, brightness, date_time) VALUES (15.4, 59.72, 69.8, 
0, Este, 0, NOW());

INSERT INTO status(temperature, temperaturef, humidity, windspeed, winddirection, brightness, date_time)
VALUES 
(20.60, 69.08, 168.80, 10.0, 'Norte', 100, NOW()),
(20.60, 69.08, 170.20, 11.0, 'Norte', 100, NOW()),
(20.60, 69.08, 176.40, 9.0, 'Este', 120, NOW()),
(20.60, 69.08, 169.80, 9.0, 'Este', 120, NOW()),
(20.60, 69.08, 168.80, 9.0, 'Norte', 110, NOW()),
(22.2, 71.96, 168.0, 9.0, 'Este', 110, NOW()),
(22.2, 71.96, 168.0, 10.0, 'Sur', 110, NOW()),
(22.2, 71.96, 168.0, 9.0, 'Sur', 100, NOW()),
(22.2, 71.96, 167.80, 11.0, 'Sur', 125, NOW()),
(22.2, 71.96, 166.80, 12.0, 'Este', 125, NOW()),
(22.2, 71.96, 166.80, 12.0, 'Este', 100, NOW());

