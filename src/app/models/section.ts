export interface Paper {
  name: string;
  link: string;
  understanding: boolean[];
}

export interface Section {
  name: string;
  papers: Paper[];
}
