# bike-backend

## About
This is a Node.js backend that acts as a reverse proxy for use with multiple services to support front end tools at my bike shop.  This server is currently deployed on a VPS and integrates a customer loyalty program (/loyalty) with MySQL and the Square API.  Additional API services and database interaction is planned with current development on /invoice-entry and /dynamicList.  

## Technologies
* Node.js
* Express.js
* MySQL

## Roadmap
- [ ] Integrate backend services from /invoice-entry 
- [ ] More robust automation via cron jobs
 - [ ] MySQL CheckIn table cleanup every week
 - [ ] Automatic Customer Group Assignments in Square based on Check-In Data
 - [ ] Automatic Invoice collections and Database updates
 - [ ] Automatic JBI catalog data update from provided ftp server holding library data
 
