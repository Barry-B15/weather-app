# weather-app
An app to get the weather at a given place based on the Coding Train Youtude videos
# Trying to make an app to get the weather of a user's location
* First commit was mostly a set up of the server with few codes
* Second commit gets the user coordinates and displays the latitude and longitude
* The third commit:
 - adds a post request on the server
 - sets it up on the client side
 - Get the data of the POST request and returns it
# Create local db
* install nedb 
* create data base and auto save user data to it.
# Click Listener
* This commit was used to add a click listener so the use location can only show when user clicks the submit button.
* There is also an input area for user to add a favorite car
# Camera function
* The user can now take photos, add a status and display the list on another page
* The image from the pix is saved to a local database
* The codes are also re-organized.
## Get weather from api
* Major commit with a lot of changes
* The code is re-organized with new files
* The server or index.js before now was discontinued and relabled as selfie-index.js and a new index created
* The corresponding index.html in the public dir was also relabled selfie-index.html and replaced with a new index.hmtl
* I am using the 2 apis: one for coords, city, country and weather description; the other for the air quality.
### Checkin
* Added new folder - checkin
* codes to show the map, checkin icons and texts on the icons
* I can't understand why the checkins are not displaying even if I've checked the original codes over again



