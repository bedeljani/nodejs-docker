
#Image on Dockerhub
FROM bedeljani/ubuntu

#Directory
COPY . /app

#command run 
CMD ["pm2-runtime", "start", "apps.yaml"]

#Port
EXPOSE 4000