import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
class Cli {
    constructor(vehicles) {
        this.exit = false;
        this.vehicles = vehicles;
    }
    static generateVin() {
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    }
    chooseVehicle() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'selectedVehicleVin',
                message: 'Select a vehicle to perform an action on',
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    };
                }),
            },
        ])
            .then((answers) => {
            this.selectedVehicleVin = answers.selectedVehicleVin;
            this.performActions();
        });
    }
    createVehicle() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'vehicleType',
                message: 'Select a vehicle type',
                choices: ['Car', 'Truck', 'Motorbike'],
            },
        ])
            .then((answers) => {
            if (answers.vehicleType === 'Car') {
                this.createCar();
            }
            else if (answers.vehicleType === 'Truck') {
                this.createTruck();
            }
            else {
                this.createMotorbike();
            }
        });
    }
    createCar() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter Color',
            },
            {
                type: 'input',
                name: 'make',
                message: 'Enter Make',
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model',
            },
            {
                type: 'input',
                name: 'year',
                message: 'Enter Year',
            },
            {
                type: 'input',
                name: 'weight',
                message: 'Enter Weight',
            },
            {
                type: 'input',
                name: 'topSpeed',
                message: 'Enter Top Speed',
            },
        ])
            .then((answers) => {
            const car = new Car(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [
                new Wheel(),
                new Wheel(),
                new Wheel(),
                new Wheel(),
            ]);
            this.vehicles.push(car);
            this.selectedVehicleVin = car.vin;
            this.performActions();
        });
    }
    createTruck() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter Color',
            },
            {
                type: 'input',
                name: 'make',
                message: 'Enter Make',
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model',
            },
            {
                type: 'input',
                name: 'year',
                message: 'Enter Year',
            },
            {
                type: 'input',
                name: 'weight',
                message: 'Enter Weight',
            },
            {
                type: 'input',
                name: 'topSpeed',
                message: 'Enter Top Speed',
            },
            {
                type: 'input',
                name: 'towingCapacity',
                message: 'Enter Towing Capacity',
            },
        ])
            .then((answers) => {
            const truck = new Truck(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [
                new Wheel(),
                new Wheel(),
                new Wheel(),
                new Wheel(),
            ], parseInt(answers.towingCapacity));
            this.vehicles.push(truck);
            this.selectedVehicleVin = truck.vin;
            this.performActions();
        });
    }
    createMotorbike() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter Color',
            },
            {
                type: 'input',
                name: 'make',
                message: 'Enter Make',
            },
            {
                type: 'input',
                name: 'model',
                message: 'Enter Model',
            },
            {
                type: 'input',
                name: 'year',
                message: 'Enter Year',
            },
            {
                type: 'input',
                name: 'weight',
                message: 'Enter Weight',
            },
            {
                type: 'input',
                name: 'topSpeed',
                message: 'Enter Top Speed',
            },
            {
                type: 'input',
                name: 'frontWheelDiameter',
                message: 'Enter Front Wheel Diameter',
            },
            {
                type: 'input',
                name: 'frontWheelBrand',
                message: 'Enter Front Wheel Brand',
            },
            {
                type: 'input',
                name: 'rearWheelDiameter',
                message: 'Enter Rear Wheel Diameter',
            },
            {
                type: 'input',
                name: 'rearWheelBrand',
                message: 'Enter Rear Wheel Brand',
            },
        ])
            .then((answers) => {
            const motorbike = new Motorbike(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [
                new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
                new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
            ]);
            this.vehicles.push(motorbike);
            this.selectedVehicleVin = motorbike.vin;
            this.performActions();
        });
    }
    findVehicleToTow() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'vehicleToTow',
                message: 'Select a vehicle to tow',
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle,
                    };
                }),
            },
        ])
            .then((answers) => {
            if (answers.vehicleToTow instanceof Truck) {
                console.log('Truck cannot tow itself');
                this.performActions();
            }
            else {
                console.log('Truck is towing this vehicle.');
                this.performActions();
            }
        });
    }
    performActions() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select an action',
                choices: [
                    'Print details',
                    'Start vehicle',
                    'Accelerate 5 MPH',
                    'Decelerate 5 MPH',
                    'Stop vehicle',
                    'Turn right',
                    'Turn left',
                    'Reverse',
                    'Select or create another vehicle',
                    'Exit',
                    'Tow',
                    'Wheelie',
                ],
            },
        ])
            .then((answers) => {
            if (answers.action === 'Print details') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].printDetails();
                    }
                }
            }
            else if (answers.action === 'Start vehicle') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].start();
                    }
                }
            }
            else if (answers.action === 'Accelerate 5 MPH') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].accelerate(5);
                    }
                }
            }
            else if (answers.action === 'Decelerate 5 MPH') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].decelerate(5);
                    }
                }
            }
            else if (answers.action === 'Stop vehicle') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].stop();
                    }
                }
            }
            else if (answers.action === 'Turn right') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].turn('right');
                    }
                }
            }
            else if (answers.action === 'Turn left') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].turn('left');
                    }
                }
            }
            else if (answers.action === 'Reverse') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].reverse();
                    }
                }
            }
            else if (answers.action === 'Tow') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        if (this.vehicles[i] instanceof Truck) {
                            this.findVehicleToTow();
                            return;
                        }
                    }
                }
            }
            else if (answers.action === 'Wheelie') {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        if (this.vehicles[i] instanceof Motorbike) {
                            this.vehicles[i].wheelie();
                        }
                        else {
                            console.error('This vehicle cannot perform a wheelie');
                        }
                    }
                }
            }
            else if (answers.action === 'Select or create another vehicle') {
                this.startCli();
                return;
            }
            else {
                this.exit = true;
            }
            if (!this.exit) {
                this.performActions();
            }
        });
    }
    startCli() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'CreateOrSelect',
                message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
                choices: ['Create a new vehicle', 'Select an existing vehicle'],
            },
        ])
            .then((answers) => {
            if (answers.CreateOrSelect === 'Create a new vehicle') {
                this.createVehicle();
            }
            else {
                this.chooseVehicle();
            }
        });
    }
}
export default Cli;
