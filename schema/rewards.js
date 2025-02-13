const rewardSchema = new mongoose.Schema({
    name: String,
    pointsRequired: Number,
    description: String,
    available: { type: Boolean, default: true },
  });
  
  const Reward = mongoose.model('Reward', rewardSchema);