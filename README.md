# University App

Angular Single Page Application (SPA) demonstrating how to manage data located at http://universities.hipolabs.com.

The application allows users to:
- update filter criteria and sort the list by all fields, including university name, country, state/province, domains, and web pages.
- edit universities (not persisted)
- delete universities (not persisted)
- create universities (not persisted)

## Development server

`git clone https://github.com/angular/quickstart  my-proj`

`cd my-proj`

`npm install`

`ng serve --open`

Note: You need to configure a valid connection to the RESTful university service.  See notes below.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

This project makes use of ag-Grid.  For details see:
- https://www.ag-grid.com.

This project makes HTTP requests to a back-end service to retrieve university data.  You can run this service locally or from http://universities.hipolabs.com.  The current implementation requires server side changes to allow requests from port 4200.  See:
- https://github.com/Hipo/university-domains-list

