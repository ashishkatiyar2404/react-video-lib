import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Naruto",
    description:
      "Naruto is generally a very simple minded, easy going, cheerful person.",
  },
  {
    _id: uuid(),
    categoryName: "Itachi",
    description:
      "Itachi Uchiha is a character in the Naruto manga and anime series created by Masashi Kishimoto. Itachi is the older brother of Sasuke Uchiha",
  },
  {
    _id: uuid(),
    categoryName: "Akatsuki",
    description:
      "Akatsuki was a group of shinobi that existed outside the usual system of hidden villages. Over the course of several decades, Akatsuki took different forms and was led by different individuals.",
  },
  {
    _id: uuid(),
    categoryName: "Sasuke",
    description:
      "Sasuke Uchiha is a fictional character in the Naruto manga and anime franchise created by Masashi Kishimoto. Sasuke belongs to the Uchiha clan, a notorious ninja family",
  },
  {
    _id: uuid(),
    categoryName: "Madara Uchiha",
    description:
      "Madara was the legendary leader of the Uchiha clan. He founded Konohagakure alongside his childhood friend and rival",
  },
];
