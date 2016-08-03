#!/bin/bash
cnpm install
if [ "$NODE_ENV" = "production" ];then 
		npm run build
		cp -r ./dist/* /dist/jingdongdad/
	else
		npm run test
		cp -r ./_output/* /dist/jingdongdad/
fi			
