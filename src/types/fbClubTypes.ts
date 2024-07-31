export type Stadium = {
    size: number;
    name: string;
};

export type Location = {
    lat: number;
    lng: number;
};

export type ClubProps = {
    id: "string";
    name: "string";
    country: "string";
    value: number;
    image: "string";
    european_titles: 5;
    stadium: Stadium;
    location: Location;
};

export type SortProps = "name" | "value";
