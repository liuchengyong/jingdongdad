#!/bin/bash
ssh -i ~/.ssh/LTEST_rsa root@128.199.143.197 bash -c "'
	cd /node/jingdongdad
	rm -r dist
	rm -r _output
	mkdir dist
	mkdir _output
	git fetch --all
	git reset --hard origin/master
	source ~/.nvm/nvm.sh
	bash update.sh
'"