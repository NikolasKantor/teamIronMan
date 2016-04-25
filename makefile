FILES_TO_ZIP=*
FILES_TO_DELETE=test.sranec.txt

.PHONY: doc

pack:
	zip xkanto10_xkovar70_xcerve07.zip $(FILES_TO_ZIP)

clean:
	rm $(FILES_TO_DELETE)

test:
	curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
	sudo apt-get install nodejs
	sudo npm install mocha -g
	sudo npm install chai
	mocha test
	
doc:
	doxygen ./doc/Doxyfile
	zip -r doc/dokumentace.zip doc/html/
	rm -r doc/html
