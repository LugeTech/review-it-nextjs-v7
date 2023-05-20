import { Schema, model, models } from "mongoose";
import { iItem } from "../Interfaces";

const itemSchema = new Schema<iItem>(
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
export default models.Item || model("Item", itemSchema);

// export default model('Review', reviewSchema)
