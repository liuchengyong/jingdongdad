#!/bin/bash
ssh -i ./LTEST_rsa root@128.199.143.197 bash -c "'
	cd /node/jingdongdad
	git fetch --all
	git reset --hard origin/master
	source ~/.nvm/nvm.sh 
	bash update.sh
'"