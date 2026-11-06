import { v4 as uuid } from "uuid";

/**
 * Category Database
 * High-definition, verified thumbnails for all anime categories
 */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Naruto",
    description:
      "Naruto Uzumaki is a shinobi of Konohagakure and the Nine-Tails jinchūriki, striving to become the legendary Seventh Hokage.",
    thumbnail: "https://i.ytimg.com/vi/jqXUm2YS-mM/hqdefault.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Itachi",
    description:
      "Itachi Uchiha was a prodigy of Konohagakure's Uchiha clan and served as an Anbu captain before sacrificing everything in the shadows.",
    thumbnail: "https://i.ytimg.com/vi/xYKzdx-B1w0/hqdefault.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Akatsuki",
    description:
      "The Akatsuki was an organization of rogue shinobi seeking world peace through extreme measures, donning the iconic black cloaks with red clouds.",
    thumbnail: "https://i.ytimg.com/vi/ux0Qnn2XEgM/hqdefault.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Sasuke",
    description:
      "Sasuke Uchiha is one of the last surviving members of the Uchiha clan, master of the Sharingan and the devastating Chidori.",
    thumbnail: "https://i.ytimg.com/vi/Vy093O6KJlE/hqdefault.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Madara Uchiha",
    description:
      "Madara Uchiha was the legendary co-founder of Konohagakure alongside Hashirama Senju and one of the most formidable shinobi in history.",
    thumbnail: "https://i.ytimg.com/vi/DMSeibTVeRs/hqdefault.jpg",
  },
];
