# Car registration

**RF**
Should be possible to register a new car
Should be able to list all categories

**RN**
Should not be possible register a car with already registered plate
Should not be possible to change the plate of the car already registered
The car should be registered as available by default
The user responsible to register should be an admin


# Car listing

**RF**
Should be able to list all available cars
Should be able to list all cars by category
Should be able to list all cars by brand
Should be able to list all cars by car name

**RN**
The user don't need to be logged in


# Car specification registration

**RF**
Should be possible to register a specification for a car
Should be able to list all specifications
Should be able to list all cars

**RN**
The car should be already registered
Should not be able to register again specification already registered for the same car
The responsible for the car should be an admin


# Car image registration

**RF**
Should be able to register an image of the car
Should be able to list all cars

**RNF**
Should use Multer when uploading files

**RN**
The user should be able to register more than one image for the same car
The responsible user should be an admin


# Car rent

**RF**
Should be able to register a rent

**RNF**

**RN**
The rent duration should be at least 24 hours
Should no be able to register a new rent if the user already has a rent
Should no be able to register a new rent if the car already has a rent
