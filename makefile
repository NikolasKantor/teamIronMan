FILES_TO_ZIP=*
FILES_TO_DELETE=test.sranec.txt

pack:
	zip xkanto10_xkovar70_xcerve07.zip $(FILES_TO_ZIP)

clean:
	rm $(FILES_TO_DELETE)

test:
	zip xkanto10_xkovar70_xcerve07.zip $(FILES_TO_ZIP)
	
doc:
	zip xkanto10_xkovar70_xcerve07.zip $(FILES_TO_ZIP)