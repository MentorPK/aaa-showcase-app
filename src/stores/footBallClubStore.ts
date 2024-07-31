import { create } from "zustand";
import { ClubProps, SortProps } from "../types/fbClubTypes";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";

export type FootBallClubStore = {
    clubs: ClubProps[];
    error: String | null;
    fetchClubs: () => Promise<void>;
    sortClubs: (sortBy: SortProps) => void;
    sortBy: SortProps;
    loading: Boolean;
};

const sortClubs = (clubs: ClubProps[], sortBy: SortProps): ClubProps[] => {
    return clubs.sort((a: ClubProps, b: ClubProps) => (a[sortBy] > b[sortBy] ? 1 : -1));
};

const footBallClubStore = create(
    persist<FootBallClubStore>(
        (set, get) => ({
            clubs: [],
            error: null,
            sortBy: "name",
            loading: false,
            fetchClubs: async (): Promise<void> => {
                try {
                    set({ loading: true });
                    const res = await axios.get("https://public.allaboutapps.at/hiring/clubs.json");
                    const data = await res.data;
                    const { sortBy } = get() as { sortBy: SortProps };
                    const sortedClubs = sortClubs(data, sortBy);
                    //only to see the loading
                    setTimeout(() => {
                        set({ clubs: sortedClubs });
                    }, 2500);
                } catch (error) {
                    const err = error as AxiosError;
                    set({
                        error: `Football club data could not be fetched, please try again later! :(\n${err.message}`,
                    });
                } finally {
                    set({ loading: false });
                }
            },
            sortClubs: (sortBy: SortProps) => {
                const { clubs } = get() as { clubs: ClubProps[] };
                const sortedClubs = sortClubs(clubs, sortBy);
                set({ clubs: sortedClubs, sortBy: sortBy });
            },
        }),
        {
            name: "fb-storage",
        },
    ),
);
export default footBallClubStore;
