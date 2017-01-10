#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define PIN 17
#define THRESHOLD 2000

int main() {
  int counter;
  int current;
  int last = 0;
  FILE *infile;

  for (counter=0; counter<THRESHOLD ;) {
    infile = fopen("/sys/class/gpio/gpio17/value", "r");
    if (infile == NULL) {
      fprintf(stderr, "cannot read input file\n");
    }
    current=getc(infile);
    fclose(infile);
    if (current != last) {
      counter++;
      printf("%d\n", counter);
      last=current;
    }
  }

  return 0 ;
}
