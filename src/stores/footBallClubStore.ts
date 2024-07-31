import { create } from "zustand";
import { ClubProps, SortProps } from "../types/fbClubTypes";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";
import { t } from "../i18n/util";

export type FootBallClubStore = {
    clubs: ClubProps[];
    error: String | null;
    fetchClubs: () => Promise<void>;
    sortClubs: (sortBy: SortProps) => void;
    sortBy: SortProps;
    isLoading: boolean;
};

const sortClubs = (clubs: ClubProps[], sortBy: SortProps): ClubProps[] => {
    return clubs.sort((a: ClubProps, b: ClubProps) => (a[sortBy] > b[sortBy] ? 1 : -1));
};

const footBallClubStore = create(
    persist<FootBallClubStore>(
        (set, get) => ({
            clubs: [],
            error: null,
            sortBy: "name", //default
            isLoading: false,
            fetchClubs: async (): Promise<void> => {
                try {
                    set({ isLoading: true });
                    const res = await axios.get("https://public.allaboutapps.at/hiring/clubs.json");
                    const data = await res.data;
                    const { sortBy } = get() as { sortBy: SortProps };
                    const sortedClubs = sortClubs(data, sortBy);
                    set({ clubs: sortedClubs });
                } catch (error) {
                    const err = error as AxiosError;
                    set({
                        error: t("fbFetch.error", { errorMessage: err.message }),
                    });
                } finally {
                    set({ isLoading: false });
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
