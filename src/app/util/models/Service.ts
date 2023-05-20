import { Schema, model, models } from "mongoose";
import { iService } from "../Interfaces";

const serviceSchema = new Schema<iService>(
  {
    createdDate: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    images: [],
  },
  { strict: true }
);
export default models.Service || model("Service", serviceSchema);

// export default model('Review', reviewSchema)
