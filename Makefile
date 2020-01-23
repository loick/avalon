back:
	yarn --cwd ./backend start

front:
	yarn --cwd ./mobile start

launch:
	$(MAKE) back & $(MAKE) front