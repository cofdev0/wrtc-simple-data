# Use node  v6.11.2 LTS
FROM node: 6.11.2  LTS
ENV LAST_UPDATED 20160605T165400

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
  EXPOSE 3000
  
#Build  source  
CMD ["tsc"]

# Make  tests  
CMD ["npm", "test"]

# Launch  application 
CMD ["npm", "run","server"]
