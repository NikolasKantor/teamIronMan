LOGINS=xkanto10_xkovar70_xcerve18
REPO=teamIronMan-master


FILES_TO_DELETE=node_modules .gitattributes .gitignore 

.PHONY: doc

pack:
	rm -r -f $(FILES_TO_DELETE)
	cd ../.. && zip -r $(LOGINS)/$(REPO)/$(LOGINS).zip $(LOGINS)

clean:
	rm -r -f $(FILES_TO_DELETE)

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
