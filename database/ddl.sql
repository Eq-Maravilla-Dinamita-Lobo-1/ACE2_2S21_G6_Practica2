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

-- -------------------------------- ENDPOINT'S
-- '/actualStatus'
-- '/today/:filter/:value'
-- '/yesterday/:filter/:value'
-- '/week/:filter/:value'
-- '/lastweek/:filter/:value'
-- '/month/:filter/:value'
-- '/lastmonth/:filter/:value'

-- Status Actual
CREATE PROCEDURE actualStatus()
BEGIN
    select round(avg(st.temperature),2) as temperature, round(avg(st.temperaturef),2) as temperaturef,
           round(avg(st.humidity),2) as humidity, round(avg(st.windspeed),2) as windspeed,
           tmp.direction, round(avg(st.brightness),2) as brightness, date_add(now(), interval -6 HOUR ) as date_time
    from status st,
         (select dir.direction from (select st.winddirection as direction,count(st.winddirection) as cont  from status st
    where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
    and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
    group by direction order by direction ) dir order by dir.cont desc limit 1) tmp
    where year(st.date_time) = ( select max(year(sta.date_time)) from status sta )
    and dayofyear(st.date_time) = ( select max(dayofyear(sta.date_time)) from status sta)
    and hour(st.date_time) = (
        select max(hour(sta.date_time))
        from status sta
        where dayofyear(sta.date_time) = (select max(dayofyear(sta.date_time)) from status sta)
    ) group by tmp.direction;
END;

-- todos los registros del dia actual
    -- mayor
select max(st.temperature) as max, hour(st.date_time) as hour from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by hour(st.date_time) order by hour;

    -- menor
select min(st.temperature) as min, hour(st.date_time) as hour from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by hour(st.date_time) order by hour;

    -- media
select round(avg(st.temperature),2) as avg, hour(st.date_time) as hour from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by hour(st.date_time) order by hour;

    -- Direccion del viento del dia actual
select st.winddirection as direction,count(st.winddirection) as cont  from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by direction order by direction;


-- Todos los registros del dia anterior
    -- mayor
select max(st.temperature) as max, hour(st.date_time) as hour from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by hour(st.date_time) order by hour;

    -- menor
select min(st.temperature) as min, hour(st.date_time) as hour from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by hour(st.date_time) order by hour;

    -- media
select round(avg(st.temperature),2) as avg, hour(st.date_time) as hour from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by hour(st.date_time) order by hour;

    -- Direccion del viento del dia anterior
select st.winddirection as direction,count(st.winddirection) as cont  from status st
where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by direction order by direction;


-- Todos los registros de la semana actual, promedio del dia
    -- mayor
select max(st.temperature) as max, dayofweek(st.date_time) as day from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by dayofweek(st.date_time) order by day;

    -- menor
select min(st.temperature) as min, dayofweek(st.date_time) as day from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by dayofweek(st.date_time) order by day;

    -- media
select round(avg(st.temperature),2) as avg, dayofweek(st.date_time) as day from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by dayofweek(st.date_time) order by day;

    -- Direccion del viento de la semana actual
select st.winddirection as direction,count(st.winddirection) as cont  from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by direction order by direction;


-- Todos los registros de la semana pasada, promedio del dia
    -- mayor
select max(st.temperature) as max, dayofweek(st.date_time) as day from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by dayofweek(st.date_time) order by day;

    -- menor
select min(st.temperature) as min, dayofweek(st.date_time) as day from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by dayofweek(st.date_time) order by day;

    -- media
select round(avg(st.temperature),2) as avg, dayofweek(st.date_time) as day from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by dayofweek(st.date_time) order by day;

    -- Direccion del viento de la semana pasada
select st.winddirection as direction,count(st.winddirection) as cont  from status st
where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by direction order by direction;


-- Todos los registros del mes actual, promedio de dias
    -- mayor
select max(st.temperature) as max, day(st.date_time) as day from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by day(st.date_time) order by day;

    -- menor
select min(st.temperature) as min, day(st.date_time) as day from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by day(st.date_time) order by day;

    -- media
select round(avg(st.temperature),2) as avg, day(st.date_time) as day from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by day(st.date_time) order by day;

    -- Direccion del viento del mes actual
select st.winddirection as direction,count(st.winddirection) as cont  from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by direction order by direction;


-- Todos los registros del mes anterior, promedio de dias
    -- mayor
select max(st.temperature) as max, day(st.date_time) as day from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by day(st.date_time) order by day;

    -- menor
select min(st.temperature) as min, day(st.date_time) as day from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by day(st.date_time) order by day;

    -- media
select round(avg(st.temperature),2) as avg, day(st.date_time) as day from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by day(st.date_time) order by day;

    -- Direccion del viento del mes pasado
select st.winddirection as direction,count(st.winddirection) as cont  from status st
where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
group by direction order by direction;
