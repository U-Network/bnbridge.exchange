#!/bin/bash

sudo apt-get update
sudo apt-get install npm
sudo npm -g install npm
sudo npm -g install n
n 10.8.0
sudo apt-get install build-essential
sudo apt-get install libudev-dev
sudo apt-get install postgresql postgresql-contrib
cd sdk && npm install && cd ../bnbridge && npm install
