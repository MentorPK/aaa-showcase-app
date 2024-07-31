import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { useStore } from "zustand";
import footBallClubStore from "../../stores/footBallClubStore";
import ClubList from "./ClubList";
import TopBar from "./TopBar";

export const FootBallClubSite = () => {
    const { clubs, fetchClubs, sortClubs, sortBy, error, isLoading } = useStore(footBallClubStore);

    const toggleSort = () => {
        sortClubs(sortBy === "name" ? "value" : "name");
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <>
            <TopBar text="all about clubs" icon={<MenuIcon />} handleClick={toggleSort} />
            <ClubList clubs={clubs} error={error} isLoading={isLoading} />
        </>
    );
};
