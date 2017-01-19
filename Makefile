CC=gcc
CFLAGS= -lpthread -lwiringPi

kegloop: kegloop.c
	$(CC) $(CFLAGS) -o kegloop kegloop.c

clean:
	rm -f kegloop
