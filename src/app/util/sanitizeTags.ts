import { iProduct } from "@/app/util/Interfaces";

export const sanitizeTags = (product: iProduct): void => {
  product.tags = product.tags.filter((tag) => tag.trim() !== "");
};
