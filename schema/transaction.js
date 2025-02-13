const transactionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    brandId: String,
    amount: Number,
    points: Number,
    date: { type: Date, default: Date.now },
  });
  
  const Transaction = mongoose.model('Transaction', transactionSchema);