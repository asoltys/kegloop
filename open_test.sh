#!/bin/bash

echo 1 >/sys/class/gpio/gpio27/value 
./kegloop
echo 0 >/sys/class/gpio/gpio27/value 
