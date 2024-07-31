import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useStore } from "zustand";
import footBallClubStore from "../../stores/footBallClubStore";
import ClubList from "./ClubList";

export const FootBallClubSite = () => {
    const { clubs, fetchClubs, sortClubs, sortBy, error } = useStore(footBallClubStore);

    const toggleSort = () => {
        sortClubs(sortBy === "name" ? "value" : "name");
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <>
            <AppBar position="sticky" sx={{ color: "white" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        all about clubs
                    </Typography>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleSort}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ClubList clubs={clubs} error={error} />
        </>
    );
};
