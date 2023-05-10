import processing.serial.*;
import http.requests.*;


Serial myPort;  // Create object from Serial class

void setup() 
{
  size(400,400);
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 9600);
}

void draw()
{
  if ( myPort.available() > 0) {  // If data is available,
    
    String data = myPort.readStringUntil('\n');
    
    if (data != null) {
      String[] values = data.trim().split(",");
      
      if (values.length == 2) {
        int value1 = Integer.parseInt(values[0]);
        int value2 = Integer.parseInt(values[1]);
        
         PostRequest post = new PostRequest("http://localhost:3000/sendData");
         post.addHeader("Content-Type", "application/json");
         post.addData("{\"speed\":\""+value1+"\", \"temp\":\""+value2+"\"}");
         post.send();
      }
    }

  }
   delay(3000);
   
   smooth();
   
   GetRequest get= new GetRequest("http://localhost:3000/test");
   get.send();
   String result = get.getContent();
   int no = parseInt(result)-700;
   if (no < 0) {
     myPort.write(1);
   }
   delay(1000);
}
