# WATER-LEVEL-MONITORING-SYSTEM

TEAM MEMBERS: 
1. AFRIN SYED - 2019101104
2. ANANYA AMANCHERLA - 2019101041
3. ANANDHINI RAJENDRAN - 2019101055
4. ABHINAV CHOWDARY MALLAMPATI - 2019101109
5. JYOTEESHWAR GANNE - 2019101099

# PROBLEM STATEMENT
Water monitoring is a versatile topic and can be extended to a wide range- monitoring water levels for reservoirs, dams, natural disaster warnings or something as mundane as daily water usage of a tank. This is why we chose this experiment. Specifically, we designed a system that can be used to control  the motor/pump's working  based on water levels using an ultrasonic sensor.  This is to be adapted to a house tank and its pump. A dashboard shows the current water level, graph on the changes in water level over 24hr time period and motor power usage with its current status.

# WHY DO WE NEED A WATER LEVEL MONITORING SYSTEM?
1. It reduces the possibility of human errors.
2. It is easy to install, economical and can work at remote locations.
3. These are better than traditional gauges and wired instruments in terms of safety and much less human intervention is needed for these to work.
4. Helps to keep track of water usage, reduce wastage of water caused by human error (Switching it of after overflow).

# DETAILS OF THE EXPERIMENT
We are using an ultrasonic sensor(HC-SR04) to detect the water level. The obtained water level is sent to OM2M server and the data from the server is sent to mysql database. Dashboard is made using Django and React. The motor/immersible pump is controlled according to the water level. When the water level rises above a threshold value, the motor is switched OFF. When the water level is less than another threshold value, the motor is ON.
	When water level is greater than or equal to 23 cm, motor is OFF. Whenever water level is less than 8 cm(i.e measured distance 23cm between water and HC-SR04), motor is switched ON. 

# FEATURES OF THE SYSTEM
1. Basic dashboard showing water level and water level plot over 24 hrs
2. Automatic switch on/off motor
3. Based on water levels increase/decrease the checking time
4. Displays Motor usage over time (Watt/hr)
5. Displays the current motor state (ON/OFF)

# FEATURES OF DASHBOARD
1. Displays the current water level percentage.
2. Show graph of water level changes over 24 hr time period. 
3. Displays pump state(ON/OFF), pump usage in watt hr, and water usage over last 24 hr period, 
4. The data is sent to dashboard only when water level changes.
5. MYSQL - Database
Django - Backend
React - Frontend

# OM2M
Sending data from to hardware to OM2M is working.
We are able to subscribe to OM2M containers. And the data is being sent to backend.

# SECURITY
The data sent from the sensor is encrypted before sending to the OM2M server and then decrypted before printing on the dashboard.

# POWER OUTAGE AND ROBUSTNESS
HARDWARE: The ESP is powered by a lithium battery hence the circuit will work even if power goes off. The pump will stop working when power goes off and resume once its back. In case of deployment, the AC pump may not switch on automatically when power comes back on. In this case, we will program the ESP so that the pump is switched on when the water level goes below a certain value. The percentage of error in sensors caused due to environmental factors, vibrations and time delay have been handled and are negligible.
When the internet connection is down, esp sends data a server hosted in its local network. 
When internet is available, the data will be sent to om2m.

# DATA COLLECTED
Using ultrasonic sensor to detect the water levels and Using the water level to control the Motor
	https://drive.google.com/file/d/1qumsUl75qApZJ7hdTZuRnFT2RF6w5qdq/view?usp=sharing
	
Collected data is sent to OM2M server and then stored in mysql server


# INFERENCES AND OBSERVATIONS
Observations:
Range of ultrasonic sensor: Min value measured accurately = 3.11 cm. Max value measured = 250 cm.
When the water surface was 2.5 cm from the sensor, the sensor calculated around 6.37-6.58 cm. It was accurate when distance from water surface to sensor >=3.11 cm.
When the water surface was less than or equal to 8 cm from ultrasonic sensor, motor was switched OFF. Likewise, when the water surface was greater than 8 cm from sensor, motor is switched ON.
Error (Sensors) : The HC-SR04 sensor gave value of 0 cm distance randomly. When ultrasonic sensor data is read more frequently than 2 seconds, this error occurs significantly more number of times . The DHT22 sensor failed to read data sometimes.
Percentage of error:
HC-SR04: 0.03
DHT22: 0.10

Inferences:
The error in DHT22 sensor is caused due to fluctuations in wire connections and is negligible. 
The error in HC-SR04 sensor may be caused due to random vibrations of the water container. Due to its low percentage it is also negligible.
The last few entries of water levels are displayed along with the current water level in dashboard.
Graph of water level changes over time.



