// Define pins for ultrasonic sensor
#define TRIG_PIN  10
#define ECHO_PIN  11

#include <DHT.h>

#define DHTPIN 7 // Digital pin connected to the DHT11 sensor
#define DHTTYPE DHT11 // Type of DHT sensor

DHT dht(DHTPIN, DHTTYPE);

// Define variables for speed calculation
//long duration, distance;
//unsigned long start_time, end_time, time_diff;
//float speed;

int distance1, distance2, mSpeed, duration, distance;
int finalSpeed, finalTemp;

float getDistance() {
  // Send a trigger signal, this gets a reading from the HC-SR04
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  
  duration = pulseIn(ECHO_PIN, HIGH); // Measures duration of the reading

  distance = duration * 0.034 / 2; // Multiples the duration of the pulse by the speed of sound, and deviding by 2

  return distance; // returns the distance
}

int getSpeed() {
  distance1 = getDistance();
  delay(1000);
  distance2 = getDistance();
  mSpeed = abs(distance2 - distance1) / 1.0;
//  Serial.print("Speed in cm/s :");

  // Serial.println(mSpeed);
  float kmh = mSpeed*0.036;
  return int(round(kmh)); //speed is in cm/s
}

int getTemp(){
  // Read temperature and humidity from DHT sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Check if any reads failed
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print temperature and humidity to serial monitor
//  Serial.print("Temperature: ");
//  Serial.print(temperature);
//  Serial.print(" °C\t");
//  Serial.print("Humidity: ");
//  Serial.print(humidity);
//  Serial.println(" %");

  return int(round(temperature));
  // delay(2000); // Wait 2 seconds before reading again
}

void setup() {
  Serial.begin(9600); // Initialize serial communication
  pinMode(TRIG_PIN, OUTPUT); // Set trigger pin as output
  pinMode(ECHO_PIN, INPUT); // Set echo pin as input
  dht.begin(); // BEgins taking readings from DHT sesnor
  pinMode(3, OUTPUT);
}

void loop() {
  getSpeed();
  getTemp();
  // digitalWrite(3, HIGH);

  finalSpeed = getSpeed();
  finalTemp = getTemp();

//  String res = strSpeed + ", " + strTemp;

  Serial.print(finalSpeed);
  Serial.print(",");
  Serial.println(finalTemp);

  while (Serial.available()) {
    char val = Serial.read();
    int no = atoi(val);
    if (no < 700) {
      digitalWrite(3, HIGH);
    } else {
      digitalWrite(3, LOW);
    }
  }


}