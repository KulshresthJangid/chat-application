echo -n "Please enter your mongo container name or id: "
read container


sudo docker restart $container

echo -n "Container started starting chat backend"
npm run start:server
