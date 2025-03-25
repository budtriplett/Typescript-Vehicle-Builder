// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
// The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle {
    // Create a constructor that accepts the properties of the Truck class
    constructor(vin, color, make, model, year, weight, topSpeed, wheels, towingCapacity) {
        // Call the constructor of the parent class, Vehicle
        super();
        // Initialize the properties of the Truck class
        this.vin = vin;
        this.color = color;
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.topSpeed = topSpeed;
        this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
        this.towingCapacity = towingCapacity;
    }
    // Implement the tow method from the AbleToTow interface
    tow(vehicle) {
        if (vehicle.weight <= this.towingCapacity) {
            console.log(`This ${vehicle.make} ${vehicle.model} is being towed`);
        }
        else {
            console.log(`This ${vehicle.make} ${vehicle.model} is too heavy to be towed`);
        }
    }
    // Override the printDetails method from the Vehicle class
    printDetails() {
        // Call the printDetails method of the parent class
        super.printDetails();
        // Log the details of the Truck
        console.log(`VIN: ${this.vin}`);
        console.log(`Make: ${this.make}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
        console.log(`Weight: ${this.weight}`);
        console.log(`Top Speed: ${this.topSpeed}`);
        console.log(`Color: ${this.color}`);
        console.log(`Towing Capacity: ${this.towingCapacity}`);
        console.log(`Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`);
        console.log(`Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`);
        console.log(`Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`);
        console.log(`Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`);
    }
}
// Export the Truck class as the default export
export default Truck;
