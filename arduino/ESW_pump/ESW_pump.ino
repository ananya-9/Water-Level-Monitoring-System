#include<WiFi.h>
#include "ThingSpeak.h"
#include "DHT.h"
#include<HTTPClient.h>

#define DHTPIN 13
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);

const int trigPin = 5;
const int echoPin = 18;
int motorPin = 4; 

int prevVal = 0;
String prevMS = "0";

//define sound speed in m/s
double SOUND_SPEED = 331.30;
#define CM_TO_INCH 0.393701

long duration;
float distanceCm;
float distanceInch;

float maxDistance = 31;

float prevDist = 0;
String motorState = "0";//OFF
int num = 0;
int cont_val=0;
int half = 62;

const char* ssid = "ACT101400491366";   // your network SSID (name) 
const char* password = "71249390";   // your network password
const char* serverNameMotor = "https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-8/Node-1/MOTOR";
const char* serverNameWater = "https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-8/Node-1/WATER";
WiFiClient  client;

unsigned long myChannelNumber = 1558057;
const char * myWriteAPIKey = "5XU13ZGPDRCO7FDN";

String Time="";
void get_time()
{
  String serverName = "http://192.168.0.114:7777/time/";
  HTTPClient http;
  http.begin(serverName.c_str());
  int httpResponseCode = http.GET();
  if (httpResponseCode>0) {
  Time = http.getString();
  }
  else{
  Serial.print("Error code: ");
  Serial.println(httpResponseCode);
  }
}


int total_no_of_readings = 0;
int no_of_defective_readings = 0;

int no_dht = 0;
//encryption
char* encrypt(char str[])
{
  for(int i = 0;str[i] != '\0'; i++)
        str[i] = str[i] + 3; //the key for encryption is 3 that is added to ASCII value
    return str;
}
//om2m
//dataType = 0 for motor, 1 for water
void sendWaterLevel(String Data, int dataType ) {
  if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      if(dataType ==0)
      {
        http.begin(serverNameMotor);
      }
      else
        http.begin(serverNameWater);
        
      http.addHeader("X-M2M-Origin", "tcE3GU43k4:1EBs54XHBk");
      http.addHeader("Content-Type", "application/json;ty=4");
      http.addHeader("Content-Length", "100");
      http.addHeader("Connection", "close");
      Serial.println("Inside sendWaterLevel");
      get_time();
      Serial.println(Time);
      int code = http.POST("{\"m2m:cin\": {\"con\":\"[" + Data + ","+ Time+"]\"}}");
      http.end();
      Serial.println(code);
      if(code==-1){
        Serial.println("UNABLE TO CONNECT TO THE SERVER");
      }
      Serial.print("HTTP Response code: ");
      Serial.println(code);

//      if(code!-201)
//      {
//        //that api
//        //send data to local db
//        int code = http.POST("{\"m2m:cin\": {\"con\":\"[" + Data + ","+ Time+"]\"}}");
//      
//      }
//      // Free resources
//      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  
}

void setup() {
  Serial.begin(115200); // Starts the serial communication
  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(motorPin, OUTPUT);
  
  WiFi.mode(WIFI_STA);   
  ThingSpeak.begin(client);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  dht.begin();
  sendWaterLevel("0",0); //Motor is off to begin with
}

void loop() {
  SOUND_SPEED = 331.30;
//  if(WiFi.status() != WL_CONNECTED){
//    Serial.println("Attempting to connect");
//    while(WiFi.status() != WL_CONNECTED){
//      WiFi.begin(ssid, password); 
//      delay(5000);     
//    } 
//    Serial.println("\nConnected.");
//  }

  //Temperature based error handling
  float h = dht.readHumidity();
  delay(500);
  double t = dht.readTemperature();
  delay(500);
  float f = dht.readTemperature(true);
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    no_dht++;
    SOUND_SPEED = 346.00;
  }
  else
  {
    SOUND_SPEED += 0.6*t;
    Serial.print("sound_speed (m/s): ");
    Serial.println(SOUND_SPEED);
    Serial.print("temperature (C): ");
    Serial.println(t);
   }
  
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance
  distanceCm = duration * SOUND_SPEED/2;
  
//  Serial.print("SOUND_SPEED/2: ");
//  Serial.println(SOUND_SPEED/2);
  Serial.print("Duration (microseconds): ");
  Serial.println(duration);
  Serial.print("\n");

  distanceCm = distanceCm/10000;
  
  // Convert to inches
  distanceInch = distanceCm * CM_TO_INCH;

  // Prints the distance in the Serial Monitor
  Serial.print("Distance (cm): ");
  Serial.println(distanceCm);
  Serial.print("Distance (inch): ");
  Serial.println(distanceInch);
  Serial.print("\n");
  int isDefective =  0;
  //checking readings
  if(duration == 0)
  {
    no_of_defective_readings++;
    isDefective = 1;
  }
  if(distanceCm <= 5)
  {
    no_of_defective_readings++;
    isDefective = 1;
  }
  if(distanceCm >= 32)
  {
    no_of_defective_readings++;
    isDefective = 1;  
  }

  total_no_of_readings++;
  if(isDefective ==0)
  {
    if(distanceCm <= 8)
    {
      if(prevDist <= 10)
      {
         digitalWrite(motorPin, LOW);
         
         motorState = "0";
      }
      else
      {
        no_of_defective_readings++;
        isDefective = 1;  
      }
      
    }
    else if(distanceCm >=23)
    {
      digitalWrite(motorPin, HIGH); 
     
      motorState = "1";
    }
  }
  prevDist = distanceCm;
  
  ThingSpeak.setField(2,distanceCm);
  int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  if(x != 200 )
  {
      Serial.println("Problem!!(Thingspeak)");
  }
  else
  {
      Serial.println("Successful(Thingspeak)");
  
  
  }
  float error_hcsr04 = (float)no_of_defective_readings/(float)total_no_of_readings;
  float error_dht22 = (float)no_dht/(float)total_no_of_readings;

  //om2m
  
//  Serial.print("\nPercentage of error till now:\n");
//  Serial.print("HC-SR04: ");
//  Serial.println(error_hcsr04);
//  Serial.print("DHT22: ");
//  Serial.println(error_dht22);
  Serial.println("\n");
  if(motorState!="0")
   Serial.println("_____MOTOR ON_____");
  else
   Serial.println("_____MOTOR OFF_____");
  
float waterLevel;
float waterLevelData;
float finalVal;
  if(isDefective ==0)
  {  
    waterLevel = maxDistance - distanceCm;
    waterLevelData = (waterLevel*100)/maxDistance;
  //  int med = waterLevelData*100;
    //finalVal = float(med/100);
  
    int checkVal;
    if(waterLevelData>prevVal)
      checkVal = waterLevelData-prevVal;
    else
      checkVal = prevVal - waterLevelData;
    if( checkVal >= 1 )
    {
      String numberString = String(waterLevelData);
      //sprintf(numberString, "%.2f", waterLevelData);
      sendWaterLevel(numberString,1);
    }
  
    
    if(cont_val-waterLevelData <= 2){
      num++;
    }
    else{
      cont_val = waterLevelData;
      num = 0;
    }
    if(num > 40){
      if(cont_val > half){
        digitalWrite(motorPin, LOW);
        motorState = "0";
      }
    }
    prevVal= waterLevelData;
    if(prevMS!=motorState)
      sendWaterLevel(motorState,0);
    prevMS = motorState;
  }
  Serial.print("\nPercentage of water level:");

  Serial.println(finalVal);
  Serial.println("\n___________________________________________________________________");
  Serial.println("\n");
  
  delay(2000);
}
