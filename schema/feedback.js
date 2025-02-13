const feedbackSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    feedback: String,
    date: { type: Date, default: Date.now },
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);