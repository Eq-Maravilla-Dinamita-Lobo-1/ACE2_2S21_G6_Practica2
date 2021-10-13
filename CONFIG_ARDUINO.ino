/*
  Capitulo 24 de Arduino desde cero en Español.
  Programa que permite establecer una comunicacion con el modulo Bluetooth HC-05
  y configurarlo de manera tal que pueda ser vinculado mediante un telefono
  movil o dispositivo compatible.

  Autor: bitwiseAr  

*/

#include <SoftwareSerial.h> // libreria que permite establecer pines digitales
        // para comunicacion serie
#include  <DHT.h>
#include <Wire.h>  

//COSNTANTES
#define waitTime 2000
float humidity;
float temperature;
float temperatureF;
String windDirection;
float windSpeed;
int aux = 0;
//SENSOR DE LUZ

const long Az = 1000;
const int Bz = 15;
const int Rcz = 10;

int Vz;
int ilum;


//------------------------------------------------------------------veleta
float veleta1=0;
float veleta2=0;
String velet= " ";

//---------------------------------------------------------------anemometro
float v1 = 0;
float veloc1 =0;
String v1t = " ";


//-------------------------------------------------------DHT11
// Definimos el pin analogico donde se conecta el sensor
#define DHTPIN 7
// Dependiendo del tipo de sensor
#define DHTTYPE DHT11
 
// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);

SoftwareSerial miBT(10, 11);  // pin 10 como RX, pin 11 como TX

void setup(){
  Serial.begin(9600);   // comunicacion de monitor serial a 9600 bps
  //Serial.println("Listo");  // escribe Listo en el monitor
  miBT.begin(38400);    // comunicacion serie entre Arduino y el modulo a 38400 bps
}

String getJSON( float humidity, float temperature, float temperatureF, String windDirection, float windSpeed, int Luminocidad){
  String value = "{ \"temperature\": ";
  value.concat( temperature );

  value.concat(", \"temperatureF\": ");
  value.concat( temperatureF );

  value.concat(", \"humidity\": ");
  value.concat( humidity );

  value.concat(", \"windSpeed\": ");
  value.concat( windSpeed );

  value.concat(", \"windDirection\": ");
  value.concat( windDirection );

  value.concat(", \"Luminocidad\": ");
  value.concat( Luminocidad );
  
  
  return value + " }";
}

void loop(){
  aux = 0;

  Vz = analogRead(A7);
  ilum = ((long)Vz*Az*10)/((long)Bz*Rcz*(1024-Vz));
  Serial.println(ilum);
  
  //VELOCIDAD ANEMOMETRO
  v1 = analogRead(A0);
  veloc1= (v1*0.190); // 0,190 corresponde a la pendiente de la curva aca
  v1t = "\""+String(veloc1)+"\"";
  windSpeed = veloc1;
  //Serial.println(v1t);

  //VELETA
  while(aux < 200){
    veleta1 = analogRead(A1);
    veleta2 = analogRead(A2);
    //Serial.print("veleta1: ");Serial.println(veleta1);
    //Serial.print("veleta2: ");Serial.println(veleta2);
    if (veleta1 ==1023 && veleta2 == 1023){
      aux = 0;
    }else if (veleta1 >=500 && veleta2 >= 800){
      //Serial.println("Norte");
      windDirection = "\"Norte\"";
      aux = 201;
    }else if(veleta1 ==0 && veleta2 >= 234){
      //Serial.println("SUR");
      windDirection = "\"Sur\"";
      aux = 201;
    }else if(veleta1 ==0 && veleta2 == 0){
      //Serial.println("WEST");
      windDirection = "\"Oeste\"";
      aux = 201;
    }else if(veleta1 >=100 && veleta2 ==0){
      //Serial.println("EAST");
      windDirection = "\"Este\"";
      aux = 201;
    }
  }

  //HUMEDAD dht11
  humedadxd:
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
  temperatureF = dht.readTemperature(true);
  if (isnan(humidity) || isnan(temperature) || isnan(temperatureF)) {
    goto humedadxd;
    //Serial.println("Error de lectura");
  }
  if(humidity < 0){
    humidity = -humidity;
  }
  if(temperature < 0){
    temperature = -temperature;
  }
  if(temperatureF < 0){
    temperatureF=-temperatureF;
  }
  if(temperatureF < 4 && temperatureF >3){
    temperatureF=temperatureF+56;
  }
  if(temperatureF < 3 && temperatureF > 2){
    temperatureF=temperatureF+57;
  }
  if(temperatureF < 6 && temperatureF > 5){
    temperatureF=temperatureF+55;
  }
  
  if(humidity > 100){
    humidity=humidity-100;
  }

  
  //Serial.println(temperature);

  
if (miBT.available())       // si hay informacion disponible desde modulo
   Serial.write(miBT.read());   // lee Bluetooth y envia a monitor serial de Arduino

if (Serial.available())     // si hay informacion disponible desde el monitor serial
   miBT.write(Serial.read());   // lee monitor serial y envia a Bluetooth
   miBT.println(getJSON( humidity,  temperature,  temperatureF,  windDirection, windSpeed, ilum));
   delay(3000);
}
