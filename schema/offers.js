const offerSchema = new mongoose.Schema({
    brandId: String,
    description: String,
    validUntil: Date,
  });
  
  const Offer = mongoose.model('Offer', offerSchema);