#include <wiringPi.h>

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define PIN 17
#define THRESHOLD 10

int main() {
  if (wiringPiSetup () == -1)
    exit (1) ;

  pinMode(PIN, INPUT);

  int counter;
  int current;
  int last;

  for (counter=0; counter<THRESHOLD ;) {
    current=digitalRead(PIN);
    if (current == last) {
      counter++;
      last=current;
    }
  }

  return 0 ;
}
