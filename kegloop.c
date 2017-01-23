#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define PIN 17
#define THRESHOLD 2000

int main (int argc, char *argv[]) {
  int counter;
  int current;
  int last = 0;
  FILE *infile;
  int threshold = THRESHOLD;

  if (argc==2) {
    threshold = atoi(argv[1]);
  }

  for (counter=0; counter<threshold;) {
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
