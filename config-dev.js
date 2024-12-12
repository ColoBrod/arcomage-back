module.exports = {

  port: 3010,
  
  cors: {
    origin: [
      "*",
      "http://localhost:3001", 
      "http://192.168.0.158:3001",
      "http://192.168.1.2:3001",
      "http://89.179.241.43:3001",
    ],
  },
};
