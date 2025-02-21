router.post("/", async (req, res) => {
    const { name, bloodType, location } = req.body;
  
    // Save request (Assume BloodRequest model exists)
    const newRequest = new BloodRequest({ name, bloodType, location });
    await newRequest.save();
  
    // Emit notification to all clients
    io.emit("newNotification",' New Blood Request: ${bloodType} needed at ${location}');
  
    res.status(201).json({ message: "Request added" });
  });